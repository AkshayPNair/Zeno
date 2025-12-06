import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthProviderProps{
    children:React.ReactNode
}

export const AuthProvider:React.FC<AuthProviderProps>=({children})=>{
    const initializeAuth = useAuthStore((state)=>state.initializeAuth)
    useEffect(()=>{
        initializeAuth()
    },[initializeAuth])

    return <>{children}</>
} 