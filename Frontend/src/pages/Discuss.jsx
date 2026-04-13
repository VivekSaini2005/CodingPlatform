import { useEffect, useState } from "react";
import { getPostsAPI, createPostAPI } from "../api/discussion.api";
import PostCard from "../components/PostCard";
import { Search, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DiscussPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  /*
  FETCH POSTS
  */
  const fetchPosts = async () => {
    try {
      const res = await getPostsAPI();
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /*
  CREATE POST
  */
  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;
    if (!user) return; // Must be logged in

    try {
      const newPost = {
        title,
        content,
        author: user._id,
        firstName: user.firstName,
        profileImage: user.profileImage
      };

      await createPostAPI(newPost);
      setTitle("");
      setContent("");
      setShowCreateForm(false);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f111a] text-gray-900 dark:text-white p-8 font-sans transition-colors duration-200">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discussions</h1>
            <p className="text-gray-600 dark:text-gray-400">Share knowledge and learn from the community</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-colors"
          >
            <Plus size={20} />
            New Discussion
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-white dark:bg-[#1e2332] text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-[#2d3348] transition-colors"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Create Post Form (Inline Modal alternative) */}
        {showCreateForm && (
          <div className="bg-white dark:bg-[#1e2332] border border-gray-200 dark:border-[#2d3348] rounded-xl p-6 mb-8 mt-4 animate-in slide-in-from-top-4 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Create New Discussion</h3>
            <div className="space-y-4">
              <input
                className="w-full bg-gray-50 dark:bg-[#151822] text-gray-900 dark:text-white rounded-lg py-2 px-4 border border-gray-200 dark:border-[#2d3348] focus:border-[#ff6b00] dark:focus:border-[#ff6b00] outline-none transition-colors"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-gray-50 dark:bg-[#151822] text-gray-900 dark:text-white rounded-lg py-2 px-4 border border-gray-200 dark:border-[#2d3348] focus:border-[#ff6b00] dark:focus:border-[#ff6b00] outline-none min-h-[120px] resize-y transition-colors"
                placeholder="Write something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#2d3348] text-gray-600 dark:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!title.trim() || !content.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* POSTS LIST */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                refreshPosts={fetchPosts}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-[#1e2332] rounded-xl border border-gray-200 dark:border-[#2d3348] transition-colors">
              No discussions found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DiscussPage;