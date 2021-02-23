import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    OneToOne,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn,
} from "typeorm";
import { validate, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

// Entities
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Huddle } from "./Huddle";
import { Comment } from "./Comment";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
}

export enum ExperienceLevel {
    JUNIOR = "junior",
    INTERMEDIATE = "intermediate",
    SENIOR = "senior",
    PRINCIPAL = "principal",
}

@Entity({ name: "users" })
@Unique(["emailAddress"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    emailAddress: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    role: string;

    @Column({
        type: "enum",
        enum: ExperienceLevel,
        default: ExperienceLevel.JUNIOR,
    })
    experienceLevel: string;

    @Column({ type: "simple-array", default: "" })
    techStack: string[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany((type) => Post, (post) => post.user)
    posts: Post[];

    @OneToMany((type) => Huddle, (huddle) => huddle.user)
    huddles: Huddle[];

    @OneToMany((type) => Comment, (comment) => comment.user)
    comments: Comment[];

    // Methods
    @BeforeInsert()
    @BeforeUpdate()
    async validateUser() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
    }

    signJsonWebToken() {
        return jwt.sign(
            {
                id: this.id,
                email: this.emailAddress,
                firstname: this.firstName,
                lastName: this.lastName,
                role: this.role,
                createdAt: this.createdAt,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );
    }

    hashEncryptPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfPasswordMatches(rawPassword: string) {
        return bcrypt.compareSync(rawPassword, this.password);
    }
}
