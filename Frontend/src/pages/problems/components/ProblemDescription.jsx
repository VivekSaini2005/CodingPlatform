import ReactMarkdown from 'react-markdown';

const ProblemDescription = ({ problem }) => {
    if (!problem) return null;

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{problem.title}</h1>
            <div className="flex items-center gap-2 mb-6">
                <span className={`rounded-full px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-[#2f2f2f]
                    ${problem.difficulty === 'easy' ? 'text-green-400' :
                        problem.difficulty === 'medium' ? 'text-yellow-400' :
                            'text-red-400'}`}>
                    {problem.difficulty}
                </span>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>

            {problem.explainTestCase && problem.explainTestCase.map((testCase, index) => (
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
