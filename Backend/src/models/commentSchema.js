const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/user');

const CommentSchema = new Schema({

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  firstName: String,

  profileImage: String,

  text: String,

  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: null
  }

}, { timestamps: true });

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;