import api from "./api";
import { type SignupPayload,type AuthResponse,type LoginPayload } from "../types/auth";

export const signup=async (payload:SignupPayload):Promise<AuthResponse>=>{
    const res=await api.post('/auth/signup',payload)
    return res.data.data
}
export const login=async(payload:LoginPayload):Promise<AuthResponse>=>{
    const res=await api.post('/auth/login',payload)
    return res.data.data
}

export const refresh= async ():Promise<AuthResponse>=>{
    const res=await api.post('/auth/refresh')
    return res.data.data
}

export const logout = async():Promise<void>=>{
    await api.post('/auth/logout')
}