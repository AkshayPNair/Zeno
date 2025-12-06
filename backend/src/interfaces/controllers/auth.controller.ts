import { Request, Response, NextFunction } from "express";
import { ILoginService } from "../../domain/interfaces/ILoginService";
import { ISignupService } from "../../domain/interfaces/ISignupService";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { AppError } from "../../application/error/AppError";
import { ErrorCode } from "../../application/error/ErrorCode";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/authUtils";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class AuthController {
    constructor(
        private _signupService: ISignupService,
        private _loginService: ILoginService,
        private _userRepository: IUserRepository
    ) { }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this._signupService.execute(req.body)
            res.status(HttpStatusCode.CREATED).json({ success: true, data })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { data, accessToken, refreshToken } = await this._loginService.execute(req.body)
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000, // 15 mins
                path: '/'
            })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            })
            res.status(HttpStatusCode.OK).json({ success: true, data })
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                throw new AppError(
                    ErrorCode.INVALID_CREDENTIALS,
                    "Refresh Token not found",
                    HttpStatusCode.UNAUTHORIZED
                )
            }
            let decoded
            try {
                decoded = verifyRefreshToken(refreshToken)
            } catch (error:any) {
                throw new AppError(
                    ErrorCode.INVALID_CREDENTIALS,
                    error.message === "jwt expired" ? "Refresh token expired. Please login again." : "Invalid refresh token",
                    HttpStatusCode.UNAUTHORIZED
                )
            }
            const user = await this._userRepository.findById(decoded.id)
            if (!user) {
                throw new AppError(
                    ErrorCode.INVALID_CREDENTIALS,
                    "User not found",
                    HttpStatusCode.UNAUTHORIZED
                );
            }
            const newAccessToken = generateAccessToken(user.id!)
            const newRefreshToken = generateRefreshToken(user.id!)

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60 * 1000,
                path: "/",
            })

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            })

            res.status(HttpStatusCode.OK).json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req:Request,res:Response,next:NextFunction){
        try {
            res.clearCookie("accessToken",{path:'/'})
            res.clearCookie("refreshToken",{path:'/'})

            res.status(HttpStatusCode.OK).json({
                success:true,
                message:'Logged out successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}