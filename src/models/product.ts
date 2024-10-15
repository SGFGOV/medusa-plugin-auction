/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Auction } from "./auction";
import { Entity, OneToMany, JoinColumn } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";

@Entity()
export class Product extends MedusaProduct {
    @OneToMany(() => Auction, (b) => b.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "id", referencedColumnName: "product_id" })
    auctions: Auction[];
}
