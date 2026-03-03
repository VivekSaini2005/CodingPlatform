import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <nav className="bg-[#24292f] text-gray-200 px-6 py-2 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition-colors">
          &lt;/&gt; CodeHub
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/problems" className="hover:text-white cursor-pointer transition-colors">Problems</Link>
          <Link to="/contests" className="hover:text-white cursor-pointer transition-colors">Contests</Link>
          <Link to="/leaderboard" className="hover:text-white cursor-pointer transition-colors">Leaderboard</Link>
          <Link to="/discuss" className="hover:text-white cursor-pointer transition-colors">Discuss</Link>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full bg-[#1f2428] border border-gray-600 rounded-md px-3 py-2 text-base focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-200"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {!user ? (
          <div className="text-lg font-medium flex items-center gap-4">
            <Link to="/register" className="hover:text-white cursor-pointer transition-colors">Register</Link>
            <span className="text-gray-500">or</span>
            <Link to="/login" className="hover:text-white cursor-pointer transition-colors">Log in</Link>
          </div>
        ) : (
          <>
            {/* Notification */}
            <Bell className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />

            {/* Profile */}
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <ChevronDown size={16} />
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2d333b] rounded-md shadow-lg text-base z-50 border border-gray-700">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-[#373e47] cursor-pointer transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-[#373e47] cursor-pointer transition-colors"
                  >
                    Dashboard
                  </Link>
                  {user.role=='admin' && <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-[#373e47] cursor-pointer transition-colors"
                  >
                    Admin Panel
                  </Link>}
                  <div className="border-t border-gray-600 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#373e47] cursor-pointer text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
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
    </nav>
  );
};

export default Navbar;
