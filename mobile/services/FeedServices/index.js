import axiosInstance from "../axios";
import { handleResponse, handleError } from "../handlers";

export const asyncGetFeed = (params) => {
    const endpoint = "/feed";
    return axiosInstance.post(endpoint, params).then(handleResponse).catch(handleError);
};
