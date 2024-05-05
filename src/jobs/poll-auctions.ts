/* eslint-disable require-jsdoc */
import { ScheduledJobConfig, ScheduledJobArgs, Logger } from "@medusajs/medusa";
import { Auction, AuctionStatus } from "../models/auction";
import AuctionService from "src/services/auction";
import { EntityManager } from "typeorm";

export const config: ScheduledJobConfig = {
    name: "poll-auctions",
    schedule: "* * * * *",
    data: {}
};

export default async function handler({
    container
}: ScheduledJobArgs): Promise<void> {
    const auctionService = container.resolve(
        "auctionService"
    ) as AuctionService;
    const manager = container.resolve("manager") as EntityManager;
    const auctionRepo = manager.getRepository(Auction);
    const logger = container.resolve("logger") as Logger;

    const activity = logger.activity("updating auctions");
    try {
        const onGoingAuctions = await auctionRepo.findAndCount({
            where: [
                {
                    status: AuctionStatus.ACTIVE
                },
                {
                    status: AuctionStatus.PENDING
                }
            ]
        });
        const auctions = onGoingAuctions[0];
        const auctionCount = onGoingAuctions[1];
        if (auctionCount) {
            for (const auction of auctions) {
                delete auction.status;
                logger.progress(activity, `updating auction ${auction.id}`);
                await auctionService.update(auction.id, auction);
            }
        }
        logger.success(activity, "Completed updating auctions");
    } catch (e) {
        logger.failure(activity, "Error updating auctions " + e.message);
    }
}
