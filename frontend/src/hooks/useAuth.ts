import { useAuthStore } from "../store/authStore"
import { useCallback, useState } from "react";
import type { LoginPayload, SignupPayload } from "../types/auth";
import { login as loginService, signup as signupService, logout as logoutService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { setUser, clearAuth } = useAuthStore()
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = useCallback(
        async (payload: LoginPayload) => {
            try {
                setLoading(true)
                setError(null)
                const user = await loginService(payload)
                setUser(user)
                return { success: true }
            } catch (error: any) {
                const message = error.response?.data?.message || "Login failed";
                setError(message);
                return { success: false, message };
            } finally {
                setLoading(false);
            }
        },
        [setUser]
    )

    const signup = useCallback(
        async (payload: SignupPayload) => {
            try {
                setLoading(true);
                setError(null);
                await signupService(payload);
                return { success: true };
            } catch (error: any) {
                const message = error.response?.data?.message || "Signup failed";
                setError(message);
                return { success: false, message };
            } finally {
                setLoading(false);
            }
        },
        []
    )

    const logout = useCallback(
        async () => {
            try {
                setLoading(true)
                await logoutService()
                clearAuth()
                navigate('/auth', { replace: true })
                return { success: true }
            } catch (error: any) {
                const message = error.response?.data?.message || "Logout failed"
                navigate('/auth', { replace: true })
                setError(message)
                return { success: false, message }
            } finally {
                setLoading(false)
            }
        },
        [clearAuth, navigate]
    )
    return { login, signup, logout, loading, error };
}