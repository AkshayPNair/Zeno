import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            const isAuthEndpoint= originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/signup') || originalRequest.url.includes('/auth/refresh')
            if(isAuthEndpoint){
                return Promise.reject(error)
            }
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post("/auth/refresh");
                processQueue(null);
                return api(originalRequest);
              } catch (err) {
                processQueue(err);
                useAuthStore.getState().clearAuth();
                window.location.href = "/auth";
                return Promise.reject(err);
              } finally {
                isRefreshing = false;
              }
        }
        return Promise.reject(error)
    }    
)

export default api