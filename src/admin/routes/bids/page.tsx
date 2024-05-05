import { RouteConfig } from "@medusajs/admin";
import React, { useState } from "react";
import AuctionBids from "../../widgets/auction-bids";

const Bids = (): React.ReactElement => {
    return (
        <>
            <AuctionBids
                notify={{
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
                }}
            />
        </>
    );
};
export default Bids;

export const config: RouteConfig = {
    link: {
        label: "My Bids"
    }
};
