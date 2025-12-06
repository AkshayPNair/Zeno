import { LoginUserDTO } from "../../../domain/dtos/loginUser.dto";
import { ILoginService } from "../../../domain/interfaces/ILoginService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { comparePassword, generateAccessToken, generateRefreshToken } from "../../../utils/authUtils";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class LoginUserUseCase implements ILoginService {
    constructor(private _userRepository: IUserRepository) { }

    async execute(data: LoginUserDTO): Promise<{ data: { id: string; name: string; email: string; }; accessToken: string; refreshToken: string; }> {
        const { email, password } = data
        if (!email || !password) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "Email and password are required",
                HttpStatusCode.BAD_REQUEST
            );
        }
        const user = await this._userRepository.findByEmail(email)
        if (!user) {
            throw new AppError(
                ErrorCode.INVALID_CREDENTIALS,
                "User not found, Signup First",
                HttpStatusCode.UNAUTHORIZED
            );
        }
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            throw new AppError(
                ErrorCode.INVALID_CREDENTIALS,
                "Invalid password",
                HttpStatusCode.UNAUTHORIZED
            );
        }
        const accessToken = generateAccessToken(user.id!);
        const refreshToken = generateRefreshToken(user.id!);
        return {
            data: {
                id: user.id as string,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken
        }
    }
}