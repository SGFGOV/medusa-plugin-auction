/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { generateEntityId, BaseEntity } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Auction } from "./auction";

@Entity()
export class Bid extends BaseEntity {
    @Column()
    amount: number;

    @Column()
    customer_id: string;

    @Column({ name: "auction_id", nullable: false })
    auction_id: string;

    @ManyToOne(() => Auction, (auction) => auction.bids)
    @JoinColumn({ name: "auction_id" })
    auction: Auction;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "bid");
    }
}
