
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { verifyAccessToken } from "../../utils/authUtils";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Access token not found",
        })
    }

    try {
        const decoded = verifyAccessToken(token)
        req.userId = decoded.id
        next()
    } catch (error: any) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: error.message || "Invalid or expired access token",
        })
    }
}