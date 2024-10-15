/* eslint-disable require-jsdoc */
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AuctionService from "../../../../../services/auction";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const auctionService = req.scope.resolve(
        "auctionService"
    ) as AuctionService;
    const userId = req.user.customer_id;
    if (userId) {
        const bids = await auctionService.listBids(
            {
                product_id: (req.query.product_id as string) ?? undefined,
                customer_id: userId
            },
            {
                order: { created_at: "DESC" },
                relations: ["auction", "auction.region"],
                skip: parseInt(`${req.query.offset ?? "0"}`),
                take: parseInt(`${req.query.limit ?? "20"}`)
            }
        );

        res.status(200).send({ bids: bids[0], count: bids[1] });
        return;
    } else {
        res.sendStatus(401);
    }
}
