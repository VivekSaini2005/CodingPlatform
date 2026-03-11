import { useState, useEffect } from 'react';
import { getAllProblems } from '../../api/problem.api';
import { Link } from 'react-router-dom';
import { Loader2, Search, Tag, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from "react-router-dom";

const ProblemList = () => {

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
            case 'easy': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
            case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            case 'hard': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            default: return 'text-gray-500 bg-gray-50 dark:bg-gray-800';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Problems
                </h1>

                {/* Search */}
                <div className="relative w-full md:w-96">

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search problems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                        <thead className="bg-gray-50 dark:bg-gray-700/50">

                            <tr>

                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                                    #
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                                    Title
                                </th>

                                {/* Difficulty Sort */}
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">

                                    <div className="flex items-center gap-2">

                                        Difficulty

                                        <div className="flex flex-col text-xs leading-none">

                                            <button
                                                onClick={() => setDifficultyOrder("asc")}
                                                className={`hover:text-blue-500 ${difficultyOrder === "asc" ? "text-blue-500" : ""}`}
                                            >
                                                ▲
                                            </button>

                                            <button
                                                onClick={() => setDifficultyOrder("desc")}
                                                className={`hover:text-blue-500 ${difficultyOrder === "desc" ? "text-blue-500" : ""}`}
                                            >
                                                ▼
                                            </button>

                                        </div>

                                    </div>

                                </th>

                                {/* Tag Filter */}
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">

                                    <div className="flex items-center gap-2">

                                        Tags

                                        <select
                                            value={selectedTag}
                                            onChange={(e) => setSelectedTag(e.target.value)}
                                            className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 bg-white dark:bg-gray-800"
                                        >

                                            {allTags.map((tag, index) => (

                                                <option key={index} value={tag}>
                                                    {tag}
                                                </option>

                                            ))}

                                        </select>

                                    </div>

                                </th>

                            </tr>

                        </thead>

                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">

                            {filteredProblems.map((problem, index) => (

                                <tr
                                    key={problem._id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">

                                        {user?.problemSolved?.some(
                                            (p) => p._id === problem._id
                                        ) ? (

                                            <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-50 dark:fill-green-900/20" />

                                        ) : (

                                            <div className="h-2.5 w-2.5 ml-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>

                                        )}

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">

                                        <Link
                                            to={`/problems/${problem._id}`}
                                            className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600"
                                        >
                                            {problem.title}
                                        </Link>

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}
                                        >
                                            {problem.difficulty}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">

                                        <div className="flex gap-2">

                                            {problem.tags && (

                                                <span className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">

                                                    <Tag className="w-4 h-4 mr-1" />

                                                    {problem.tags}

                                                </span>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {filteredProblems.length === 0 && (

                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No problems found matching your search.
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ProblemList;