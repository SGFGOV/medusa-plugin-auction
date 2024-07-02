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

    const minBid = Math.min(...currentBids);

    if (data.amount >= minBid) {
        res.status(400).json({
            message: `Please place a bid lower than the current min bid of`,
            lowest: minBid
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
    const userId = req.user.userId;
    if (userId) {
        const auctions = await auctionService.listBid(
            {
                product_id: req.query.product_id as string,
                customerId: userId
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
