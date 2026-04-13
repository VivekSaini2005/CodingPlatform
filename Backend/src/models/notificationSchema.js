const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  type: {
    type: String,
    enum: ["like", "comment", "reply"]
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;