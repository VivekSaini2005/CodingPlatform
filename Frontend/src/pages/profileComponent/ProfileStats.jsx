import React from "react";
import { Award, BookOpen } from "lucide-react";

const ProfileStats = ({ solvedCount, globalTopPercent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Problems Solved */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-green-500 transition-colors">

                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                    <Award className="h-6 w-6" />
                </div>

                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {solvedCount}
                </p>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Problems Solved
                </p>

            </div>


            {/* Contests */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-colors">

                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <BookOpen className="h-6 w-6" />
                </div>

                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    soon
                </p>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Contests Attended
                </p>

            </div>


            {/* Rank */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center group hover:border-purple-500 transition-colors">

                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                    <Award className="h-6 w-6" />
                </div>

                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Top {globalTopPercent}%
                </p>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Global Rank
                </p>

            </div>

        </div>
    );
};

export default ProfileStats;