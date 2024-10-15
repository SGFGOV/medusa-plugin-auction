/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Auction } from "./auction";
import { Entity, OneToMany, JoinColumn } from "typeorm";
import { Region as MedusaRegion } from "@medusajs/medusa";

@Entity()
export class Region extends MedusaRegion {
    @OneToMany(() => Auction, (b) => b.region, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "id", referencedColumnName: "region_id" })
    auctions: Auction[];
}
