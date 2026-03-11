import React from "react";
import { Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = ({ problems }) => {

    const solvedCount = problems?.length || 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Activity
                </h2>

                <Link
                    to="/problems"
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
                >
                    View Problems
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>


            {solvedCount > 0 ? (
                <div className="space-y-4">

                    {problems.slice().reverse().map((problem, index) => (

                        <Link
                            key={problem._id || index}
                            to={`/problems/${problem._id}`}
                        >
                            <div className="p-4 m-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">

                                <div className="flex items-center gap-4">

                                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                                        AC
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {problem.title}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Difficulty: {problem.difficulty}
                                        </p>
                                    </div>

                                </div>

                                <span className="text-xs text-gray-400 italic">
                                    View
                                </span>

                            </div>
                        </Link>

                    ))}

                </div>
            ) : (

                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No recent activity found.</p>
                </div>

            )}

        </div>
    );
};

export default RecentActivity;