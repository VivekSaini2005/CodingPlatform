import { useEffect, useState } from "react";
import { getPostsAPI, createPostAPI } from "../api/discussion.api";
import PostCard from "../components/PostCard";
import { Search, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import discussionHeroBg from "../images/DisscussionHero.webp";

const DiscussPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

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

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;
    if (!user) return;

    try {
      const newPost = {
        title,
        content,
        author: user._id,
        firstName: user.firstName,
        profileImage: user.profileImage,
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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-8 font-sans transition-colors duration-200">
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-center text-center py-16 md:py-20 lg:py-24 px-4 gap-4 mb-10 md:mb-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${discussionHeroBg})` }}
      >
        <div className="absolute inset-0 bg-black/25 dark:bg-black/60" />
        <h1 className="relative z-10 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Discussion Hub
        </h1>
        <p className="relative z-10 mt-5 text-white/90 max-w-xl text-sm md:text-base">
          Ask questions, share knowledge, and collaborate with developers
        </p>
        <div className="relative z-10 w-full max-w-xl mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-lg py-3 pl-11 pr-4 border border-gray-300 dark:border-[#2f2f2f] placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full mb-10 md:mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-yellow-500" />
                  <span>Ask questions and help others</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-yellow-500" />
                  <span>Discuss subjects you're studying</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-yellow-500" />
                  <span>Meet learners around the world</span>
                </div>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-5 py-2.5 rounded-lg bg-[#2f2f2f] hover:bg-[#3a3a3a] text-white text-sm font-medium transition-all duration-200"
              >
                Ask your question
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full">
        {showCreateForm && (
          <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl p-5 mb-8 mt-4 animate-in slide-in-from-top-4 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Create New Discussion</h3>
            <div className="space-y-4">
              <input
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 border border-gray-300 dark:border-[#2f2f2f] placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 border border-gray-300 dark:border-[#2f2f2f] placeholder-gray-500 focus:outline-none focus:border-yellow-500 min-h-[120px] resize-y transition-colors"
                placeholder="Write something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 rounded-md bg-gray-100 text-black dark:bg-[#2f2f2f] dark:text-white hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!title.trim() || !content.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
            ))
          ) : (
            <div className="text-center text-gray-400 py-10 bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2f2f2f] transition-colors">
              No discussions found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussPage;
