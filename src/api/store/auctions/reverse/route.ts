import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AuctionService from "../../../../services/auction";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const auctionService = req.scope.resolve("auctionService") as AuctionService;
  const customer_id = req.user.customer_id
  if( customer_id ) {
  const auctions = await auctionService.list(
    {
      product_id: req.query.product_id as string,
      created_by:customer_id,
    },
    {
      order: { ends_at: "DESC" },
      relations: ["bids"],
    }
  );

  res.status(200).json({ auctions });
  return;
}
else {
  res.sendStatus(401)
}

}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const auctionService = req.scope.resolve("auctionService") as AuctionService;
  const id = req.user.customer_id
  if( id ) {
  const auction = await auctionService.create(req.body);

  res.status(200).json({ auction });
  }
  else {
    res.sendStatus(401)
  }
  return;
}
