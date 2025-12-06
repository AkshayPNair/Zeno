import { create } from 'zustand'
import { type AuthResponse } from '../types/auth'

interface AuthState {
    user: AuthResponse | null
    isAuthenticated:boolean
    isLoading: boolean
    setUser: (user: AuthResponse) => void
    clearAuth:()=>void
    initializeAuth: () => Promise<void>
}

const STORAGE_KEY = 'auth_user'

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated:false,
    isLoading:true,

    setUser: (user) => {
        set({ user , isAuthenticated:true})
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },
    clearAuth:()=>{
        set({user:null, isAuthenticated:false})
        localStorage.removeItem(STORAGE_KEY)
    },
    initializeAuth: async () => {
        try {
            set({ isLoading: true })
            const stored = localStorage.getItem(STORAGE_KEY)
            
            if (stored) {
                const user = JSON.parse(stored)
                set({ user, isAuthenticated: true })
            }
        } catch (error) {
            console.error('Failed to initialize auth:', error)
            set({ user: null, isAuthenticated: false })
        } finally {
            set({ isLoading: false })
        }
    }
}))
