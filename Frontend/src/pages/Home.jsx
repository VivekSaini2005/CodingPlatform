import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Trophy, Users } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-(--page-bg) [--page-bg:#f9fafb] dark:[--page-bg:#020617] text-gray-900 dark:text-white">
            {/* Hero Section */}
            <div
                className="relative min-h-screen flex items-start pt-24 md:pt-28 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/homepage.jpg')" }}
            >
                {/* <div className="absolute inset-0 bg-black/60" aria-hidden="true" /> */}
                {/* <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" aria-hidden="true" /> */}
                    {/* <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" aria-hidden="true" /> */}
                <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
                {/* <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" /> */}

                <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" aria-hidden="true" />

                <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-b from-transparent to-(--page-bg)" aria-hidden="true" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full flex items-start justify-start">
                    <div className="max-w-2xl text-left">
                        <div
                            className="flex flex-col gap-6 text-left"
                            style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.5)" }}
                        >
                            <p className="inline-flex w-fit items-center rounded-full border border-blue-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-sm">
                                Built for focused practice and competitive growth
                            </p>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
                                Master Data Structures &amp; Algorithms
                            </h1>
                            <p className="mt-6 text-lg text-gray-300">
                                Practice, compete, and improve with real coding challenges
                            </p>

                            <div className="mt-8 w-fit rounded-lg p-2 backdrop-blur-sm">
                                <div className="flex gap-4">
                                    <Link
                                        to="/problems"
                                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 text-white"
                                    >
                                        Start Solving
                                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                                    </Link>
                                    <Link
                                        to="/problems"
                                        className="inline-flex items-center justify-center border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-white/10"
                                    >
                                        Explore Problems
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="absolute -bottom-7.5 md:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-20 top-[95%] md:top-[95%] ">
                    <div className="relative p-px rounded-2xl">
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500 blur-md opacity-40 hover:opacity-70 transition" />
                        <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
                            <div className="grid grid-cols-2 divide-y divide-gray-200 dark:divide-gray-700 md:grid-cols-4 md:divide-y-0 md:divide-x divide-x-0">
                            <div className="flex flex-col items-center justify-center py-4 transition-colors duration-200 hover:scale-105 hover:text-blue-400">
                                <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-400">500+</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Problems</p>
                            </div>
                            <div className="flex flex-col items-center justify-center py-4 transition-colors duration-200 hover:scale-105 hover:text-blue-400">
                                <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-400">25K+</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Users</p>
                            </div>
                            <div className="flex flex-col items-center justify-center py-4 transition-colors duration-200 hover:scale-105 hover:text-blue-400">
                                <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-400">1M+</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Submissions</p>
                            </div>
                            <div className="flex flex-col items-center justify-center py-4 transition-colors duration-200 hover:scale-105 hover:text-blue-400">
                                <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-400">92%</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


            {/* Feature Section */}
            <div className="px-6 py-16 lg:px-16 mt-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                            <Code className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">Practice Problems</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Solve curated coding challenges across core DSA topics and build consistency with every submission.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                            <Trophy className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">Compete & Leaderboard</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Track your progress, compete in contests, and measure your performance against other developers.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                            <Users className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">Discussion & Community</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Ask questions, share approaches, and learn faster through an active peer-driven environment.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 pb-16 lg:px-16">
                <div className="mx-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-10 text-center text-white lg:mx-16">
                    <h2 className="text-3xl font-bold sm:text-4xl">Start your coding journey today</h2>
                    <div className="mt-6">
                        <Link
                            to="/problems"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
