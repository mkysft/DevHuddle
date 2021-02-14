import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { UserRequest } from "../interfaces/UserRequestInterface";
import { User } from "../entities/User";

class UserController {
    static getAllUsers = async (req: Request, res: Response) => {
        // Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        // Do pagination stuff I guess

        // Send the users object
        res.status(200).json({
            success: true,
            data: users,
        });
    };

    static getUserByID = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: string = req.params.id;

        //Get the user from database
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

    static getCurrentUser = async (req: UserRequest, res: Response) => {
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

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { username, role } = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
}

export default UserController;
