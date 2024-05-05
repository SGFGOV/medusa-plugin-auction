/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import { EventBusService, FindConfig, buildQuery } from "@medusajs/medusa";
import { Auction } from "../models/auction";
import { EntityManager, In } from "typeorm";
import getStatus from "../util/get-status";
import { AuctionStatus } from "../models/auction";
import { Bid } from "../models/bid";

type InjectedDependencies = {
    manager: EntityManager;
    eventBusService: EventBusService;
};

export default class AuctionService {
    private manager: EntityManager;

    static EVENTS = {
        BID_POSTED: "bid-posted",
        AUCTION_CREATED: "auction-created",
        AUCTION_ENDED: "auction-ended",
        AUCTION_STARTED: "auction-started",
        AUCTION_CLOSED: "auction-closed",
        AUCTION_COMPLETED: "auction-completed"
    };
    eventBusService: EventBusService;

    constructor(container: InjectedDependencies) {
        this.manager = container.manager;
        this.eventBusService = container.eventBusService;
    }

    async list(
        filters?: FilterableAuctionFields,
        config: FindConfig<Auction> = {}
    ): Promise<Auction[]> {
        const auctionRepo = this.manager.getRepository(Auction);
        const { product_id, ...rest } = filters;
        const query = buildQuery(rest, config);

        if (product_id) {
            query.where = {
                ...query.where,
                product_id: In([product_id])
            };
        }

        return await auctionRepo.find(query);
    }

    async listBid(
        filters?: FilterableBidFields,
        config: FindConfig<Auction> = {}
    ): Promise<Bid[]> {
        const auctionRepo = this.manager.getRepository(Bid);
        const { product_id, ...rest } = filters;
        const query = buildQuery(rest, config);

        if (product_id) {
            query.where = {
                ...query.where,
                product_id: product_id ? In([product_id]) : undefined
            };
        }

        return await auctionRepo.find(query);
    }

    async create(data: Partial<Auction>): Promise<Auction> {
        const auctionRepo = this.manager.getRepository(Auction);

        const auction = auctionRepo.create(data);
        auction.status = getStatus(data.starts_at, data.ends_at);

        await this.publishEvent(auction);

        return await auctionRepo.save(auction);
    }

    async publishEvent(auction: Auction): Promise<void> {
        switch (auction.status) {
            case AuctionStatus.ACTIVE:
                await this.eventBusService.emit([
                    {
                        eventName: AuctionService.EVENTS.AUCTION_STARTED,
                        data: {
                            auction_id: auction.id
                        }
                    }
                ]);
                break;

            case AuctionStatus.CANCELLED:
                await this.eventBusService.emit([
                    {
                        eventName: AuctionService.EVENTS.AUCTION_CLOSED,
                        data: {
                            auction_id: auction.id
                        }
                    }
                ]);
                break;
            case AuctionStatus.EXPIRED:
                await this.eventBusService.emit([
                    {
                        eventName: AuctionService.EVENTS.AUCTION_ENDED,
                        data: {
                            auction_id: auction.id
                        }
                    }
                ]);
                break;
            case AuctionStatus.PENDING:
                await this.eventBusService.emit([
                    {
                        eventName: AuctionService.EVENTS.AUCTION_CREATED,
                        data: {
                            auction_id: auction.id
                        }
                    }
                ]);
                break;
            case AuctionStatus.SOLD:
                await this.eventBusService.emit([
                    {
                        eventName: AuctionService.EVENTS.AUCTION_COMPLETED,
                        data: {
                            auction_id: auction.id
                        }
                    }
                ]);
                break;
        }
    }

    async update(id: string, data: Partial<Auction>): Promise<Auction> {
        const auctionRepo = this.manager.getRepository(Auction);

        const auction = await auctionRepo.findOne({ where: { id } });

        if (data.starts_at || data.ends_at) {
            const startDate = data.starts_at || auction.starts_at;
            const endDate = data.ends_at || auction.ends_at;

            data.status = getStatus(startDate, endDate);
        }

        await auctionRepo.update({ id }, data);
        await this.publishEvent(auction);
        return await auctionRepo.findOne({ where: { id } });
    }

    async retrieve(
        id: string,
        config: FindConfig<Auction> = {}
    ): Promise<Auction> {
        const auctionRepo = this.manager.getRepository(Auction);
        return await auctionRepo.findOne({ where: { id }, ...config });
    }

    async delete(id: string): Promise<void> {
        const auctionRepo = this.manager.getRepository(Auction);

        // Hack because of the cascade delete not working - probably a faulty relation somewhere
        const auction = await auctionRepo.findOne({
            where: { id },
            relations: ["bids"]
        });
        const bidIds = auction.bids.map((b) => b.id);
        await auctionRepo.manager.getRepository(Bid).delete(bidIds);

        await auctionRepo.delete(id);
        await this.publishEvent(auction);
    }

    async createBid(
        auctionId: string,
        data: { amount: number; user_id: string }
    ): Promise<Bid> {
        const auctionRepo = this.manager.getRepository(Auction);
        const auction = await auctionRepo.findOne({
            where: { id: auctionId },
            relations: ["bids"]
        });

        if (auction.status !== "active") {
            throw new Error("Auction is not active");
        }

        const bid = auctionRepo.manager.getRepository("Bid").create(data);
        bid.auction = auction;
        const result = (await auctionRepo.manager
            .getRepository("Bid")
            .save(bid)) as Bid;

        delete result.customer_id;
        await this.eventBusService.emit([
            {
                eventName: AuctionService.EVENTS.BID_POSTED,

                data: result
            }
        ]);
        return result;
    }
}

export type FilterableAuctionFields = {
    id?: string;
    starts_at?: Date;
    ends_at?: Date;
    status?: AuctionStatus;
    product_id?: string;
    created_by?: string;
};

export type FilterableBidFields = {
    id?: string;
    product_id?: string;
    customerId: string;
};
