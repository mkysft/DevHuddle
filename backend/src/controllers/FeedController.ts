import { Request, Response } from "express";

class UserController {
    static getFeed = async (req: Request, res: Response) => {
        let posts = [];

        // Send the users object
        res.status(200).json({
            success: true,
            message: "Feed provided",
            data: posts,
        });
    };
}

export default UserController;
