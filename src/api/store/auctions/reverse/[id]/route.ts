/* eslint-disable require-jsdoc */
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AuctionService from "../../../../../services/auction";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const id = req.params.id;

    const auctionService = req.scope.resolve(
        "auctionService"
    ) as AuctionService;

    const customerId = req.user.customer_id;
    if (customerId) {
        const auctions = await auctionService.retrieve(id, {
            relations: ["bids"]
        });

        if (auctions.created_by == customerId) {
            res.status(200).json({ auctions });
            return;
        } else res.sendStatus(401);
    }
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const id = req.params.id;

    const customerId = req.user.customer_id;
    if (customerId) {
        const auctionService = req.scope.resolve(
            "auctionService"
        ) as AuctionService;

        const customerAuction = await auctionService.retrieve(id);

        if (customerAuction.created_by == customerId) {
            const auction = await auctionService.update(id, req.body);

            res.status(200).json({ auction });
            return;
        }
    }
    res.sendStatus(401);
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const id = req.params.id;

    const customerId = req.user.customer_id;
    if (customerId) {
        const auctionService = req.scope.resolve(
            "auctionService"
        ) as AuctionService;

        const customerAuction = await auctionService.retrieve(id);

        if (customerAuction.created_by == customerId) {
            await auctionService.delete(id);

            res.status(200).json({});
            return;
        }
    }
    res.sendStatus(401);
}
