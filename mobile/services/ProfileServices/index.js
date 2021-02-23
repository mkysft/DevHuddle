import axiosInstance from "../axios";
import { handleResponse, handleError } from "../handlers";

export const asyncUpdateProfile = (id, params) => {
    const endpoint = `/profile/${id}`;
    return axiosInstance.put(endpoint, params).then(handleResponse).catch(handleError);
};
