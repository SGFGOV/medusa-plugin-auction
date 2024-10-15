/* eslint-disable require-jsdoc */
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AuctionService from "../../../../../../services/auction";

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const auctionId = req.params.id;

    const data = JSON.parse(req.body as string);

    const auctionService = req.scope.resolve(
        "auctionService"
    ) as AuctionService;

    const auction = await auctionService.retrieve(auctionId, {
        relations: ["bids"]
    });

    const currentBids = auction.bids.map((b) => b.amount);

    const maxBid = Math.max(...currentBids);

    if (data.amount <= maxBid) {
        res.status(400).json({
            message: `Please place a bid higher than the current highest bid of`,
            highestBid: maxBid
        });
        return;
    }

    const bid = await auctionService.createBid(auctionId, data);

    res.status(200).json({ bid });
    return;
}

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const auctionService = req.scope.resolve(
        "auctionService"
    ) as AuctionService;
    const customerId = req.user.customer_id;
    if (customerId) {
        const auctions = await auctionService.listBids(
            {
                customerId: customerId
            },
            {
                order: { ends_at: "DESC" },
                relations: ["auction", "auction.region"]
            }
        );

        res.status(200).json({ auctions });
        return;
    } else {
        res.sendStatus(401);
    }
}
