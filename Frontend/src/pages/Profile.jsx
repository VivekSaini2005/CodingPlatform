import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Award, BookOpen, ChevronRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const solvedCount = user.problemSolved?.length || 0;
    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    }) : 'Recently';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12">
                        <div className="flex items-end gap-6">
                            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-700 p-1 shadow-lg ring-4 ring-white dark:ring-gray-800">
                                <div className="h-full w-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    {user.firstName} {user.lastName}
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 uppercase tracking-wider">
                                        {user.role || 'User'}
                                    </span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">@{user.emailId?.split('@')[0]}</p>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors active:scale-95">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - User Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span>{user.emailId}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <User className="h-5 w-5 text-gray-400" />
                                <span>{user.age || 'Not specified'} years old</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span>Joined {joinDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills & Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Problem Solving', 'Competitive Programming', 'Algorithms', 'Data Structures'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-green-500 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform">
                                <Award className="h-6 w-6" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{solvedCount}</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Problems Solved</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">0</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contests Attended</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-purple-500 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                <Award className="h-6 w-6" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">Top 0%</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Global Rank</p>
                        </div>
                    </div>

                    {/* Activity Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                            <Link to="/problems" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
                                View Problems <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {solvedCount > 0 ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 flex items-center justify-between group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                                            AC
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">Problem solved</p>
                                            <p className="text-xs text-gray-500">You've successfully solved {solvedCount} problems on CodeHub!</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 italic">Recent</span>
                                </div>
                            </div>
                        ) : (
                            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                                <Award className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>No recent activity found. Start solving problems to see your progress here!</p>
                                <Link to="/problems" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                    Browse Problems
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
