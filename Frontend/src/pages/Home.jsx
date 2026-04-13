import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Check, Code, MessageSquare, Trophy, Users } from 'lucide-react';
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import problemsImage from '../images/Problems.png';
import leaderboardImage from '../images/Leaderboard.png';
import discussionImage from '../images/Discussion.png';
import aiHelpImage from '../images/AIHelp.png';

const Home = () => {
    const [activeLang, setActiveLang] = useState("cpp");
    const languageTabs = ["cpp", "java", "python", "javascript"];
    const typingSteps = {
    cpp: [
        { type: "type", text: "class LRUCache {\n" },
        { type: "type", text: "    list<pair<int,int>> cache;\n" },
        { type: "type", text: "    unordered_map<int, list<pair<int,int>>::iterator> mp;\n" },
        { type: "type", text: "    int capacity;\n\n" },

        { type: "type", text: "public:\n" },
        { type: "type", text: "    LRUCache(int cap) {\n" },
        { type: "type", text: "        capacity = cap;\n" },
        { type: "type", text: "    }\n\n" },

        // mistake
        { type: "type", text: "    int get(int key) {\n" },
        { type: "type", text: "        if(mp.find(key) == mp.end()) return -1;\n" },
        { type: "type", text: "        auto node = mp[key];\n" },
        { type: "delete", count: 6 },
        { type: "type", text: "        auto it = mp[key];\n" },

        { type: "type", text: "        cache.splice(cache.begin(), cache, it);\n" },
        { type: "type", text: "        return it->second;\n" },
        { type: "type", text: "    }\n\n" },

        { type: "type", text: "    void put(int key, int value) {\n" },
        { type: "type", text: "        if(mp.count(key)) {\n" },
        { type: "type", text: "            cache.erase(mp[key]);\n" },
        { type: "type", text: "        }\n" },

        { type: "type", text: "        else if(cache.size() == capacity) {\n" },
        { type: "type", text: "            int last = cache.back().first;\n" },
        { type: "type", text: "            cache.pop_back();\n" },
        { type: "type", text: "            mp.erase(last);\n" },
        { type: "type", text: "        }\n" },

        { type: "type", text: "        cache.push_front({key, value});\n" },
        { type: "type", text: "        mp[key] = cache.begin();\n" },
        { type: "type", text: "    }\n" },
        { type: "type", text: "};\n" }
    ],

    java: [
        { type: "type", text: "class LRUCache {\n" },
        { type: "type", text: "    private LinkedHashMap<Integer, Integer> map;\n" },
        { type: "type", text: "    private int capacity;\n\n" },

        { type: "type", text: "    public LRUCache(int capacity) {\n" },
        { type: "type", text: "        this.capacity = capacity;\n" },

        // mistake
        { type: "type", text: "        map = new LinkedHashMap<>();\n" },
        { type: "delete", count: 4 },
        { type: "type", text: "        map = new LinkedHashMap<>(capacity, 0.75f, true);\n" },

        { type: "type", text: "    }\n\n" },

        { type: "type", text: "    public int get(int key) {\n" },
        { type: "type", text: "        return map.getOrDefault(key, -1);\n" },
        { type: "type", text: "    }\n\n" },

        { type: "type", text: "    public void put(int key, int value) {\n" },
        { type: "type", text: "        map.put(key, value);\n" },
        { type: "type", text: "        if(map.size() > capacity) {\n" },
        { type: "type", text: "            int firstKey = map.keySet().iterator().next();\n" },
        { type: "type", text: "            map.remove(firstKey);\n" },
        { type: "type", text: "        }\n" },
        { type: "type", text: "    }\n" },
        { type: "type", text: "}\n" }
    ],

    python: [
        { type: "type", text: "class LRUCache:\n" },
        { type: "type", text: "    def __init__(self, capacity):\n" },
        { type: "type", text: "        self.cache = {}\n" },
        { type: "type", text: "        self.capacity = capacity\n" },
        { type: "type", text: "        self.order = []\n\n" },

        { type: "type", text: "    def get(self, key):\n" },
        { type: "type", text: "        if key not in self.cache:\n" },
        { type: "type", text: "            return -1\n" },

        // mistake
        { type: "type", text: "        self.order.remove(key)\n" },
        { type: "delete", count: 5 },
        { type: "type", text: "        if key in self.order:\n" },
        { type: "type", text: "            self.order.remove(key)\n" },

        { type: "type", text: "        self.order.insert(0, key)\n" },
        { type: "type", text: "        return self.cache[key]\n\n" },

        { type: "type", text: "    def put(self, key, value):\n" },
        { type: "type", text: "        if key in self.cache:\n" },
        { type: "type", text: "            self.order.remove(key)\n" },

        { type: "type", text: "        elif len(self.cache) == self.capacity:\n" },
        { type: "type", text: "            lru = self.order.pop()\n" },
        { type: "type", text: "            del self.cache[lru]\n" },

        { type: "type", text: "        self.cache[key] = value\n" },
        { type: "type", text: "        self.order.insert(0, key)\n" }
    ],

    javascript: [
        { type: "type", text: "class LRUCache {\n" },
        { type: "type", text: "  constructor(capacity) {\n" },
        { type: "type", text: "    this.capacity = capacity;\n" },
        { type: "type", text: "    this.map = new Map();\n" },
        { type: "type", text: "  }\n\n" },

        { type: "type", text: "  get(key) {\n" },
        { type: "type", text: "    if (!this.map.has(key)) return -1;\n" },

        // mistake
        { type: "type", text: "    let value = this.map[key];\n" },
        { type: "delete", count: 6 },
        { type: "type", text: "    let value = this.map.get(key);\n" },

        { type: "type", text: "    this.map.delete(key);\n" },
        { type: "type", text: "    this.map.set(key, value);\n" },
        { type: "type", text: "    return value;\n" },
        { type: "type", text: "  }\n\n" },

        { type: "type", text: "  put(key, value) {\n" },
        { type: "type", text: "    if (this.map.has(key)) this.map.delete(key);\n" },
        { type: "type", text: "    this.map.set(key, value);\n" },

        { type: "type", text: "    if (this.map.size > this.capacity) {\n" },
        { type: "type", text: "      const firstKey = this.map.keys().next().value;\n" },
        { type: "type", text: "      this.map.delete(firstKey);\n" },
        { type: "type", text: "    }\n" },
        { type: "type", text: "  }\n" },
        { type: "type", text: "}\n" }
    ]
    };
    const [code, setCode] = useState("");
    const [stepIndex, setStepIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const langMap = {
        cpp: "cpp",
        java: "java",
        python: "python",
        javascript: "javascript"
    };
    const lines = code.split("\n");
    const highlightedCode = Prism.highlight(
        code,
        Prism.languages[langMap[activeLang]] || Prism.languages.javascript,
        langMap[activeLang] || "javascript"
    );

    useEffect(() => {
        const steps = typingSteps[activeLang];
        if (!steps || !steps.length) return;
        if (stepIndex >= steps.length) {
            setTimeout(() => {
                setStepIndex(0);
                setCharIndex(0);
                setCode(""); // optional (remove if you want freeze)
            }, 2000);
            return;
        }

        const step = steps[stepIndex];
        if (!step) return;

        let timeout;

        if (step.type === "type") {
            if (charIndex < step.text.length) {
                timeout = setTimeout(() => {
                    setCode(prev => prev + step.text[charIndex]);
                    setCharIndex(charIndex + 1);
                }, 45);
            } else {
                timeout = setTimeout(() => {
                    setStepIndex(stepIndex + 1);
                    setCharIndex(0);
                }, 300);
            }
        }

        else if (step.type === "delete") {
            if (charIndex < step.count) {
                timeout = setTimeout(() => {
                    setCode(prev => prev.slice(0, -1));
                    setCharIndex(charIndex + 1);
                }, 40);
            } else {
                timeout = setTimeout(() => {
                    setStepIndex(stepIndex + 1);
                    setCharIndex(0);
                }, 300);
            }
        }

        return () => clearTimeout(timeout);

    }, [charIndex, stepIndex, activeLang]);

    useEffect(() => {
        setCode("");
        setStepIndex(0);
        setCharIndex(0);
    }, [activeLang]);

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
            <section className="relative top-20 flex flex-col gap-12 py-20 px-6 lg:px-16 ">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 items-center py-6 md:grid-cols-2 md:py-10">
                    <div className="order-1 md:order-2">
                        <div className="mx-auto w-full max-w-[560px] rounded-[2rem] bg-gray-100 p-4 shadow-[0_25px_70px_-35px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-105 dark:bg-gray-800">
                            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                <img
                                    src={problemsImage}
                                    alt="Problems section preview"
                                    className="h-[300px] w-full object-cover md:h-[320px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-2">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-500 font-medium dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                            Coding Practice
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
                            Solve Real Coding Problems
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
                            Practice DSA with structured problems and improve problem-solving skills.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Multiple difficulty levels</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Real interview questions</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Track your progress</span>
                            </div>
                        </div>
                        <Link
                            to="/problems"
                            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            Explore Problems -&gt;
                        </Link>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 items-center py-6 md:grid-cols-2 md:py-10">
                    <div className="order-1 md:order-2">
                        <div className="mx-auto w-full max-w-[560px] rounded-[2rem] bg-gray-100 p-4 shadow-[0_25px_70px_-35px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-105 dark:bg-gray-800">
                            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                <img
                                    src={leaderboardImage}
                                    alt="Leaderboard section preview"
                                    className="h-[300px] w-full object-cover md:h-[320px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-500 font-medium dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                            Competitive Coding
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
                            Compete with Top Coders
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
                            Climb rankings and compare your performance globally.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Global rankings</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Weekly contests</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Performance insights</span>
                            </div>
                        </div>
                        <Link
                            to="/leaderboard"
                            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            View Leaderboard -&gt;
                        </Link>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 items-center py-6 md:grid-cols-2 md:py-10">
                    <div className="order-1 md:order-1">
                        <div className="mx-auto w-full max-w-[560px] rounded-[2rem] bg-gray-100 p-4 shadow-[0_25px_70px_-35px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-105 dark:bg-gray-800">
                            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                <img
                                    src={discussionImage}
                                    alt="Discussion section preview"
                                    className="h-[300px] w-full object-cover md:h-[320px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-2">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-500 font-medium dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                            Community
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
                            Learn with Community
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
                            Discuss problems, share solutions, and learn from others.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Ask doubts</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Share approaches</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Collaborate with peers</span>
                            </div>
                        </div>
                        <Link
                            to="/discuss"
                            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            Join Discussion -&gt;
                        </Link>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 items-center py-6 md:grid-cols-2 md:py-10">
                    <div className="order-1 md:order-2">
                        <div className="mx-auto w-full max-w-[560px] rounded-[2rem] bg-gray-100 p-4 shadow-[0_25px_70px_-35px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-105 dark:bg-gray-800">
                            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                <img
                                    src={aiHelpImage}
                                    alt="AI help section preview"
                                    className="h-[300px] w-full object-cover md:h-[320px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-500 font-medium dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                            Smart Assistance
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
                            Get AI-Powered Help
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
                            Get instant help and explanations using AI.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Debug code faster</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Get hints &amp; solutions</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                                <span>Learn concepts easily</span>
                            </div>
                        </div>
                        <Link
                            to="/problems"
                            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            Try AI Help -&gt;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Developer Experience Section */}
            <section className="py-20 px-6 lg:px-16 text-center">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        <Code className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
                        Developer Experience
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                        Write, run, and iterate in a workspace designed for clarity. Focus on solving problems while the platform handles the workflow around you.
                    </p>

                    <div className="max-w-3xl mx-auto mt-12">
                        <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 font-mono text-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-left">
                            <div className="flex justify-center items-center gap-6 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium">
                                <div className="text-sm flex gap-4 text-gray-600 dark:text-gray-300">
                                    {languageTabs.map((lang) => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => setActiveLang(lang)}
                                            className={
                                                activeLang === lang
                                                    ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                                                    : "text-gray-500 hover:text-blue-400"
                                            }
                                        >
                                            {lang === "cpp"
                                                ? "C++"
                                                : lang === "javascript"
                                                    ? "JavaScript"
                                                    : lang.charAt(0).toUpperCase() + lang.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 h-[260px] overflow-auto bg-gray-50 dark:bg-[#1e1e1e]">
                                <div className="flex">
                                    <div className="text-gray-500 dark:text-gray-400 pr-4 text-right select-none">
                                        {lines.map((_, i) => (
                                            <div key={i}>{i + 1}</div>
                                        ))}
                                    </div>

                                    <pre className="flex-1 whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                                        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                                        <span className="animate-pulse">|</span>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
