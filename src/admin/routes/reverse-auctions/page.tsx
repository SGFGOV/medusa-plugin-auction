import { RouteConfig } from "@medusajs/admin";
import AuctionViewOnGoing from "../../components/auction/auction-view-ongoing";
import AuctionBids from "../../components/auction/auction-bids";

const notificationHandler = {
    success: function (title: string, message: string): void {
        console.log(`${title} : ${message}`);
    },
    error: function (title: string, message: string): void {
        console.error(`${title} : ${message}`);
    },
    warn: function (title: string, message: string): void {
        console.warn(`${title} : ${message}`);
    },
    info: function (title: string, message: string): void {
        console.info(`${title} : ${message}`);
    }
};

const ReverseAuctions = (): React.ReactElement => {
    return (
        <>
            <AuctionViewOnGoing notify={notificationHandler} />
            <AuctionBids notify={notificationHandler} />
        </>
    );
};
export default ReverseAuctions;

export const config: RouteConfig = {
    link: {
        label: process.env.MEDUSA_ADMIN_AUCTION_NAME ?? "Reverse Auction"
    }
};
