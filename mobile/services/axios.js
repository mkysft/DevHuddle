import axios from "axios";
import { API_URL, DEV_API_URL } from "../config";

const axiosInstance = axios.create({
    baseURL: DEV_API_URL,
    timeout: 5000,
    timeoutErrorMessage: "TIMEOUT 5000: Request took longer than expected",
});

export const setAuthorizationToken = (token) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default axiosInstance;
