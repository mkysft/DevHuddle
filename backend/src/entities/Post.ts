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
import marked from "marked";
import xss from "xss";
import slugify from "slugify";

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
    slug: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    contentMarkdown: string;

    @Column()
    contentHTML: string;

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

    // Methods
    @BeforeInsert()
    @BeforeUpdate()
    async processHTML() {
        const dirtyHTML = await marked(this.contentMarkdown);
        this.contentHTML = xss(dirtyHTML);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async slugifyTitle() {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
}
