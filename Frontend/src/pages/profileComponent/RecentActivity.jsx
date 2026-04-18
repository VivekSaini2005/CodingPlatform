import React from "react";
import { Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = ({ problems }) => {

    const solvedCount = problems?.length || 0;

    return (
        <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] p-4">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Recent Activity
                </h2>

                <Link
                    to="/problems"
                    className="text-yellow-500 text-sm font-medium hover:text-yellow-400 flex items-center gap-1"
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
                            <div className="p-4 m-4 bg-gray-100 dark:bg-[#2f2f2f] rounded-xl border border-gray-200 dark:border-[#2f2f2f] flex items-center justify-between hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-all duration-200">

                                <div className="flex items-center gap-4">

                                    <div className="h-10 w-10 rounded-full bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center text-green-500 dark:text-green-400 font-bold">
                                        AC
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                                            {problem.title}
                                        </p>

                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Difficulty: {problem.difficulty}
                                        </p>
                                    </div>

                                </div>

                                <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    View
                                </span>

                            </div>
                        </Link>

                    ))}

                </div>
            ) : (

                <div className="py-12 text-center text-gray-400">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No recent activity found.</p>
                </div>

            )}

        </div>
    );
};

export default RecentActivity;