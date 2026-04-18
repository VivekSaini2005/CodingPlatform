import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/themeContext";
import { socket } from "../socket/socket";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

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

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
    setOpen(false);
  };

  const desktopNavClass = ({ isActive }) =>
    `px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200 border-b-2 ${
      isActive
        ? "text-black dark:text-white border-yellow-500"
        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-black dark:hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? "text-black dark:text-white border-b-2 border-yellow-500"
        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white text-black backdrop-blur-sm transition-colors duration-200 dark:border-[#2f2f2f] dark:bg-[#1f1f1f] dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-[70px] px-6 lg:px-12">

          {/* LEFT */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -ml-2 rounded-lg text-black transition-all duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2a2a2a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-wide text-gray-900 transition-all duration-200 dark:text-white"
            >
              <Code2 size={22} className="text-yellow-500" />
              <span className="hidden sm:inline">CodeHub</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-5">
              <NavLink
                to="/problems"
                className={desktopNavClass}
              >
                Problems
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={desktopNavClass}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/discuss"
                className={desktopNavClass}
              >
                Discussion
              </NavLink>
            </div>
          </div>

          {/* CENTER SEARCH */}
          <div className="flex justify-center flex-1 px-4">
            {/* Mobile Search Icon */}
            <button
              className="md:hidden p-2 text-black transition-colors duration-200 hover:text-black dark:text-white dark:hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
              title="Open search"
            >
              <Search size={20} />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative w-auto max-w-md lg:max-w-xl">
              <Search size={18} className="absolute left-4 text-gray-500 dark:text-gray-300 pointer-events-none" />
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-2.5 text-sm font-medium text-black placeholder-gray-500 transition-all focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-4 border-l border-gray-200 pl-4 shrink-0 dark:border-[#2f2f2f]" ref={dropdownRef}>
            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 text-black transition-all duration-200 hover:bg-gray-200 dark:bg-[#2f2f2f] dark:text-white dark:hover:bg-[#3a3a3a]"
            >
              {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {!user ? (
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                <Link to="/register" className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white">Register</Link>
                <span className="text-gray-300 dark:text-[#2a2a2a]">|</span>
                <Link to="/login" className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white">Login</Link>
              </div>
            ) : (
              <>
                {/* NOTIFICATION */}
                <div className="relative">
                  <button
                    onClick={handleBellClick}
                    className="relative p-2 rounded-full bg-gray-100 text-black transition-all duration-200 hover:bg-gray-200 dark:bg-[#2f2f2f] dark:text-white dark:hover:bg-[#3a3a3a]"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white text-black animate-fadeIn z-50 dark:border-[#2f2f2f] dark:bg-[#1f1f1f] dark:text-white">
                      <div className="border-b border-gray-200 px-4 py-3 font-semibold dark:border-[#2f2f2f]">
                        Notifications
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No notifications
                      </div>
                        ) : (
                          notifications.map((notif, index) => (
                            <div key={index} className="border-b border-gray-100 px-4 py-3 text-sm text-gray-700 transition-colors last:border-0 hover:bg-gray-100 dark:border-[#2f2f2f] dark:text-gray-300 dark:hover:bg-[#2a2a2a] dark:bg-[#1f1f1f]">
                              Someone <span className="font-semibold text-yellow-500">{notif.type}d</span> your post
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
                    className="flex items-center gap-2 rounded-full p-1 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-[#2f2f2f] dark:hover:bg-[#3a3a3a]"
                  >
                    <img
                      src={profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      className="h-8 w-8 rounded-full border border-gray-300 object-cover dark:border-[#2f2f2f]"
                      alt="Profile"
                    />
                    <ChevronDown size={16} className="hidden md:block text-black dark:text-white" />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 text-black animate-fadeIn z-50 dark:border-[#2f2f2f] dark:bg-[#1f1f1f] dark:text-white">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
                          onClick={() => setOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="my-1 h-px bg-gray-200 dark:bg-[#2a2a2a]"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 flex items-center gap-2 transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 border-b border-gray-200 dark:border-[#2f2f2f]" : "max-h-0"}`}
      >
        <div className="space-y-3 bg-white px-4 py-3 dark:bg-[#1f1f1f] dark:text-white">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black placeholder-gray-500 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-white dark:placeholder-gray-400"
          />

          <div className="flex flex-col gap-1 pt-2">
            <NavLink
              to="/problems"
              className={mobileNavClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Problems
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={mobileNavClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </NavLink>
            <NavLink
              to="/discuss"
              className={mobileNavClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Discuss
            </NavLink>

            {!user && (
              <>
                <div className="my-2 h-px bg-gray-200 dark:bg-[#2a2a2a]"></div>
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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