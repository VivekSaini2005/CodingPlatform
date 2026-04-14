import { useState, useEffect } from 'react';
import { getAllProblems } from '../../api/problem.api';
import { Link } from 'react-router-dom';
import { Loader2, Search, Tag, CheckCircle2 } from 'lucide-react';
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
        { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' }
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
            case 'easy': return 'text-green-300 bg-green-500/20 border border-green-500/40';
            case 'medium': return 'text-yellow-300 bg-yellow-500/20 border border-yellow-500/40';
            case 'hard': return 'text-red-300 bg-red-500/20 border border-red-500/40';
            default: return 'text-gray-300 bg-gray-700 border border-gray-600';
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
        <div className="w-full page-fade-in bg-white dark:bg-gray-900">
            <div className="relative">
                <section
                    className="relative w-full h-[100vh] md:h-[100vh] lg:h-[100vh] pb-20 md:pb-24 bg-cover bg-center bg-no-repeat brightness-110 contrast-110"
                    style={{
                        backgroundImage: `url(${baseimage})`
                    }}
                >
                    <div className="absolute inset-0 bg-black/30 dark:bg-transparent"></div>
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent dark:from-black/70 dark:via-black/40"></div> */}
                    <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-gradient-to-t from-white via-white/40 to-transparent dark:hidden z-[5]" />

                    <div className="absolute z-10 flex flex-col justify-center h-full px-8 md:px-16 hero-content-fade-in">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                                Solve FAANG-Level Problems
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mt-3 text-lg drop-shadow-lg">
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

                <div className="max-w-7xl mx-auto mt-12 px-6 py-6 md:px-10 space-y-6">

                <div id="problems-section" className="relative z-20 max-w-6xl mx-auto mt-[-84px] md:mt-[-110px]">
                    <div className="p-[1px] rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-transparent transition hover:-translate-y-1">
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

                <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex flex-col md:flex-row gap-4 items-center transition-all duration-200">

                    <div className="w-full flex-1 flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-2 py-1 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
                        <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                            placeholder="Search problems..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        value={difficultyOrder || ""}
                        onChange={(e) => setDifficultyOrder(e.target.value || null)}
                        className="w-full md:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Difficulty</option>
                        <option value="asc">Easy to Hard</option>
                        <option value="desc">Hard to Easy</option>
                    </select>
                </div>

                <div className="mt-6 space-y-3">

                    {filteredProblems.map((problem) => (
                        <div
                            key={problem._id}
                            className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 md:px-6 py-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                <div className="flex items-center gap-4 min-w-0">
                                    {user?.problemSolved?.some(
                                        (p) => p._id === problem._id
                                    ) ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                                    )}

                                    <div className="min-w-0">
                                        <Link
                                            to={`/problems/${problem._id}`}
                                            className="block text-base md:text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 truncate transition-colors duration-200"
                                        >
                                            {problem.title}
                                        </Link>

                                        <span
                                            className={`inline-flex mt-2 px-2.5 py-1 rounded text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-start md:justify-center gap-2 md:flex-1">
                                    {problem.tags ? (
                                        <span className="inline-flex items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-700 dark:text-gray-100">
                                            <Tag className="w-3.5 h-3.5 mr-1" />
                                            {problem.tags}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
                                            No Tag
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-start md:justify-end">
                                    <Link
                                        to={`/problems/${problem._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                                    >
                                        Solve
                                    </Link>
                                </div>

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
    );
};

export default ProblemList;