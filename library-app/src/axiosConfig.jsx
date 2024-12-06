import axios from "axios";
// import { store } from './store'; // Sesuaikan dengan path yang sesuai dengan store Anda
// import { refreshToken } from "./slices/authSilce"; // Pastikan path yang sesuai dengan lokasi authSlice Anda
import AuthService from "./services/authService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

apiClient.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await AuthService.refreshToken();
        // await store.dispatch(refreshToken()).unwrap();
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }

    }

    return Promise.reject(error);

  }

);



export default apiClient;
