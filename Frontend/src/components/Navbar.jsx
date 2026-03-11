import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/themeContext";
import { socket } from "../socket/socket";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const profileImage = user?.profileImage;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const dropdownRef = useRef();

  // ---------------- SOCKET ----------------
  useEffect(() => {

    const handleNotification = (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("notification", handleNotification);

    return () => socket.off("notification", handleNotification);

  }, []);

  useEffect(() => {
    if (user?._id) socket.emit("joinUser", user._id);
  }, [user]);

  // -------- CLICK OUTSIDE DROPDOWN --------
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // -------- SEARCH --------
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/problems?search=${encodeURIComponent(search)}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#24292f] border-b border-gray-200 dark:border-gray-800 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold hover:opacity-80 transition text-gray-900 dark:text-white"
            >
              &lt;/&gt; CodeHub
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 text-sm font-medium ml-6 text-gray-600 dark:text-gray-300">
              <Link to="/problems" className="hover:text-blue-500 transition">
                Problems
              </Link>
              <Link to="/leaderboard" className="hover:text-blue-500 transition">
                Leaderboard
              </Link>
              <Link to="/discuss" className="hover:text-blue-500 transition">
                Discuss
              </Link>
            </div>
          </div>

          {/* SEARCH (Desktop) */}
          <div className="hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-gray-100 dark:bg-[#1f2428] border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300"
            >
              {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>

            {!user ? (
              <div className="hidden md:flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Link to="/register" className="hover:text-blue-500 transition">Register</Link>
                <span className="text-gray-400">|</span>
                <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
              </div>
            ) : (
              <>
                {/* NOTIFICATION */}
                <div className="relative">
                  <button
                    onClick={handleBellClick}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition relative text-gray-600 dark:text-gray-300"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#2d333b] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn z-50">
                      <div className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                        Notifications
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notif, index) => (
                            <div key={index} className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-[#373e47] border-b border-gray-100 dark:border-gray-700/50 last:border-0 transition-colors text-gray-700 dark:text-gray-300">
                              Someone <span className="font-semibold text-blue-500">{notif.type}d</span> your post
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* PROFILE */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-lg transition"
                  >
                    <img
                      src={profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 object-cover"
                      alt="Profile"
                    />
                    <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2d333b] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn z-50 py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#373e47] transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#373e47] transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#373e47] transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 border-b border-gray-200 dark:border-gray-800 shadow-md" : "max-h-0"}`}
      >
        <div className="px-4 py-3 space-y-3 bg-white dark:bg-[#24292f]">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-100 dark:bg-[#1f2428] border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col gap-1 pt-2">
            <Link
              to="/problems"
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Problems
            </Link>
            <Link
              to="/leaderboard"
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/discuss"
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discuss
            </Link>

            {!user && (
              <>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;