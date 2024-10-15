import { RouteConfig, RouteProps } from "@medusajs/admin";
import AuctionViewOnGoing from "../../components/auction/reverse/auction-reverse-view-ongoing";
import AuctionReverseBids from "../../components/auction/reverse/auction-reverse-bids";
import { Puzzle } from "@medusajs/icons";
import { Container } from "@medusajs/ui";

const Auctions = ({ notify }: RouteProps): React.ReactElement => {
    return (
        <Container title="My Auctions">
            <AuctionViewOnGoing notify={notify} />
            <AuctionReverseBids notify={notify} />
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
