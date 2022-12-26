import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}`,
});
axiosClient.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});
axiosClient.create({withCredentials: true});

export default axiosClient;