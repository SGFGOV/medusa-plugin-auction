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
        const auctions = await auctionService.listBids(
            {
                product_id: req.query.product_id as string,
                customer_id: userId
            },
            {
                order: { created_at: "DESC" },
                relations: ["auction", "auction.region"],
                skip: parseInt(`${req.query.offset ?? "0"}`),
                take: parseInt(`${req.query.limit ?? "20"}`)
            }
        );

        res.status(200).json({ auctions });
        return;
    } else {
        res.sendStatus(401);
    }
}
