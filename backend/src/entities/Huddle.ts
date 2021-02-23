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
import { IsNotEmpty } from "class-validator";

// Entities
import { User } from "./User";
import { Comment } from "./Comment";

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
    contentSerialized: string;

    @Column({ type: "simple-array", default: "HTML,CSS" })
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

    @OneToMany((type) => Comment, (comment) => comment.huddle)
    comments: Comment[];
}
