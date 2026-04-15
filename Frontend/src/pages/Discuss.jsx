import { useEffect, useState } from "react";
import { getPostsAPI, createPostAPI } from "../api/discussion.api";
import PostCard from "../components/PostCard";
import { Search, CheckCircle2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import discussionHeroBg from "../images/DisscussionHero.webp";

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
      {/* Hero Section */}
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-center text-center py-16 md:py-20 lg:py-24 px-4 gap-4 mb-10 md:mb-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${discussionHeroBg})` }}
      >
        {/* <div className="absolute inset-0 bg-black/40 dark:bg-black/55" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/45" />
        <h1 className="relative z-10 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Discussion Hub
        </h1>
        <p className="relative z-10 mt-3 text-gray-100/95 dark:text-gray-200/90 max-w-xl text-sm md:text-base">
          Ask questions, share knowledge, and collaborate with developers
        </p>
        <div className="relative z-10 w-full max-w-xl mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-white/95 dark:bg-gray-900/85 text-gray-900 dark:text-white rounded-lg py-3 pl-11 pr-4 border border-gray-200/80 dark:border-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-400/70 dark:focus:ring-blue-500/60 shadow-lg backdrop-blur-sm"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full mb-10 md:mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/95 dark:bg-[#131722] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 md:px-6 md:py-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                  <span>Ask questions and help others</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                  <span>Discuss subjects you're studying</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                  <span>Meet learners around the world</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-md"
                >
                  Ask your question
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full">

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