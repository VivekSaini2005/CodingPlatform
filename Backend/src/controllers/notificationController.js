const Notification = require("../models/notificationSchema");

const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({
            receiver: req.result._id
        })
            .populate("sender", "username profileImage")
            .sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {
        res.status(500).send(error);
    }
};


const markNotificationsRead = async (req, res) => {

    try {

        await Notification.updateMany(
            { receiver: req.result._id, isRead: false },
            { $set: { isRead: true } }
        );

        res.send("Notifications marked as read");

    } catch (error) {
        res.status(500).send(error);
    }
};


const getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({
            receiver: req.result._id,
            isRead: false
        });

        res.json({ count });

    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    getNotifications,
    markNotificationsRead,
    getUnreadCount
};