/* eslint-disable require-jsdoc */
import { ScheduledJobConfig, ScheduledJobArgs } from "@medusajs/medusa";
import AuctionService from "src/services/auction";

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

    await auctionService.pollAndUpdateAuctions();
}
