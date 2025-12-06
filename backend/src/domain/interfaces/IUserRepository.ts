import { UserEntity } from "../entities/UserEntity";

export interface IUserRepository {
    createUser(user: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id:string):Promise<any>
}