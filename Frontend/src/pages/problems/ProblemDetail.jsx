import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { runCode, submitCode } from '../../api/submission.api';
import { getProblemById } from '../../api/problem.api';
import Tabs from '../../components/Tabs';
import TestPanel from '../../components/TestPanel';
import { Loader2 } from 'lucide-react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';

// Sub-components
import Toolbar from './components/Toolbar';
import ProblemDescription from './components/ProblemDescription';
import SubmissionsTab from './components/SubmissionsTab';
import CodeEditorSection from './components/CodeEditorSection';

const ProblemDetail = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [code, setCode] = useState('// Write your code here (C++)');
    const [language, setLanguage] = useState('c++');
    const [activeLeftTab, setActiveLeftTab] = useState('description');
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await getProblemById(id);
                setProblem(data);
                if (data.startCode && data.startCode.length > 0) {
                    const cppCode = data.startCode.find(c => c.language.toLowerCase() === 'c++');
                    if (cppCode) {
                        setCode(cppCode.initialCode);
                    } else {
                        const defaultCode = data.startCode[0];
                        setCode(defaultCode.initialCode);
                        setLanguage(defaultCode.language);
                    }
                }
            } catch (err) {
                setError(err.message || 'Failed to load problem');
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    const handleRun = async () => {
        setRunLoading(true);
        setRunResult(null);
        try {
            const result = await runCode(id, code, language);
            setRunResult(result);
        } catch (err) {
            console.error(err);
        } finally {
            setRunLoading(false);
        }
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);
        setRunResult(null);
        try {
            const result = await submitCode(id, code, language);
            setSubmitResult(result);
            if (result.testResults) {
                setRunResult(result.testResults);
            }
            alert(`Submission Status: ${result.status}`);
        } catch (err) {
            console.error(err);
            alert("Submission Failed: " + (err.message || "Unknown Error"));
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        if (problem && problem.startCode) {
            const codeSnippet = problem.startCode.find(c => c.language.toLowerCase() === newLanguage.toLowerCase());
            if (codeSnippet) {
                setCode(codeSnippet.initialCode);
            } else {
                setCode('// No boilerplate available for this language');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
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
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-950">
            <Toolbar
                language={language}
                onLanguageChange={handleLanguageChange}
                handleRun={handleRun}
                handleSubmit={handleSubmit}
                runLoading={runLoading}
                submitLoading={submitLoading}
            />

            <div className="flex-1 overflow-hidden">
                <PanelGroup orientation="horizontal">
                    {/* Left Side: Description and Submissions */}
                    <Panel defaultSize={50} minSize={20}>
                        <div className="h-full flex flex-col border-r border-gray-700 bg-gray-900 overflow-hidden">
                            <Tabs
                                tabs={[
                                    { id: 'description', label: 'Description' },
                                    { id: 'submissions', label: 'Submissions' }
                                ]}
                                activeTab={activeLeftTab}
                                onTabChange={setActiveLeftTab}
                            />
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                                {activeLeftTab === 'description' ? (
                                    <ProblemDescription problem={problem} />
                                ) : (
                                    <SubmissionsTab problemId={id} />
                                )}
                            </div>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1.5 bg-gray-900 border-x border-gray-700 hover:bg-blue-500/20 transition-colors flex items-center justify-center group cursor-col-resize">
                        <div className="w-0.5 h-8 bg-gray-700 group-hover:bg-blue-500 rounded-full"></div>
                    </PanelResizeHandle>

                    {/* Right Side: Code Editor and Test Results */}
                    <Panel defaultSize={50} minSize={20}>
                        <PanelGroup orientation="vertical">
                            <Panel defaultSize={70} minSize={20}>
                                <CodeEditorSection
                                    language={language}
                                    code={code}
                                    setCode={setCode}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-1.5 bg-gray-900 border-y border-gray-700 hover:bg-blue-500/20 transition-colors flex items-center justify-center group cursor-row-resize">
                                <div className="w-8 h-0.5 bg-gray-700 group-hover:bg-blue-500 rounded-full"></div>
                            </PanelResizeHandle>

                            <Panel defaultSize={30} minSize={10}>
                                <div className="h-full bg-[#1e1e1e] overflow-hidden">
                                    <TestPanel
                                        problem={problem}
                                        runResult={runResult}
                                        isRunning={runLoading}
                                    />
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
};

export default ProblemDetail;
