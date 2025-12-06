import { LoginUserDTO } from "../dtos/loginUser.dto";

export interface ILoginService {
    execute(data: LoginUserDTO): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
        }
        accessToken:string;
        refreshToken:string;
    }>
}