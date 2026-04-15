import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-700 dark:text-gray-300"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Coding Platform
            </h2>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide transition-all duration-200 ease-in-out">
              Practice. Compete. Grow.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-200 ease-in-out">
              Master your coding skills through problems, contests, and community
              discussions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-5 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase letter-spacing-1 transition-all duration-200 ease-in-out">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/problems"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Problems
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/discuss"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Discuss
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase letter-spacing-1 transition-all duration-200 ease-in-out">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-200 ease-in-out inline-block"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-5 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase letter-spacing-1 transition-all duration-200 ease-in-out">
              Follow Us
            </h3>
            <div className="flex gap-6 justify-center md:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200 ease-in-out"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200 ease-in-out"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200 ease-in-out"
                aria-label="Twitter"
              >
                <FaXTwitter size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider with subtle glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex justify-center mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 transition-all duration-200 ease-in-out">
            Built with ❤️ for coders
          </p>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-800 transition-all duration-200 ease-in-out"></div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-6">
        <p className="text-center text-sm text-gray-500 dark:text-gray-500 transition-all duration-200 ease-in-out">
          © {currentYear} Coding Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
