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

export enum ExperienceLevel {
    JUNIOR = "junior",
    INTERMEDIATE = "intermediate",
    SENIOR = "senior",
    LEAD = "lead",
}

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
