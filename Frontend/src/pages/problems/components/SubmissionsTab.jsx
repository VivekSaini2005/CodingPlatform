import { useState, useEffect } from 'react';
import { getSubmissions } from '../../../api/submission.api';
import { Loader2, CheckCircle, XCircle, Clock, Database } from 'lucide-react';

const SubmissionsTab = ({ problemId }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                const data = await getSubmissions(problemId);
                // console.log(data);
                // The backend returns "No Submission is persent" if empty, handle that
                if (typeof data === 'string') {
                    setSubmissions([]);
                } else {
                    setSubmissions(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                setError(err.message || 'Failed to load submissions');
            } finally {
                setLoading(false);
            }
        };

        if (problemId) {
            fetchSubmissions();
        }
    }, [problemId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No submissions yet for this problem.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Submission History</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Language</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Time</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Memory</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...submissions].reverse().map((sub) => (
                            <tr key={sub._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                        {sub.status === 'accepted' ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className={`font-medium ${sub.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                                    {sub.language}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center text-xs">
                                        <Clock className="w-3 h-3 mr-1 opacity-50" />
                                        {sub.runtime} ms
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center text-xs">
                                        <Database className="w-3 h-3 mr-1 opacity-50" />
                                        {sub.memory} KB
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-500">
                                    {new Date(sub.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmissionsTab;
