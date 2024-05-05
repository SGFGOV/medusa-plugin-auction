import {
    EllipsisHorizontal,
    Trash,
    PencilSquare,
    Spinner
} from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { Auction } from "src/models/auction";
import { AuctionDrawer } from "./auction-drawer";
import { Product } from "@medusajs/medusa";
import { useState } from "react";
import { useAdminCustomPost } from "medusa-react";

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
        "/admin/auctions/reverse" + auction.id,
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
            <AuctionDrawer
                auction={auction}
                product={product}
                open={drawerOpen}
                setOpen={setDrawerOpen}
            />
        </>
    );
}
