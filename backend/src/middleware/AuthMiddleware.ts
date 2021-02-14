import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserRequest } from "../interfaces/UserRequestInterface";

export const Authenticate = async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string;
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        return res.status(400).json({
            success: false,
            message: "No authorization strategy was detected.",
        });
    }

    if (authorizationHeader.startsWith("Bearer ")) {
        token = authorizationHeader.split(" ")[1];
    } else {
        return res.status(400).json({
            success: false,
            message: "Incorrect authentication strategy detected.",
        });
    }

    if (token) {
        try {
            const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = jwtDecoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "This token is invalid. Please authenticate and try again.",
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "An access token is required to process this request.",
        });
    }
    next();
};

export const Authorize = (...roles) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    success: false,
                    message: `User ROLE: ${req.user.role} is not authorized to process this request.`,
                })
            );
        }
        next();
    };
};
