import React from "react";
import { useAuth } from "../context/AuthContext";
import RecentActivity from "./profileComponent/RecentActivity";
import HeatMap from "./profileComponent/HeatMap";
import {
  LayoutDashboard,
  Zap,
  Trophy,
  Clock,
  ArrowRight,
  Target,
  TrendingUp,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
const Dashboard = () => {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        {" "}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>{" "}
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const solvedCount = user.problemSolved?.length || 0;
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-black dark:text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
      {" "}
      {/* Header / Welcome */}{" "}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        {" "}
        <div>
          {" "}
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center gap-3">
            {" "}
            Welcome back, {user.firstName}! 👋{" "}
          </h1>{" "}
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {" "}
            Ready to tackle today's coding challenges?{" "}
          </p>{" "}
        </div>{" "}
        <Link
          to="/problems"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all active:scale-95 group"
        >
          {" "}
          Solve Problems{" "}
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />{" "}
        </Link>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {" "}
        {/* Main Content Area */}{" "}
        <div className="lg:col-span-3 space-y-8">
          {" "}
          {/* Stats Grid */}{" "}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {" "}
            <StatCard
              icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
              label="Solved"
              value={solvedCount}
              color="border-green-500/20"
            />{" "}
            <StatCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              label="Streak"
              value="N/A"
              color="border-yellow-500/20"
            />{" "}
            <StatCard
              icon={<Trophy className="h-6 w-6 text-yellow-500" />}
              label="Rank"
              value={user?.rank || "N/A"}
              color="border-blue-500/20"
            />{" "}
            <StatCard
              icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
              label="Rating"
              value={user?.rating || "soon"}
              color="border-purple-500/20"
            />{" "}
          </div>{" "}
          {/* Heatmap Section */} <HeatMap submissions={user.problemSolved} />{" "}
          {/* Recent Activity Section */}{" "}
          <RecentActivity problems={user.problemSolved} />{" "}
        </div>{" "}
        {/* Sidebar */}{" "}
        <div className="space-y-4">
          {" "}
          {/* Recommended Side Section */}{" "}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl p-4 text-black dark:text-white">
            {" "}
            <div>
              {" "}
              <h3 className="font-bold text-lg mb-2 text-black dark:text-white">Daily Challenge</h3>{" "}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Solve today's featured problem and earn double points!
              </p>{" "}
              <Link
                to="/problems"
                className="bg-gray-100 text-black dark:bg-[#2f2f2f] dark:text-white px-4 py-2 rounded-lg text-sm font-bold inline-block transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]"
              >
                {" "}
                Start Now{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl p-4">
            {" "}
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Recommended</h3>{" "}
            <div className="space-y-4">
              {" "}
              {[
                { title: "Linear Search", diff: "Easy" },
                { title: "Binary Search", diff: "Medium" },
                { title: "Sort the Array", diff: "Easy" },
              ].map((prob, i) => (
                <Link
                  key={i}
                  to="/problems"
                  className="block group hover:bg-gray-100 dark:hover:bg-[#2f2f2f] p-2 rounded-lg transition-colors"
                >
                  {" "}
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-yellow-500 transition-colors">
                    {prob.title}
                  </p>{" "}
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase bg-gray-100 dark:bg-[#2f2f2f] ${prob.diff === "Easy" ? "text-green-600 dark:text-green-400" : prob.diff === "Medium" ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {prob.diff}
                  </span>{" "}
                </Link>
              ))}{" "}
            </div>{" "}
            <Link
              to="/problems"
              className="mt-6 block text-center text-xs font-bold text-gray-400 hover:text-yellow-500 transition-colors uppercase tracking-widest"
            >
              {" "}
              Browse All Problems{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
const StatCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] p-5 group flex items-center justify-between`}
  >
    {" "}
    <div>
      {" "}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>{" "}
      <p className="text-2xl font-black text-gray-800 dark:text-gray-200 tabular-nums">
        {value}
      </p>{" "}
    </div>{" "}
    <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-[#2f2f2f] flex items-center justify-center group-hover:scale-110 transition-transform">
      {" "}
      {icon}{" "}
    </div>{" "}
  </div>
);
const ActivityItem = ({ status, title, description, time, type }) => (
  <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-[#2f2f2f] bg-gray-50/50 dark:bg-gray-700/30">
    {" "}
    <div
      className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${type === "success" ? "bg-green-400" : "bg-yellow-500"}`}
    ></div>{" "}
    <div className="flex-1">
      {" "}
      <div className="flex justify-between items-start">
        {" "}
        <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{title}</h4>{" "}
        <span className="text-[10px] text-gray-400 font-medium uppercase">
          {time}
        </span>{" "}
      </div>{" "}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {description}
      </p>{" "}
    </div>{" "}
  </div>
);
export default Dashboard;
