const Post = require("../models/postSchema.js");
const Comment = require("../models/commentSchema.js");
const Notification = require("../models/notificationSchema.js");

const socketHandler = (io) => {

  io.on("connection", (socket) => {

    // console.log("User Connected:", socket.id);


    /*
    JOIN USER ROOM
    */

    socket.on("joinUser", (userId) => {
      socket.join(userId);
    });


    /*
    LIKE POST
    */

    socket.on("likePost", async ({ postId, userId, authorId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post || !userId) return;

        const userIdStr = userId.toString();
        const alreadyLiked = post.likes.some((id) => id.toString() === userIdStr);

        if (!alreadyLiked) {
          post.likes.push(userId);
          post.dislikes = post.dislikes.filter(
            (id) => id.toString() !== userIdStr
          );
        } else {
          // User is un-liking
          post.likes = post.likes.filter(
            (id) => id.toString() !== userIdStr
          );
        }

        await post.save();

        io.emit("postLiked", {
          postId,
          likes: post.likes.length,
          dislikes: post.dislikes.length
        });


      /*
      CREATE NOTIFICATION
      */

        if (authorId && authorId !== userId) {
          await Notification.create({
            receiver: authorId,
            sender: userId,
            type: "like",
            post: postId
          });

          io.to(authorId).emit("notification", {
            type: "like",
            sender: userId,
            postId
          });
        }
      } catch (error) {
        console.error("Socket likePost error:", error.message);
      }
    });


    /*
    DISLIKE POST
    */

    socket.on("dislikePost", async ({ postId, userId, authorId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post || !userId) return;

        const userIdStr = userId.toString();
        const alreadyDisliked = post.dislikes.some((id) => id.toString() === userIdStr);

        if (!alreadyDisliked) {
          post.dislikes.push(userId);
          post.likes = post.likes.filter(
            (id) => id.toString() !== userIdStr
          );
        } else {
          // User is un-disliking
          post.dislikes = post.dislikes.filter(
            (id) => id.toString() !== userIdStr
          );
        }

        await post.save();

        io.emit("postDisliked", {
          postId,
          likes: post.likes.length,
          dislikes: post.dislikes.length
        });
      } catch (error) {
        console.error("Socket dislikePost error:", error.message);
      }

    });


    /*
    ADD COMMENT
    */

    socket.on("addComment", async (data) => {

      const { postId, userId, text, authorId, parentComment, firstName, profileImage } = data;

      const commentData = {
        postId,
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
        postId,
        { $inc: { commentCount: 1 } }
      );

      io.emit("newComment", comment);


      /*
      SEND NOTIFICATION
      */

      if (authorId && authorId !== userId) {

        await Notification.create({
          receiver: authorId,
          sender: userId,
          type: "comment",
          post: postId
        });

        io.to(authorId).emit("notification", {
          type: "comment",
          sender: userId,
          postId
        });

      }

    });


    /*
    DELETE COMMENT
    */

    socket.on("deleteComment", async ({ commentId, postId, userId }) => {

      try {
        const comment = await Comment.findById(commentId);
        if (!comment) return;

        // Verify the user requesting deletion is the author
        const authorIdStr = comment.user?._id?.toString() || comment.user?.toString();

        if (authorIdStr === userId) {

          await Comment.findByIdAndDelete(commentId);

          await Post.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: -1 } }
          );

          // Broadcast to all clients so the comment vanishes instantly
          io.emit("commentDeleted", { commentId, postId });

        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }

    });


    /*
    DISCONNECT
    */

    socket.on("disconnect", () => {
      // console.log("User Disconnected");
    });

  });

};

module.exports = { socketHandler };