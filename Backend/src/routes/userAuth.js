const express = require('express');
const userAuth = express.Router();
const { register, login, logout, adminRegister, deleteProfile, getProfile } = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware")

// Register
userAuth.post("/register", register);
userAuth.post("/login", login);
userAuth.post("/logout", userMiddleware, logout);
userAuth.post("/admin/register", adminMiddleware, adminRegister);
userAuth.post("/deleteProfile", userMiddleware, deleteProfile);
userAuth.get("/getProfile", userMiddleware, getProfile);

module.exports = userAuth;
