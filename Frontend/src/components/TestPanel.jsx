import { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Plus } from 'lucide-react';

const TestPanel = ({ problem, testCases, setTestCases, runResult, isRunning }) => {
    const [activeTab, setActiveTab] = useState('testcase');
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);

    return (
        <div className="flex flex-col h-full bg-gray-800 border-t border-gray-700">
            {/* Main Tabs (Testcase / Result) */}
            <div className="flex bg-gray-900 px-4 pt-2 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('testcase')}
                    className={`mr-6 pb-2 text-sm font-medium transition-colors border-b-2 
                        ${activeTab === 'testcase'
                            ? 'text-white border-green-500'
                            : 'text-gray-400 border-transparent hover:text-gray-200'}`}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">
                            <CheckCircle className="w-4 h-4" />
                        </span>
                        Testcase
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('result')}
                    className={`mr-6 pb-2 text-sm font-medium transition-colors border-b-2 
                        ${activeTab === 'result'
                            ? 'text-white border-green-500'
                            : 'text-gray-400 border-transparent hover:text-gray-200'}`}
                >
                    <div className="flex items-center gap-2">
                        Test Result
                        {runResult && (
                            runResult.every(r => (r.status?.id || r.status_id) === 3)
                                ? <span className="text-green-500 text-xs">Passed</span>
                                : <span className="text-red-500 text-xs">Failed</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {activeTab === 'testcase' ? (
                    <div className="space-y-4">
                        {/* Case Tabs */}
                        <div className="flex items-center gap-2 mb-4">
                            {problem?.visibleTestCases?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTestCaseId(idx)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                                        ${activeTestCaseId === idx
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-transparent text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`}
                                >
                                    Case {idx + 1}
                                </button>
                            ))}
                        </div>

                        {/* Selected Case Input */}
                        {problem?.visibleTestCases && problem.visibleTestCases[activeTestCaseId] && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400">Input</label>
                                    <div className="bg-gray-900 p-3 rounded-lg text-gray-300 font-mono text-sm border border-gray-700">
                                        {problem.visibleTestCases[activeTestCaseId].input}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400">Expected Output</label>
                                    <div className="bg-gray-900 p-3 rounded-lg text-gray-300 font-mono text-sm border border-gray-700">
                                        {problem.visibleTestCases[activeTestCaseId].output}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {!runResult ? (
                            <div className="text-gray-500 text-center mt-8">
                                Run your code to see results here
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Result Tabs (Reusable interaction pattern) */}
                                <div className="flex items-center gap-2 mb-4">
                                    {runResult.map((res, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTestCaseId(idx)} // Reuse same state for result view
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                                                ${activeTestCaseId === idx
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-transparent text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`}
                                        >
                                            {(res.status?.id || res.status_id) === 3 ? (
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            ) : (
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            )}
                                            Case {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Result Detail */}
                                {runResult[activeTestCaseId] && (
                                    <div className="space-y-4">
                                        {(runResult[activeTestCaseId].status?.id || runResult[activeTestCaseId].status_id) !== 3 && (
                                            <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-red-400 font-mono text-sm">
                                                {runResult[activeTestCaseId].stderr || runResult[activeTestCaseId].compile_output || runResult[activeTestCaseId].message || 'Error'}
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-400">Input</label>
                                            <div className="bg-gray-900 p-3 rounded-lg text-gray-300 font-mono text-sm border border-gray-700">
                                                {problem?.visibleTestCases?.[activeTestCaseId]?.input || "N/A"}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-400">Output</label>
                                            <div className={`p-3 rounded-lg font-mono text-sm border 
                                                ${(runResult[activeTestCaseId].status?.id || runResult[activeTestCaseId].status_id) === 3
                                                    ? 'bg-gray-900 text-gray-300 border-gray-700'
                                                    : 'bg-red-900/10 text-red-200 border-red-900/30'}`}>
                                                {runResult[activeTestCaseId].stdout || "N/A"}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-400">Expected Output</label>
                                            <div className="bg-gray-900 p-3 rounded-lg text-gray-300 font-mono text-sm border border-gray-700">
                                                {runResult[activeTestCaseId].expected_output}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPanel;
