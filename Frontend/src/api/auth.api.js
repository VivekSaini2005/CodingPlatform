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

export const googleAuth = async (credential) => {
    try {
        const response = await axiosInstance.post('/user/google', {
            token: credential
        });
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

export const getUserRank = async () => {
    try {
        const response = await axiosInstance.get('/api/rank');
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}

export const updateProfile = async (userData) => {
    try {
        const response = await axiosInstance.post('/user/updateProfile', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const uploadProfileImage = async (image) => {
    try {
        const response = await axiosInstance.post(
            '/user/uploadProfile',
            image,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCoverImage = async (image) => {
    try {
        const response = await axiosInstance.post(
            '/user/uploadCoverImage',
            image,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

