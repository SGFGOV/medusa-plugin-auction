/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Bid } from "./bid";
import getStatus from "../util/get-status";
import { Region } from "./region";
import { Product } from "./product";

export enum AuctionStatus {
    PENDING = "pending",
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled",
    SOLD = "sold"
}

@Entity()
export class Auction extends BaseEntity {
    @Column()
    starts_at: Date;

    @Column()
    ends_at: Date;

    @Column({
        type: "enum",
        enum: AuctionStatus,
        default: AuctionStatus.PENDING
    })
    status: AuctionStatus;

    @Column()
    quantity: number;

    @Column()
    starting_price: number;

    @Column()
    product_id: string;

    @Column()
    region_id: string;

    @Column()
    created_by: string;

    @OneToMany(() => Bid, (b) => b.auction, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "id", referencedColumnName: "auction_id" })
    bids: Bid[];

    @ManyToOne(() => Region, (b) => b.auctions)
    @JoinColumn({ name: "region_id", referencedColumnName: "id" })
    region: Region;

    @ManyToOne(() => Product, (b) => b.auctions)
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: Product;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "auction");
        this.status = getStatus(this.starts_at, this.ends_at);
    }
}
