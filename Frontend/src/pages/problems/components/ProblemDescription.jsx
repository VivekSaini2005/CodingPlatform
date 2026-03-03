import ReactMarkdown from 'react-markdown';

const ProblemDescription = ({ problem }) => {
    if (!problem) return null;

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{problem.title}</h1>
            <div className="flex items-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${problem.difficulty === 'easy' ? 'text-green-500 bg-green-500/10 border border-green-500/20' :
                        problem.difficulty === 'medium' ? 'text-yellow-500 bg-yellow-500/10 border border-yellow-500/20' :
                            'text-red-500 bg-red-500/10 border border-red-500/20'}`}>
                    {problem.difficulty}
                </span>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>

            {problem.visibleTestCases && problem.visibleTestCases.map((testCase, index) => (
                <div key={index} className="space-y-4 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Example {index + 1}:</h3>
                    <div className="pl-4 border-l-4 border-gray-700 space-y-2">
                        <div className="flex gap-2 text-base font-mono">
                            <span className="font-bold text-gray-900 dark:text-white">Input:</span>
                            <span className="text-gray-800 dark:text-gray-300">{testCase.input}</span>
                        </div>
                        <div className="flex gap-2 text-base font-mono">
                            <span className="font-bold text-gray-900 dark:text-white">Output:</span>
                            <span className="text-gray-800 dark:text-gray-300">{testCase.output}</span>
                        </div>
                        {testCase.explanation && (
                            <div className="flex gap-2 text-base font-mono">
                                <span className="font-bold text-gray-900 dark:text-white">Explanation:</span>
                                <span className="text-gray-800 dark:text-gray-300">{testCase.explanation}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProblemDescription;
