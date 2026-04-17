import { useState, useEffect } from 'react';
import { getAllProblems } from '../../api/problem.api';
import { Link } from 'react-router-dom';
import { Loader2, Search, Tag, CheckCircle2, Circle, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from "react-router-dom";
import baseimage from "../../images/ProblemBG.jpg"

const ProblemList = () => {

    const companies = [
        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
        { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg' },
        { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
        { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
        { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
        { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
        { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
        { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg' },
        { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
        { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
        { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg', }
    ];

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [searchTerm, setSearchTerm] = useState('');

    const [difficultyOrder, setDifficultyOrder] = useState(null);
    const [selectedTag, setSelectedTag] = useState("All");

    const { user } = useAuth();

    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getAllProblems();
                setProblems(data);
            } catch (err) {
                setError(err.message || 'Failed to load problems');
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // Unique tags
    const allTags = ["All", ...new Set(problems.map(p => p.tags).filter(Boolean))];
    const tagCounts = problems.reduce((counts, problem) => {
        if (problem.tags) {
            counts[problem.tags] = (counts[problem.tags] || 0) + 1;
        }
        return counts;
    }, { All: problems.length });
    const difficultyPills = [
        { label: 'All', value: null, icon: Tag },
        { label: 'Easy to Hard', value: 'asc', icon: ArrowUp },
        { label: 'Hard to Easy', value: 'desc', icon: ArrowDown },
    ];

    // Sorting
    let filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tag filter
    if (selectedTag !== "All") {
        filteredProblems = filteredProblems.filter(
            problem => problem.tags === selectedTag
        );
    }

    // Difficulty sorting
    if (difficultyOrder) {

        const order = { easy: 1, medium: 2, hard: 3 };

        filteredProblems = [...filteredProblems].sort((a, b) => {

            if (difficultyOrder === "asc") {
                return order[a.difficulty.toLowerCase()] - order[b.difficulty.toLowerCase()];
            }

            return order[b.difficulty.toLowerCase()] - order[a.difficulty.toLowerCase()];
        });
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20';
            case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20';
            case 'hard': return 'text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20';
            default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen page-fade-in bg-white dark:bg-gray-900 pb-12">
            <div className="relative">
                <section
                    className="relative w-full h-[100vh] md:h-[100vh] lg:h-[100vh] pb-10 md:pb-12 bg-cover bg-center bg-no-repeat brightness-110 contrast-110"
                    style={{
                        backgroundImage: `url(${baseimage})`
                    }}
                >
                    {/* <div className="absolute inset-0 bg-black/30 dark:bg-transparent"></div> */}
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent dark:from-black/70 dark:via-black/40"></div> */}
                    <div className="absolute bottom-0 left-0 w-full h-14 md:h-16 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-gray-900 dark:via-gray-900/60 dark:to-transparent z-[5]" />
                    <div className="absolute z-10 flex flex-col justify-center h-full px-8 md:px-16 hero-content-fade-in">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white drop-shadow-lg">
                                Solve FAANG-Level Problems
                            </h2>
                            <p className="text-white dark:text-gray-300 mt-3 text-lg drop-shadow-lg">
                                Practice real interview questions from top tech companies
                            </p>
                            <a
                                href="#problems-section"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4 transition-all duration-200 hover:scale-105"
                            >
                                Start Solving
                            </a>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 mt-12 space-y-6">

                <div id="problems-section" className="relative z-20 max-w-6xl mx-auto mt-[-84px] md:mt-[-110px]">
                    <div className="p-[1px] rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-transparent transition hover:-translate-y-1 ">
                        <div className="rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg px-6 py-6 md:px-10">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center items-center">
                                {companies.map((company) => (
                                    <div
                                        key={company.name}
                                        data-company-item
                                        className="flex justify-center items-center opacity-90 hover:opacity-100 hover:scale-105 transition duration-200"
                                    >
                                        <div className="w-[90px] flex justify-center px-3 py-2 rounded-md bg-white/80 dark:bg-white/90 backdrop-blur-sm border border-gray-200/70 dark:border-gray-700/60 shadow-sm">
                                            <img
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                                className="h-6 md:h-7 max-w-[80px] object-contain"
                                                loading="lazy"
                                                onError={(e) => {
                                                    const item = e.currentTarget.closest('[data-company-item]');
                                                    if (item) item.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Problems
                </h1>

                <div className="flex flex-wrap gap-3 items-center mb-4">
                    {allTags.map((tag) => {
                        const isActive = selectedTag === tag;
                        const count = tag === "All" ? tagCounts.All : tagCounts[tag] || 0;

                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSelectedTag(tag)}
                                className={`px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition shadow-sm ${isActive ? 'bg-gray-200 dark:bg-gray-700 shadow-sm' : ''}`}
                            >
                                {tag}
                                <span className="ml-1 text-xs px-2 py-[2px] rounded-full bg-gray-200 dark:bg-gray-700">
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                    {difficultyPills.map(({ label, value, icon: Icon }) => {
                        const isActive = difficultyOrder === value;

                        return (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setDifficultyOrder(value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition shadow-sm ${isActive ? 'bg-white dark:bg-gray-700 shadow-md' : ''}`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between mt-6 gap-4 flex-col lg:flex-row">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-full max-w-md shadow-sm">
                        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Search problems..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        <span>{user?.problemSolved?.length || 0}/{problems.length} Solved</span>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
                            aria-label="Filter"
                        >
                            <Tag className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
                            aria-label="Sort"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800 pb-0">

                    {filteredProblems.map((problem) => (
                        <div
                            key={problem._id}
                            className="flex items-center justify-between gap-6 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
                                {user?.problemSolved?.some(
                                    (p) => p._id === problem._id
                                ) ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 align-middle" />
                                ) : (
                                    <Circle className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 align-middle" />
                                )}

                                <Link
                                    to={`/problems/${problem._id}`}
                                    className="block min-w-0 text-sm font-medium text-left text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 truncate transition-colors duration-200"
                                >
                                    {problem.title}
                                </Link>
                            </div>

                            <div className="flex items-center justify-end shrink-0">
                                <Link
                                    to={`/problems/${problem._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                                >
                                    Solve
                                </Link>
                            </div>

                            <div className="flex items-center justify-end w-32 shrink-0">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}
                                >
                                    {problem.difficulty}
                                </span>
                            </div>
                        </div>
                    ))}

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                            No problems found matching your search.
                        </div>
                    )}

                    </div>
                </div>

                </div>

            </div>
            </div>

        </div>
    );
};

export default ProblemList;