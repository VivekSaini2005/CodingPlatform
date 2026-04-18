import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-gray-200 bg-white text-gray-700 transition-colors duration-200 dark:border-[#2f2f2f] dark:bg-[#262626] dark:text-gray-300"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-xl border border-gray-200 bg-gray-100 p-6 dark:border-[#2f2f2f] dark:bg-[#262626]">
            <div className="flex flex-col gap-5 text-center sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">
                  Coding Platform
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  Build skill, speed, and confidence in one place.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Solve curated problems, climb leaderboards, join discussions,
                  and track your progress with a workspace designed for focused
                  practice.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left dark:border-[#2f2f2f] dark:bg-[#2a2a2a]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-gray-500">
                    Problems
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Practice by topic
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left dark:border-[#2f2f2f] dark:bg-[#2a2a2a]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500">
                    Community
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Discuss, compare, improve
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left dark:border-[#2f2f2f] dark:bg-[#2a2a2a]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500">
                    Progress
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Learn with momentum
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-6 dark:border-[#2f2f2f] dark:bg-[#262626]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 dark:text-gray-200">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/problems"
                    className="block text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  >
                    Browse problem sets
                  </a>
                </li>
                <li>
                  <a
                    href="/leaderboard"
                    className="block text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  >
                    See rankings
                  </a>
                </li>
                <li>
                  <a
                    href="/discuss"
                    className="block text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  >
                    Read community insights
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  >
                    Manage your profile
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-6 dark:border-[#2f2f2f] dark:bg-[#262626]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 dark:text-gray-200">
                Connect
              </h3>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                Stay close to updates, releases, and community activity.
              </p>
              <div className="flex gap-5 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 dark:text-gray-200"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-[#2f2f2f]">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Built for coders who want a fast, clear practice loop.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Coding Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
