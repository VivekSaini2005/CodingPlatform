import { useState, useEffect } from "react";
import { deletePostAPI } from "../api/discussion.api";
import CommentSection from "./CommentSection";
import { socket } from "../socket/socket";
import { ThumbsUp, ThumbsDown, MessageSquare, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post, refreshPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [dislikes, setDislikes] = useState(post.dislikes?.length || 0);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);

  const { user } = useAuth();
  const userId = user ? user._id : null;

  const [isLiked, setIsLiked] = useState(post.likes?.some(id => id === userId || id?._id === userId) || false);
  const [isDisliked, setIsDisliked] = useState(post.dislikes?.some(id => id === userId || id?._id === userId) || false);

  console.log(post);
  /*
  LIKE POST
  */
  const handleLike = () => {
    if (!userId) return;
    socket.emit("likePost", {
      postId: post._id,
      userId,
      authorId: post.author._id
    });

    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  /*
  DISLIKE POST
  */
  const handleDislike = () => {
    if (!userId) return;
    socket.emit("dislikePost", {
      postId: post._id,
      userId,
      authorId: post.author._id
    });

    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const handlePostLiked = (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
        if (data.dislikes !== undefined) setDislikes(data.dislikes);
      }
    };

    const handlePostDisliked = (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    };

    const handleNewCommentCount = (comment) => {
      if (comment.postId === post._id) {
        setCommentCount((prev) => prev + 1);
      }
    };

    const handleDeletedCommentCount = ({ postId }) => {
      if (postId === post._id) {
        setCommentCount((prev) => Math.max(0, prev - 1));
      }
    };

    socket.on("postLiked", handlePostLiked);
    socket.on("postDisliked", handlePostDisliked);
    socket.on("newComment", handleNewCommentCount);
    socket.on("commentDeleted", handleDeletedCommentCount);

    return () => {
      socket.off("postLiked", handlePostLiked);
      socket.off("postDisliked", handlePostDisliked);
      socket.off("newComment", handleNewCommentCount);
      socket.off("commentDeleted", handleDeletedCommentCount);
    };
  }, [post._id]);

  /*
  DELETE POST
  */
  const handleDelete = async () => {
    try {
      await deletePostAPI(post._id);
      refreshPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Generate some dummy tags based on the topic if not provided
  // const displayTags = post.tags && post.tags.length > 0
  //   ? post.tags
  //   : ["Dynamic Programming", "Tips", "Tutorial"];

  // Format date if timestamps exist
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "3/5/2026";

  const authorName = post.firstName || post.author?.username || "sarahc";

  // Using a placeholder avatar until user avatars are fully implemented
  const avatarUrl = post.profileImage || post.author?.avatar || `https://ui-avatars.com/api/?name=${authorName}&background=ff6b00&color=fff`;

  return (
    <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl p-6 transition-all hover:border-gray-300 dark:hover:border-gray-500">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-[#2f2f2f]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
              {post.title}
            </h3>

            {userId && post.author && userId === post.author._id && (
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                title="Delete Post"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="mb-4">
            <p className={`text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap ${!isExpanded ? "line-clamp-2" : ""}`}>
              {post.content}
            </p>
            {post.content && post.content.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-green-500 hover:underline text-sm font-medium mt-1 focus:outline-none"
              >
                {isExpanded ? "View less" : "View more"}
              </button>
            )}
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
              <img
                src={avatarUrl}
                alt={authorName}
                className="w-5 h-5 rounded-full"
              />
              <span>{authorName}</span>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${isLiked ? "text-green-500 font-bold" : "hover:text-green-500"}`}
            >
              <ThumbsUp size={16} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 transition-colors ${isDisliked ? "text-red-500 font-bold" : "hover:text-red-500"}`}
            >
              <ThumbsDown size={16} />
              <span>{dislikes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <MessageSquare size={16} />
              <span>{commentCount}</span>
            </button>

            <span className="text-gray-500">{formattedDate}</span>
          </div>

          {/* Tags */}
          {/*<div className="flex flex-wrap gap-2">
            {displayTags.map(tag => (
              <span
                key={tag}
                className="bg-[#2d3348] text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>*/}

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-gray-200 dark:border-[#2f2f2f] p-4">
              <CommentSection postId={post._id} authorId={post.author._id || post.author} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;