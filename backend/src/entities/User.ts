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
    DEVELOPER = "developer",
    GHOST = "ghost",
}

export enum ExperienceLevel {
    JUNIOR = "junior",
    INTERMEDIATE = "intermediate",
    SENIOR = "senior",
    LEAD = "lead",
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

    @Column({ default: "" })
    @IsNotEmpty()
    mobile: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.DEVELOPER,
    })
    role: string;

    @Column({
        type: "enum",
        enum: ExperienceLevel,
        default: ExperienceLevel.INTERMEDIATE,
    })
    experienceLevel: string;

    @Column({ type: "simple-array", default: "" })
    technologies: string[];

    @Column({ type: "simple-array", default: "" })
    interests: string[];

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
    // Validate user before operations
    async validateUser() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
    }

    // Create token from user data
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

    // Encrypt string into hash password
    hashEncryptPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    // Check if string password matches encrypted hash value
    checkIfPasswordMatches(rawPassword: string) {
        return bcrypt.compareSync(rawPassword, this.password);
    }
}
