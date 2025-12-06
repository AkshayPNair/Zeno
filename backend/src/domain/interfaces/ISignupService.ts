import { CreateUserDTO } from "../dtos/createUser.dto";

export interface ISignupService{
    execute(data:CreateUserDTO):Promise<{id:string;name:string;email:string}>;
}