import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getProfile, registerUser, getUserRank, googleAuth as googleAuthApi } from '../api/auth.api';
import { getSolvedQuestion } from '../api/problem.api';
import { socket } from '../socket/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            // get basic user
            const profileData = await getProfile();

            // console.log("This is the Profile Data " + profileData)

            // get solved problems
            const solvedData = await getSolvedQuestion();

            // get user rank
            const rankData = await getUserRank();

            // attach solved problems to user
            const updatedUser = {
                ...profileData,
                problemSolved: solvedData || [],
                rank: rankData.rank,
                topPercent: rankData.topPercent,
            };

            console.log("Updated User Data", updatedUser);

            setUser(updatedUser);

        } catch (error) {
            console.error("Failed to load user profile:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await loginUser(credentials);

            await loadUser();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const data = await registerUser(userData);

            await loadUser();

            return data;
        } catch (error) {
            throw error;
        }
    };

    const googleLogin = async (credential) => {
        try {
            const data = await googleAuthApi(credential);
            await loadUser();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, googleLogin, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log(context);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
