import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
// Entities
import { User } from "../entities/User";

class AuthController {
    static RegisterUser = async (req: Request, res: Response) => {
        // Get parameters from the request body
        let { firstName, lastName, emailAddress, password } = req.body;

        // Create a new User
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        user.password = password;

        // Validate if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors,
            });
        }

        // Hash the password, to securely store on DB
        user.hashEncryptPassword();

        // Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({
                success: false,
                message: "An account is already associated with this email address.",
            });
        }

        // If success, send response with token
        return res.status(200).json({
            success: true,
            token: user.signJsonWebToken(),
            message: "Successfully Registered. Welcome to Dev Huddle!",
        });
    };

    static AuthenticateUser = async (req: Request, res: Response) => {
        //Check if email and password are set
        const { emailAddress, password } = req.body;
        if (!(emailAddress && password)) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required for authentication.",
            });
        }

        // Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({
                where: { emailAddress },
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "No accounts associated with this email address.",
            });
        }

        // Check if encrypted password matches provided raw password
        if (!user.checkIfPasswordMatches(password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials. Please try again.",
            });
        }

        // Send the JWT in the response
        return res.status(200).json({
            success: true,
            token: user.signJsonWebToken(),
            message: "Successfully Authenticated. Welcome back!",
        });
    };

    static ResetPassword = async (req: Request, res: Response) => {};

    static ChangePassword = async (req: Request, res: Response) => {
        // Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        // Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).json({
                success: false,
                message: "Old/New Password was not provided.",
            });
        }

        // Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).json({
                success: false,
                message: "Old/New Password was not provided.",
            });
        }

        // Check if old password matches
        if (!user.checkIfPasswordMatches(oldPassword)) {
            res.status(401).json({
                success: false,
                message: "Invalid Credentials. Failed to authenticate.",
            });
            return;
        }

        // Hash the new password and save
        user.hashEncryptPassword();
        userRepository.save(user);

        res.status(204).json({
            success: true,
            message: "Successfully updated authentication.",
        });
    };
}

export default AuthController;
