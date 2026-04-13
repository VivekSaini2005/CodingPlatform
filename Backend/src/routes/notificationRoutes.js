const express = require("express");
const router = express.Router();

const {
    getNotifications,
    markNotificationsRead,
    getUnreadCount
} = require("../controllers/notificationController");

const userMiddleware = require("../middleware/userMiddleware");

router.get("/", userMiddleware, getNotifications);

router.get("/unread-count", userMiddleware, getUnreadCount);

router.put("/read", userMiddleware, markNotificationsRead);

module.exports = router;