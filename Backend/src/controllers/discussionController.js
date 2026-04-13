const Post = require("../models/postSchema.js");
const Comment = require("../models/commentSchema.js");

/*
CREATE POST
*/

const createPost = async (req, res) => {
  try {

    const { title, content, firstName, profileImage } = req.body;

    // Auth middleware attaches user object to req.result
    const author = req.result ? req.result._id : req.body.author;

    if (!author) {
      return res.status(401).json({ message: "Author ID is required" });
    }

    const post = await Post.create({
      title,
      content,
      profileImage,
      firstName,
      author
    });

    res.status(201).json({
      success: true,
      post
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*
GET ALL POSTS
*/

const getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/*
GET SINGLE POST
*/

const getSinglePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.postId)
      .populate("author", "username avatar");

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/*
DELETE POST
*/

const deletePost = async (req, res) => {

  try {

    await Post.findByIdAndDelete(req.params.postId);
    // Also delete for comment schema to do...
    res.json({
      success: true,
      message: "Post deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/*
ADD COMMENT
*/

const addComment = async (req, res) => {

  try {

    const { text, parentComment, firstName, profileImage } = req.body;

    // Auth middleware attaches user object to req.result
    const userId = req.result ? req.result._id : req.body.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    const commentData = {
      postId: req.params.postId,
      user: userId,
      firstName,
      profileImage,
      text
    };

    if (parentComment) {
      commentData.parentComment = parentComment;
    }

    const comment = await Comment.create(commentData);

    await Post.findByIdAndUpdate(
      req.params.postId,
      { $inc: { commentCount: 1 } }
    );

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/*
GET COMMENTS
*/

const getComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      postId: req.params.postId
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  addComment,
  getComments
};