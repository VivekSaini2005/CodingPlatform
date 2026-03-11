import React, { useState } from "react";
import defaultProfile from "../../assets/defaultProfile.png";
import defaultCover from "../../assets/defaultCover.png";
import EditProfile from "../profileComponent/EditProfile";

const ProfileHeader = ({ user, loadUser }) => {

    const [openEdit, setOpenEdit] = useState(false);

    const profileImage = user?.profileImage || defaultProfile;
    const coverImage = user?.coverImage || defaultCover;

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">

                {/* Cover Image */}
                <div className="h-32 w-full">
                    <img
                        src={coverImage}
                        alt="cover"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.src = defaultCover;
                        }}
                    />
                </div>

                <div className="px-8 pb-4">
                    <div className="relative flex justify-between items-end -mt-12">

                        <div className="flex items-end gap-6">

                            {/* Avatar */}
                            <div className="flex flex-col items-center">

                                <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-700 p-1 shadow-lg">
                                    <img
                                        src={profileImage}
                                        alt="profile"
                                        className="h-full w-full rounded-xl object-cover"
                                        onError={(e) => {
                                            e.target.src = defaultProfile;
                                        }}
                                    />
                                </div>

                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                    Global Rank: {user.rank}
                                </p>

                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {user.firstName} {user.lastName}
                                </h1>

                                <p className="text-gray-500 dark:text-gray-400">
                                    @{user.emailId?.split("@")[0]}
                                </p>
                            </div>

                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setOpenEdit(true)}
                            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                        >
                            Edit Profile
                        </button>

                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {openEdit && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                    <div className="bg-white dark:bg-gray-800 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto p-6">

                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h2>

                            <button
                                onClick={() => setOpenEdit(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        <EditProfile user={user} loadUser={loadUser} closeModal={() => setOpenEdit(false)} />

                    </div>

                </div>
            )}
        </>
    );
};

export default ProfileHeader;