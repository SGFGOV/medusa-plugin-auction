import { RouteConfig } from "@medusajs/admin";
import AuctionViewOnGoing from "../../components/auction/auction-view-ongoing";
import AuctionBids from "../../components/auction/auction-bids";
import { Puzzle } from "@medusajs/icons";
import { Container } from "@medusajs/ui";

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

const Auctions = (): React.ReactElement => {
    return (
        <Container title="My Auctions">
            <AuctionViewOnGoing notify={notificationHandler} />
            <AuctionBids notify={notificationHandler} />
        </Container>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Reverse Auction",
        icon: Puzzle
    }
};
// module.exports = Auctions;
// module.exports.config = route_config;
export default Auctions;
