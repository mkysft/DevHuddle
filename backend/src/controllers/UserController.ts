import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import { UserRequest } from "../interfaces/UserRequestInterface";
import { User } from "../entities/User";

interface QueryParams {
    select: string[];
}
class UserController {
    static getAllUsers = async (req: Request, res: Response) => {
        const { where, order, page = 1, limit = 10, cache = true }: any = req.params;
        const query: FindManyOptions<User> = {
            where: { ...where },
            order: { ...order },
            skip: (page - 1) * limit,
            take: limit,
            cache: cache,
        };

        // Get users from database
        const userRepository = getRepository(User);
        const [users, count] = await userRepository.findAndCount(query);

        // Pagination Calculations continued

        // Send the users object
        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total: count,
            },
        });
    };

    static getUserByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in parameters.",
            });
        }

        // Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            user.password = undefined;
            return res.status(200).json({
                success: "true",
                message: "User was successfully found!",
                data: user,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }
    };

    static updateUserByID = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in parameters.",
            });
        }

        // Fetch and update the user from database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }

        try {
            let updatedUser = await userRepository.save({ id, ...user, ...req.body });
            return res.status(200).json({
                success: "true",
                message: "User was successfully updated!",
                data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to update User. Try again.`,
            });
        }
    };

    static deleteUserByID = async (req: Request, res: Response) => {
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

    static getCurrentUser = async (req: UserRequest, res: Response) => {
        // Get the user ID from the authentication middleware
        const id: string = req?.user?.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in token.",
            });
        }

        // Fetch and return the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, { relations: ["profile"] });
            user.password = undefined;
            return res.status(200).json({
                success: "true",
                message: "User was successfully found!",
                data: user,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }
    };

    static updateCurrentUser = async (req: UserRequest, res: Response) => {
        // Get the user ID from the authentication middleware
        const id: string = req.user.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in token.",
            });
        }

        // Fetch and return the user from database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }

        // Get parameters from the request body
        let { firstName, lastName, emailAddress, experienceLevel, techStack } = req.body;

        // Create a new User
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        user.experienceLevel = experienceLevel;
        user.techStack = techStack;

        try {
            await userRepository.save(user);
            return res.status(200).json({
                success: "true",
                message: "User was successfully updated!",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to update User. Try again.`,
            });
        }
    };

    static activateUser = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in parameters.",
            });
        }

        // Fetch and return the user from database
        const userRepository = getRepository(User);
        try {
            await userRepository.restore(id);
            return res.status(200).json({
                success: "true",
                message: "User account successfully re-activated.",
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }
    };

    static deactivateUser = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No User ID provided in parameters.",
            });
        }

        // Fetch and return the user from database
        const userRepository = getRepository(User);
        try {
            await userRepository.softDelete(id);
            return res.status(200).json({
                success: "true",
                message: "User account de-activated.",
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: `No Users found with ID: ${id}`,
            });
        }
    };
}

export default UserController;
