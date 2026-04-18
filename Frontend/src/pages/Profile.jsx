import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import ProfileHeader from "../pages/profileComponent/ProfileHeader";
import ProfileStats from "../pages/profileComponent/ProfileStats";
import ProfileAbout from "../pages/profileComponent/ProfileAbout";
import RecentActivity from "../pages/profileComponent/RecentActivity";

const Profile = () => {
  const { user, loading, loadUser } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const solvedCount = user.problemSolved?.length || 0;
  const globalTopPercent = user.topPercent || 0;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-black dark:text-white max-w-7xl mx-auto px-4 py-10">
      <ProfileHeader user={user} loadUser={loadUser} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileAbout user={user} />

        <div className="lg:col-span-2 space-y-6">
          <ProfileStats solvedCount={solvedCount} globalTopPercent={globalTopPercent} />
          <RecentActivity problems={user.problemSolved} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
