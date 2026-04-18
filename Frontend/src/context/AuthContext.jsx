import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  getProfile,
  registerUser,
  getUserRank,
  googleAuth as googleAuthApi,
} from "../api/auth.api";
import { getSolvedQuestion } from "../api/problem.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const profileData = await getProfile();
      const solvedData = await getSolvedQuestion();
      const rankData = await getUserRank();

      const updatedUser = {
        ...profileData,
        problemSolved: solvedData || [],
        rank: rankData.rank,
        topPercent: rankData.topPercent,
      };

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
    const data = await loginUser(credentials);
    await loadUser();
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    await loadUser();
    return data;
  };

  const googleLogin = async (credential) => {
    const data = await googleAuthApi(credential);
    await loadUser();
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, googleLogin, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
