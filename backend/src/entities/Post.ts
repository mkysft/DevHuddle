import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

// Entities
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({ name: "posts" })
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    content: string;

    @Column({ type: "simple-array", default: "HTML,CSS" })
    tags: string[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne((type) => User, (user) => user.posts, { eager: true })
    user: User;

    @OneToMany((type) => Comment, (comment) => comment.post)
    comments: Comment[];
}
