import { useEffect, useState } from "react";
import {
  getCommentsAPI,
  addCommentAPI
} from "../api/discussion.api";
import CommentItem from "./CommentItem";
import { socket } from "../socket/socket";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId, authorId }) => {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const userId = user ? user._id : null;

  /*
  FETCH COMMENTS
  */

  const fetchComments = async () => {
    try {
      const res = await getCommentsAPI(postId);
      // Group comments based on parentComment
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  useEffect(() => {
    const handleNewComment = (comment) => {
      if (comment.postId === postId) {
        setComments((prev) => [comment, ...prev]);
      }
    };

    const handleCommentDeleted = ({ commentId, postId: eventPostId }) => {
      if (eventPostId === postId) {
        setComments((prev) => prev.filter(c => c._id !== commentId));
      }
    };

    socket.on("newComment", handleNewComment);
    socket.on("commentDeleted", handleCommentDeleted);

    return () => {
      socket.off("newComment", handleNewComment);
      socket.off("commentDeleted", handleCommentDeleted);
    };
  }, [postId]);

  /*
  ADD COMMENT
  */

  const handleAddComment = async () => {
    if (!text.trim() || !userId) return;

    // Use socket if you want real-time emit
    socket.emit("addComment", {
      postId,
      userId,
      text,
      authorId,
      firstName: user.firstName,
      profileImage: user.profileImage
    });

    setText("");
    // we do not need to fetchComments since socket handles real time
  };

  // Find root comments (ones without parentComment)
  const rootComments = comments.filter(c => !c.parentComment);

  return (

    <div className="mt-2 w-full">

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 bg-gray-50 dark:bg-[#151822] text-gray-900 dark:text-white rounded-lg py-2 px-3 border border-gray-200 dark:border-[#2d3348] focus:border-[#ff6b00] dark:focus:border-[#ff6b00] outline-none text-sm transition-colors"
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          onClick={handleAddComment}
          disabled={!userId || !text.trim()}
        >
          Comment
        </button>
      </div>

      <div>

        {rootComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            allComments={comments}
            postId={postId}
            authorId={authorId}
          />
        ))}

      </div>

    </div>

  );

};

export default CommentSection;