import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import { Product } from "@medusajs/medusa";
import {
    useAdminCustomQuery,
    useAdminRegions,
    formatAmount
} from "medusa-react";
import { Container } from "./container";
import { Table, Heading, Badge } from "@medusajs/ui";
import { Bid } from "../../../models/bid";
import { AuctionActions } from "./auction-actions";

type InjectedProps = WidgetProps & {
    product?: Product;
};

const AuctionBids = (props: InjectedProps) => {
    const { product } = props;

    const { data, isLoading, error } = useAdminCustomQuery(
        "/admin/auctions/reverse/bids",
        ["bids"]
    );

    const { regions } = useAdminRegions();

    const bids = (data?.bids || []) as Bid[];

    return (
        <Container
            title="Bids"
            description={`View your bids ${
                product?.title ? "" : "for " + product.title
            }.`}
            product={product}
        >
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading auctions</p>}

            <Heading level="h2" className="inter-large-semibold my-base">
                All auctions ({bids.length})
            </Heading>

            {bids && (
                <Table className="mt-6">
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>S.No.</Table.Cell>
                            <Table.Cell>Product</Table.Cell>
                            <Table.Cell>Bid Value</Table.Cell>
                            <Table.Cell>Auction Id</Table.Cell>
                            <Table.Cell>Auction Status</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {bids.map((b, idx) => {
                            const region = regions?.find(
                                (r) => r.id === b.auction.region_id
                            );

                            if (!region) {
                                return "Loading Regions";
                            }

                            const amount = formatAmount({
                                amount: b.amount,
                                region
                            });

                            return (
                                <Table.Row key={b.id}>
                                    <Table.Cell>{idx + 1}</Table.Cell>
                                    <Table.Cell>
                                        {b.auction.product_id}
                                    </Table.Cell>
                                    <Table.Cell>{amount}</Table.Cell>
                                    <Table.Cell>{b.auction.id}</Table.Cell>

                                    <Table.Cell>
                                        <Badge
                                            color={
                                                b.auction.status === "active"
                                                    ? "green"
                                                    : "orange"
                                            }
                                        >
                                            {b.auction.status}
                                        </Badge>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </Container>
    );
};

export default AuctionBids;
