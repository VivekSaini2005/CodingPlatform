import { Loader2, Play, Send } from 'lucide-react';

const Toolbar = ({
    language,
    onLanguageChange,
    handleRun,
    handleSubmit,
    runLoading,
    submitLoading
}) => {
    return (
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
                <select
                    value={language}
                    onChange={onLanguageChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="c++">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleRun}
                    disabled={runLoading}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                    {runLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-500" />
                    ) : (
                        <Play className="w-4 h-4 mr-2 text-green-500" />
                    )}
                    {runLoading ? 'Running...' : 'Run'}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-70"
                >
                    {submitLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4 mr-2" />
                    )}
                    {submitLoading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
