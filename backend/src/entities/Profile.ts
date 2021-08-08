import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

// Entities

export enum ProfileType {
    DEVELOPER = "developer",
    BUSINESS = "business",
}

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 0 })
    interactions: number;

    @Column({ default: 0 })
    impressions: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
