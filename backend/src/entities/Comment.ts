import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
} from "typeorm";

// Entities
import { User } from "./User";
import { Post } from "./Post";

@Entity({ name: "comments" })
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    body: string;

    @Column({ type: "simple-array", default: "" })
    likes: string[];

    @Column({ type: "simple-array", default: "" })
    dislikes: string[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne((type) => User, (user) => user.comments, { eager: true })
    user: User;

    @ManyToOne((type) => Post, (post) => post.comments)
    post: Post;
}
