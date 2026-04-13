import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import ProfileHeader from "../pages/profileComponent/ProfileHeader";
import ProfileStats from "../pages/profileComponent/ProfileStats";
import ProfileAbout from "../pages/profileComponent/ProfileAbout";
import RecentActivity from "../pages/profileComponent/RecentActivity";
import EditProfile from "./profileComponent/EditProfile";

const Profile = () => {

    const { user, loading, loadUser } = useAuth();
    // const { user, setUser } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    const solvedCount = user.problemSolved?.length || 0;
    const globalTopPercent = user.topPercent || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <ProfileHeader user={user} loadUser={loadUser} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <ProfileAbout user={user} />

                <div className="lg:col-span-2 space-y-8">

                    <ProfileStats
                        solvedCount={solvedCount}
                        globalTopPercent={globalTopPercent}
                    />

                    <RecentActivity problems={user.problemSolved} />

                </div>

            </div>

        </div>
    );
};

export default Profile;