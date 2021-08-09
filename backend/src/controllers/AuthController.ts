import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
// Entities
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";

class AuthController {
    static RegisterUser = async (req: Request, res: Response) => {
        // Get parameters from the request body
        let { emailAddress, password } = req.body;

        if (!(emailAddress && password)) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required for registration.",
            });
        }

        await getConnection().transaction(async (transactionalEntityManager) => {

            // Create a profile for User
            let profile = new Profile();
            // const profileRepository = getRepository(Profile);
            // let newProfile = await profileRepository.save(profile);
            let newProfile = await transactionalEntityManager.save(profile);

            // Create a new User
            let user = new User();
            user.emailAddress = emailAddress;
            user.password = password;
            user.profile = newProfile;

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
            let newUser;
            try {
                // const userRepository = getRepository(User);
                // newUser = await userRepository.save(user);
                newUser = await transactionalEntityManager.save(user);
                newUser.password = undefined;
            } catch (error) {
                console.log(error)
                return res.status(409).json({
                    success: false,
                    message: "An account is already associated with this email address.",
                });
            }

            // If success, send response with token
            return res.status(200).json({
                success: true,
                data: newUser,
                token: user.signJsonWebToken(),
                message: "Successfully Registered. Welcome to Dev Huddle!",
            });
        })

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
                relations: ["profile"],
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

        user.password = undefined;

        // Send the JWT in the response
        return res.status(200).json({
            success: true,
            data: user,
            token: user.signJsonWebToken(),
            message: "Successfully Authenticated. Welcome back!",
        });
    };

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
