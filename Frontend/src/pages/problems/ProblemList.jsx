import { useState, useEffect } from 'react';
import { getAllProblems } from '../../api/problem.api';
import { Link } from 'react-router-dom';
import { Loader2, Search, Tag, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getAllProblems();
                console.log(data);
                setProblems(data);
            } catch (err) {
                setError(err.message || 'Failed to load problems');
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


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
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Problems</h1>
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Search problems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Difficulty
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Tags
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProblems.map((problem) => (
                                <tr key={problem._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user?.problemSolved?.includes(problem._id) ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-50 dark:fill-green-900/20" />
                                        ) : (
                                            <div className="h-2.5 w-2.5 ml-1.5 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/problems/${problem._id}`} className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                            {problem.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            {problem.tags ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                                    <Tag className="w-4 h-4 mr-1" />
                                                    {problem.tags}
                                                </span>
                                            ) : null}
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
