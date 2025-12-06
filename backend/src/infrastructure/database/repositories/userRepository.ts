import { UserEntity } from "../../../domain/entities/UserEntity";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserModel } from "../models/UserModel";

export class UserRespository implements IUserRepository {
    async createUser(user: UserEntity): Promise<UserEntity> {
        const createdUser = await UserModel.create({
            name: user.name,
            email: user.email,
            password: user.password
        })

        return {
            id: createdUser._id.toString(),
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password
        }
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email })

        if (!user) return null

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password
        }
    }
    async findById(id: string) {
        return await UserModel.findById(id);
    }
}