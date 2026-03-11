const express = require('express');
const userAuth = express.Router();
const { register, login, logout, adminRegister, deleteProfile, getProfile, googleAuth } = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/multer.middleware");
const { uploadProfileImage, updateCoverImage, updateProfile } = require("../controllers/user.controller");
const { getLeaderboard } = require("../controllers/leaderboard")
// import { upload } from "../middleware/multer.middleware.js";
// import { uploadProfileImage } from "../controllers/user.controller.js";

// Register
userAuth.post("/register", register);
userAuth.post("/login", login);
userAuth.post("/google", googleAuth);
userAuth.post("/logout", userMiddleware, logout);
userAuth.post("/admin/register", adminMiddleware, adminRegister);
userAuth.post("/deleteProfile", userMiddleware, deleteProfile);
userAuth.get("/getProfile", userMiddleware, getProfile);
userAuth.post("/updateProfile", userMiddleware, updateProfile);
userAuth.post("/uploadProfile", userMiddleware, upload.single("image"), uploadProfileImage)
userAuth.post("/uploadCoverImage", userMiddleware, upload.single("image"), updateCoverImage)
userAuth.get("/leaderboard", getLeaderboard)

module.exports = userAuth;
