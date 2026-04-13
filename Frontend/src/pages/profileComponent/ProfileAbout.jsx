import React from "react";
import { Mail, User, Calendar } from "lucide-react";

const ProfileAbout = ({ user }) => {

    const joinDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "Recently";

    return (
        <div className="space-y-8">

            {/* About Me */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    About Me
                </h2>

                <div className="space-y-4">

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <Mail className="h-5 w-5 text-gray-400" />
                        {user.emailId}
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <User className="h-5 w-5 text-gray-400" />
                        {user.age + " years old" || "Not specified"}
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        Joined {joinDate}
                    </div>

                </div>

            </div>


            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Skills & Tags
                </h2>

                <div className="flex flex-wrap gap-2">

                    {(user.skills || [
                        "Problem Solving",
                        "Algorithms",
                        "Data Structures",
                        "Competitive Programming"
                    ]).map((skill, index) => (

                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default ProfileAbout;