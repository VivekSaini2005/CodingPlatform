import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/user/login', {
            emailId: credentials.email,
            password: credentials.password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/user/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post('/user/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('/user/getProfile');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
