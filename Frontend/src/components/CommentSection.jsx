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
          className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 border border-gray-300 dark:border-[#2f2f2f] placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-sm transition-colors"
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-[#2f2f2f] hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
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