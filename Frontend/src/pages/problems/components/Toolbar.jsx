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
        <div className="bg-white dark:bg-[#262626] border-b border-[#2a2a2a] px-4 py-2 flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
                <select
                    value={language}
                    onChange={onLanguageChange}
                    className="bg-gray-100 dark:bg-[#2f2f2f] border border-gray-200 dark:border-[#2f2f2f] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-yellow-500 text-black dark:text-white"
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
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-black dark:text-white bg-gray-100 dark:bg-[#2f2f2f] border border-gray-200 dark:border-[#2f2f2f] rounded-md hover:bg-gray-200 dark:hover:bg-[#3a3a3a] disabled:opacity-50 transition-all duration-200"
                >
                    {runLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-yellow-500" />
                    ) : (
                        <Play className="w-4 h-4 mr-2 text-yellow-500" />
                    )}
                    {runLoading ? 'Running...' : 'Run'}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-black bg-yellow-500 rounded-md hover:bg-yellow-400 disabled:opacity-70 transition-all duration-200"
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
