import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

// Entities
import { User } from "./User";

@Entity({ name: "huddles" })
export class Huddle {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    category: string;

    @Column()
    @IsNotEmpty()
    readme: string;

    @Column({ type: "simple-array", default: "" })
    tags: string[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne((type) => User, (user) => user.huddles, { eager: true })
    user: User;
}
