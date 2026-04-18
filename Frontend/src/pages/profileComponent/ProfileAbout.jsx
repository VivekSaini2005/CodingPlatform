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
            <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] p-4">

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    About Me
                </h2>

                <div className="space-y-4">

                    <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="h-5 w-5 text-gray-400" />
                        {user.emailId}
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                        <User className="h-5 w-5 text-gray-400" />
                        {user.age + " years old" || "Not specified"}
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        Joined {joinDate}
                    </div>

                </div>

            </div>


            {/* Skills */}
            <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] p-4">

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
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
                            className="px-3 py-1 bg-gray-100 text-black dark:bg-[#2f2f2f] dark:text-white rounded-full text-sm"
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