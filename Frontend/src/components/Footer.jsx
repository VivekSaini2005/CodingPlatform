import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-gray-200/70 bg-linear-to-b from-slate-50 via-white to-slate-100 text-gray-700 shadow-[0_-1px_0_rgba(15,23,42,0.04)] dark:border-gray-800 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-gray-300"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        backgroundSize: "38px 38px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur dark:border-gray-800 dark:bg-[#111827]">
            <div className="flex flex-col gap-5 text-center sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                  Coding Platform
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                  Build skill, speed, and confidence in one place.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Solve curated problems, climb leaderboards, join discussions,
                  and track your progress with a workspace designed for focused
                  practice.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left dark:border-gray-800 dark:bg-[#111827]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-gray-500">
                    Problems
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Practice by topic
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left dark:border-gray-800 dark:bg-[#111827]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-gray-500">
                    Community
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Discuss, compare, improve
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left dark:border-gray-800 dark:bg-[#111827]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-gray-500">
                    Progress
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Learn with momentum
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur dark:border-gray-800 dark:bg-[#111827]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 dark:text-white">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/problems"
                    className="block text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Browse problem sets
                  </a>
                </li>
                <li>
                  <a
                    href="/leaderboard"
                    className="block text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    See rankings
                  </a>
                </li>
                <li>
                  <a
                    href="/discuss"
                    className="block text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Read community insights
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Manage your profile
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur dark:border-gray-800 dark:bg-[#111827]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 dark:text-white">
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
                  className="text-gray-600 transition-transform duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="GitHub"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-transform duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-transform duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-gray-200/80 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
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
