import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps{
    children:React.ReactNode
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthStore()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <>{children}</>
}