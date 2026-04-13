import { useState } from "react";
import { socket } from "../socket/socket";
import { CornerDownRight, Reply, Send, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CommentItem = ({ comment, allComments, postId, authorId, depth = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { user } = useAuth();

  const userId = user ? user._id : null;

  const submitReply = () => {
    if (!replyText.trim() || !userId) return;

    socket.emit("addComment", {
      postId,
      userId,
      text: replyText,
      authorId: comment.user?._id || comment.user || authorId, // Notify the parent comment author!
      parentComment: comment._id,
      firstName: user.firstName,
      profileImage: user.profileImage
    });

    setReplyText("");
    setIsReplying(false);
  };

  // Find all children comments for this specific comment
  const childrenComments = allComments.filter(
    (c) => c.parentComment === comment._id
  );

  const authorName = comment.firstName || comment.user?.username || "Anonymous User";
  const avatarUrl = comment.profileImage || comment.user?.avatar || `https://ui-avatars.com/api/?name=${authorName}&background=475569&color=fff`;

  // Check if current user is the author of this comment
  const commentAuthorId = comment.user?._id?.toString() || comment.user?.toString();
  const isAuthor = userId === commentAuthorId;

  const handleDelete = () => {
    socket.emit("deleteComment", {
      commentId: comment._id,
      postId,
      userId
    });
  };

  // Format comment date
  const commentDate = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : "";

  return (
    <div className={`mt-4 ${depth > 0 ? 'ml-2 pl-4 border-l-2 border-gray-200 dark:border-[#2d3348]' : ''}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          <img src={avatarUrl} alt={authorName} className="w-8 h-8 rounded-full" />
        </div>

        {/* Comment Body */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-200 text-sm">{authorName}</span>
            <span className="text-gray-500 text-xs">{commentDate}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 leading-relaxed">
            {comment.text}
          </p>

          <div className="mt-2 flex items-center gap-4">
            {userId && (
              <button
                className="group flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setIsReplying(!isReplying)}
              >
                <Reply size={14} className="group-hover:rotate-[-10deg] transition-transform" />
                <span>Reply</span>
              </button>
            )}
            {isAuthor && (
              <button
                className="group flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
                onClick={handleDelete}
                title="Delete your comment"
              >
                <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                <span>Delete</span>
              </button>
            )}
          </div>

          {/* Reply Input Box */}
          {isReplying && (
            <div className="flex gap-3 mt-3 items-start animate-in slide-in-from-top-2">
              <div className="text-gray-500 mt-2">
                <CornerDownRight size={16} />
              </div>
              <div className="flex-1 relative">
                <input
                  className="w-full bg-gray-50 dark:bg-[#151822] text-gray-900 dark:text-white rounded-lg py-2 px-3 pr-10 border border-gray-200 dark:border-[#2d3348] focus:border-[#ff6b00] dark:focus:border-[#ff6b00] outline-none text-sm transition-colors"
                  placeholder={`Replying to ${authorName}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitReply();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-[#ff6b00] disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render Nested Children Recursively */}
      {childrenComments.length > 0 && (
        <div className="mt-2">
          {childrenComments.map((child) => (
            <CommentItem
              key={child._id}
              comment={child}
              allComments={allComments}
              postId={postId}
              authorId={authorId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;