const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const fs = require("fs");

const updateProfile = async (req, res) => {

    try {

        // Check authentication
        if (!req.result || !req.result._id) {
            return res.status(401).json({
                message: "Unauthorized. Please login first."
            });
        }

        const userId = req.result._id;

        // Allowed fields to update
        const allowedUpdates = [
            "firstName",
            "lastName",
            "age"
        ];

        const updates = {};

        // Only update allowed fields
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });

    }

};

const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const filePath = req.file.path;
        // console.log(filePath);
        // console.log(req);

        if (!req.result || !req.result._id) {
            // Delete local file since bad request
            fs.unlinkSync(filePath);
            return res.status(401).json({ message: "Unauthorized. Please login first." });
        }

        // Upload image to cloudinary
        // console.log(req.result._id);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "profile_images"
        });
        // console.log(result);

        // Delete local file after upload
        fs.unlinkSync(filePath);

        // Save image URL to database - update existing user
        const user = await User.findByIdAndUpdate(
            req.result._id,
            { profileImage: result.secure_url },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Image uploaded successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });

    }

};

const updateCoverImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const filePath = req.file.path;

        if (!req.result || !req.result._id) {
            fs.unlinkSync(filePath);
            return res.status(401).json({ message: "Unauthorized. Please login first." });
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: "cover_images"
        });

        fs.unlinkSync(filePath);

        const user = await User.findByIdAndUpdate(
            req.result._id,
            { coverImage: result.secure_url },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Cover image updated successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });

    }

};

module.exports = {
    uploadProfileImage,
    updateCoverImage,
    updateProfile
};