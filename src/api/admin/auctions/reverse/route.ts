/* eslint-disable require-jsdoc */
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AuctionService from "../../../../services/auction";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const auctionService = req.scope.resolve(
        "auctionService"
    ) as AuctionService;

    const auctions = await auctionService.listByIds(
        {
            product_id: req.query.product_id as string[]
        },
        {
            order: { ends_at: "ASC" },
            relations: ["bids"]
        }
    );

    res.status(200).json({ auctions });
    return;
}
