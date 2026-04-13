const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/user');

const PostSchema = new Schema({

  title: String,

  content: String, // markdown

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  profileImage: {
    type: String
  },

  firstName: {
    type: String
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],

  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],

  commentCount: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const Post = mongoose.model('post', PostSchema);

module.exports = Post;