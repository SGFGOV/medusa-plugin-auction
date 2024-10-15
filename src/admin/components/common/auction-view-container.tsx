import { PropsWithChildren } from "react";
import { Text, Heading } from "@medusajs/ui";
import { AuctionForwardDrawer } from "../auction/forward/auction-forward-drawer";
import { Product } from "@medusajs/medusa";
import { useState } from "react";

type Props = PropsWithChildren<{
    title?: string;
    description?: string;
}>;

export const AuctionViewContainer = ({
    title,
    description,
    children
}: Props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="border border-grey-20 rounded-rounded bg-white py-6 px-8 flex flex-col relative">
            <div>
                <div className="flex items-center justify-between">
                    {title && (
                        <Heading
                            level="h2"
                            className="text-[24px] leading-9 font-semibold"
                        >
                            {title}
                        </Heading>
                    )}
                </div>

                {description && (
                    <Text className="text-sm text-ui-fg-subtle mt-2">
                        {description}
                    </Text>
                )}
            </div>
            <div>{children}</div>
        </div>
    );
};
