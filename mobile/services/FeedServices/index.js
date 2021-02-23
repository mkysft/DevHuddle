import axiosInstance from "../axios";
import { handleResponse, handleError } from "../handlers";

export const asyncGetTodaysFeed = (params) => {
    const endpoint = "/feed";
    return axiosInstance.post(endpoint, params).then(handleResponse).catch(handleError);
};
