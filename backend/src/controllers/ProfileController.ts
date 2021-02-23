import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";

class ProfileController {
    static getAllProfiles = async (req: Request, res: Response) => {
        const { where, order, page = 1, limit = 10, cache = true }: any = req.params;
        const query: FindManyOptions<Profile> = {
            where: { ...where },
            order: { ...order },
            skip: (page - 1) * limit,
            take: limit,
            cache: cache,
        };

        // Get users from database
        const profileRepository = getRepository(Profile);
        const [profiles, count] = await profileRepository.findAndCount(query);

        // Pagination Calculations continued

        // Send the users object
        res.status(200).json({
            success: true,
            data: profiles,
            pagination: {
                total: count,
            },
        });
    };

    static getProfileByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No Profile ID provided in parameters.",
            });
        }

        // Get the user from database
        const profileRepository = getRepository(Profile);
        try {
            const profile = await profileRepository.findOneOrFail(id);
            return res.status(200).json({
                success: "true",
                message: "Profile was successfully found!",
                data: profile,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Profile found with ID: ${id}`,
            });
        }
    };

    static updateProfileByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No Profile ID provided in parameters.",
            });
        }

        // Fetch and update the Profile from database
        const profileRepository = getRepository(Profile);
        let profile;
        try {
            profile = await profileRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Profiles found with ID: ${id}`,
            });
        }

        try {
            let updatedProfile = await profileRepository.save({ id, ...profile, ...req.body });
            return res.status(200).json({
                success: "true",
                message: "Profile was successfully updated!",
                data: updatedProfile,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to update Profile. Try again.`,
            });
        }
    };

    static deleteProfileByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in parameters.",
            });
        }

        // Fetch and delete the user from database
        const userRepository = getRepository(User);
        try {
            await userRepository.delete(id);
            return res.status(200).json({
                success: "true",
                message: "User account was successfully deleted!",
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }
    };
}

export default ProfileController;
