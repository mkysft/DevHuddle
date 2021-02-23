import axiosInstance from "../axios";
import { handleResponse, handleError } from "../handlers";

export const asyncLoginUser = (params) => {
    const endpoint = "/auth/login";
    return axiosInstance.post(endpoint, params).then(handleResponse).catch(handleError);
};

export const asyncRegisterUser = (params) => {
    const endpoint = "/auth/register";
    return axiosInstance.post(endpoint, params).then(handleResponse).catch(handleError);
};
