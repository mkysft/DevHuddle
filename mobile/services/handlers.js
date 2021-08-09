export const handleResponse = async (response) => {
    const { data } = response;
    return data;
};

export const handleError = (responseError) => {
    // console.error(responseError);
    // throw responseError;
};
