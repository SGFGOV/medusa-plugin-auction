import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import { Product } from "@medusajs/medusa";
import {
    useAdminCustomQuery,
    useAdminRegions,
    formatAmount
} from "medusa-react";
import { Container } from "./container";
import { Table, Heading, Badge } from "@medusajs/ui";
import { Auction } from "../../../models/auction";
import { AuctionViewContainer } from "./auction-view-container";
import { AuctionReverseActions } from "./auction-reverse-actions";
import CountdownTimer from "../common/countdown";

type InjectedProps = WidgetProps & {
    product?: Product;
};

const AuctionViewOngoing = (props: InjectedProps) => {
    const { product } = props;

    const { data, isLoading, error } = useAdminCustomQuery(
        "/admin/auctions/reverse",
        ["auctions"]
    );

    const { regions } = useAdminRegions();

    const auctions = (data?.auctions || []) as Auction[];

    return (
        <AuctionViewContainer
            title="Ongoing Auctions"
            description={"Participate in auctions"}
        >
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading auctions</p>}

            <Heading level="h2" className="inter-large-semibold my-base">
                All auctions ({auctions.length})
            </Heading>

            {auctions && (
                <Table className="mt-6">
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Highest Bid</Table.Cell>
                            <Table.Cell>Starting Price</Table.Cell>
                            <Table.Cell>Starts At</Table.Cell>
                            <Table.Cell>Ends In</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {auctions.map((a) => {
                            const region = regions?.find(
                                (r) => r.id === a.region_id
                            );

                            if (!region) {
                                return "Loading Regions";
                            }

                            const maxBid = a.bids?.reduce((a, b) => {
                                return Math.max(a, b.amount);
                            }, 0);

                            const maxBidAmount = formatAmount({
                                amount: maxBid,
                                region
                            });

                            const startingPrice = formatAmount({
                                amount: a.starting_price,
                                region
                            });
                            const startTime = new Date(a.starts_at);
                            return (
                                <Table.Row key={a.id}>
                                    <Table.Cell>
                                        <Badge
                                            color={
                                                a.status === "active"
                                                    ? "green"
                                                    : "orange"
                                            }
                                        >
                                            {`${a.id}` + "\n" + `${a.status}`}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {maxBid
                                            ? `${maxBidAmount}`
                                            : "No bids yet"}
                                    </Table.Cell>
                                    <Table.Cell>{startingPrice}</Table.Cell>
                                    <Table.Cell>
                                        {startTime.toISOString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <CountdownTimer
                                            endTime={
                                                (new Date(a.ends_at).getTime() -
                                                    Date.now()) /
                                                1000
                                            }
                                        />
                                        {/* {new Date(a.ends_at).toDateString()} */}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center justify-end">
                                        <AuctionReverseActions
                                            auction={a}
                                            product={product}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </AuctionViewContainer>
    );
};

export default AuctionViewOngoing;
