import React, { useState } from "react";
import {
    updateProfile,
    uploadProfileImage,
    updateCoverImage
} from "../../api/auth.api";

const EditProfile = ({ user, loadUser, closeModal }) => {

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        age: user?.age || ""
    });

    const [profilePreview, setProfilePreview] = useState(user?.profileImage);
    const [coverPreview, setCoverPreview] = useState(user?.coverImage);

    const [loading, setLoading] = useState(false);
    const [uploadingProfile, setUploadingProfile] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Profile image select & upload
    const handleProfileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfilePreview(URL.createObjectURL(file));

        try {
            setUploadingProfile(true);
            const data = new FormData();
            data.append("image", file);
            await uploadProfileImage(data);
            await loadUser();
        } catch (err) {
            console.error(err);
            alert("Failed to upload profile image");
        } finally {
            setUploadingProfile(false);
        }
    };

    // Cover image select & upload
    const handleCoverSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCoverPreview(URL.createObjectURL(file));

        try {
            setUploadingCover(true);
            const data = new FormData();
            data.append("image", file);
            await updateCoverImage(data);
            await loadUser();
        } catch (err) {
            console.error(err);
            alert("Failed to upload cover image");
        } finally {
            setUploadingCover(false);
        }
    };

    // Update profile info
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateProfile(formData);
            await loadUser();
            if (closeModal) closeModal();
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-gray-900 dark:text-gray-100">
            {/* Cover Image */}
            <div className="relative mb-12 group rounded-xl overflow-visible">
                <div className="h-40 w-full rounded-xl overflow-hidden relative">
                    <img
                        src={coverPreview}
                        alt="cover"
                        className="w-full h-full object-cover bg-gray-200 dark:bg-gray-700 transition-opacity duration-300 group-hover:opacity-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                        <label className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            {uploadingCover ? "Uploading..." : "Change Cover"}
                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverSelect} disabled={uploadingCover} />
                        </label>
                    </div>
                </div>

                {/* Profile Image Avatar positioned over the cover */}
                <div className="absolute -bottom-8 left-6 group/avatar">
                    <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-md relative">
                        <img
                            src={profilePreview}
                            alt="profile"
                            className="h-full w-full rounded-xl object-cover transition-opacity duration-300 group-hover/avatar:opacity-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 bg-black/40 rounded-xl m-1 cursor-pointer">
                            <label className="cursor-pointer text-white text-xs font-semibold p-2 align-middle text-center h-full w-full flex items-center justify-center rounded-xl">
                                {uploadingProfile ? "..." : "Edit"}
                                <input type="file" className="hidden" accept="image/*" onChange={handleProfileSelect} disabled={uploadingProfile} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5 px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Age */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-5 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-70 transition-colors shadow-lg shadow-purple-500/30"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;