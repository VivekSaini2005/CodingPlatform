const Notification = require("../models/notificationSchema");

const createNotification = async ({ receiver, sender, type, post }) => {

    try {

        if (receiver.toString() === sender.toString()) return;

        await Notification.create({
            receiver,
            sender,
            type,
            post
        });

    } catch (error) {
        console.log("Notification Error:", error);
    }
};

module.exports = { createNotification };