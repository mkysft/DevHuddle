import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    OneToMany,
} from "typeorm";

// Entities

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "simple-array", default: "frontend,backend,devops" })
    tags: string[];

    @Column({ default: 0 })
    avgReadingTime: number;

    @Column({ default: 0 })
    avgUsageTime: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
