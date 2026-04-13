const express = require("express");
const {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  addComment,
  getComments
} = require("../controllers/discussionController.js");
const userMiddleware = require("../middleware/userMiddleware");

const router = express.Router();

/*
    DISCUSSION ROUTES
*/

router.post("/create", userMiddleware, createPost);

router.get("/", getPosts);

router.get("/:postId", getSinglePost);

router.delete("/:postId", userMiddleware, deletePost);

router.post("/:postId/comment", userMiddleware, addComment);

router.get("/:postId/comments", getComments);

module.exports = router;