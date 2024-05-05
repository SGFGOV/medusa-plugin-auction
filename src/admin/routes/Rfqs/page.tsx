import { RouteConfig } from "@medusajs/admin";
import React, { useState } from "react";

import AuctionViewOngoing from "../../widgets/auction-view-ongoing";

const Bids = (): React.ReactElement => {
    return AuctionViewOngoing({
        notify: {
            success: function (title: string, message: string): void {
                console.log(`${title}: ${message} `);
            },
            error: function (title: string, message: string): void {
                console.error(`${title}: ${message} `);
            },
            warn: function (title: string, message: string): void {
                console.warn(`${title}: ${message} `);
            },
            info: function (title: string, message: string): void {
                console.info(`${title}: ${message} `);
            }
        }
    });
};
export default Bids;

export const config: RouteConfig = {
    link: {
        label: "Ongoing Rfqs"
    }
};
