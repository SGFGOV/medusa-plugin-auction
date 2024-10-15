import {
    EllipsisHorizontal,
    Trash,
    PencilSquare,
    Spinner
} from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { Auction } from "src/models/auction";
import { AuctionForwardCreate } from "../forward/auction-forward-create";
import { Product } from "@medusajs/medusa";
import { useState } from "react";
import { useAdminCustomPost } from "medusa-react";
import { AuctionReverseCreate } from "./auction-reverse-create";

export function AuctionReverseActions({
    auction,
    product
}: {
    auction: Auction;
    product: Product;
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [bid, setBid] = useState(0.0);
    const { mutateAsync, isLoading } = useAdminCustomPost(
        "/admin/auctions/reverse/" + auction.id + "/bid",
        ["auctions"]
    );

    const handlePost = async () => {
        await mutateAsync({
            amount: bid
        });
    };

    const handleBidChange = (e) => {
        setBid(e.target.value);
    };
    if (!product) {
        return <>No Product Defined</>;
    }
    if (isLoading) {
        return <>Please wait...</>;
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                    <IconButton variant="transparent">
                        <EllipsisHorizontal />
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item className="gap-x-2" onClick={handlePost}>
                        <PencilSquare className="text-ui-fg-subtle" />
                        <input onChange={handleBidChange}></input>
                        Bid
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu>
            {/* <AuctionReverseDrawer
                auction={auction}
                product={product}
                open={drawerOpen}
                setOpen={setDrawerOpen}
            /> */}
        </>
    );
}
