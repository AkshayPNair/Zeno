import { CreateUserDTO } from "../../../domain/dtos/createUser.dto";
import { ISignupService } from "../../../domain/interfaces/ISignupService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { hashPassword } from "../../../utils/authUtils";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { AppError } from "../../error/AppError";
import { ErrorCode } from "../../error/ErrorCode";

export class SignupUserUseCase implements ISignupService {
    constructor(private _userRepository: IUserRepository) { }

    async execute(data: CreateUserDTO): Promise<{ id: string; name: string; email: string; }> {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new AppError(
                ErrorCode.VALIDATION_ERROR,
                "All fields are required",
                HttpStatusCode.BAD_REQUEST
            )
        }
        const userExists = await this._userRepository.findByEmail(email)
        if (userExists) {
            throw new AppError(
                ErrorCode.USER_ALREADY_EXISTS,
                "Email already registered",
                HttpStatusCode.CONFLICT
            )
        }
        const hashedPassword = await hashPassword(password)
        const user = await this._userRepository.createUser({
            name,
            email,
            password: hashedPassword
        })
        return {
            id: user.id as string,
            name: user.name,
            email: user.email
        }
    }
}