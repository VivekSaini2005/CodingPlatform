import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Terminal, Code, Settings, ListChecks, Server, ChevronRight, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

// Zod schema matching the problem schema
const problemSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    tags: z.enum(['array', 'linkedList', 'graph', 'dp', 'math']),
    visibleTestCases: z.array(
        z.object({
            input: z.string().min(1, 'Input is required'),
            output: z.string().min(1, 'Output is required'),
            explanation: z.string().min(1, 'Explanation is required')
        })
    ).min(1, 'At least one visible test case required'),
    hiddenTestCases: z.array(
        z.object({
            input: z.string().min(1, 'Input is required'),
            output: z.string().min(1, 'Output is required')
        })
    ).min(1, 'At least one hidden test case required'),
    startCode: z.array(
        z.object({
            language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
            initialCode: z.string().min(1, 'Initial code is required')
        })
    ).length(4, 'All four languages required'),
    referenceSolution: z.array(
        z.object({
            language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
            completeCode: z.string().min(1, 'Complete code is required')
        })
    ).length(4, 'All four languages required')
});

function AdminPanel() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } =
        useForm({
            resolver: zodResolver(problemSchema),
            defaultValues: {
                startCode: [
                    { language: 'C++', initialCode: '' },
                    { language: 'Java', initialCode: '' },
                    { language: 'JavaScript', initialCode: '' },
                    { language: 'Python', initialCode: '' }
                ],
                referenceSolution: [
                    { language: 'C++', completeCode: '' },
                    { language: 'Java', completeCode: '' },
                    { language: 'JavaScript', completeCode: '' },
                    { language: 'Python', completeCode: '' }
                ]
            }
        });

    const {
        fields: visibleFields,
        append: appendVisible,
        remove: removeVisible
    } = useFieldArray({
        control,
        name: 'visibleTestCases'
    });

    const {
        fields: hiddenFields,
        append: appendHidden,
        remove: removeHidden
    } = useFieldArray({
        control,
        name: 'hiddenTestCases'
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            console.log('Submitting problem data:', data);
            const response = await axiosInstance.post('/problem/create', data);
            console.log('Problem created successfully:', response.data);
            setSubmitSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error('Error creating problem:', error);
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to create problem';
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/10 blur-[120px]"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center relative z-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-4 backdrop-blur-sm shadow-xl">
                        <Terminal className="text-teal-400 w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
                        Create New Problem
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Design a new algorithmic challenge for the platform. Provide rigorous test cases and template code to ensure a seamless experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    {/* Alerts */}
                    {submitError && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 flex items-center space-x-3 text-red-400 animate-in fade-in slide-in-from-top-4">
                            <AlertCircle className="w-6 h-6 flex-shrink-0" />
                            <span className="font-medium">{submitError}</span>
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-2xl p-4 flex items-center space-x-3 text-emerald-400 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <span className="font-medium">Problem created successfully! Redirecting...</span>
                        </div>
                    )}

                    {/* Basic Information Section */}
                    <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all hover:bg-[#1e293b]/90">
                        <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                            <Settings className="text-indigo-400 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Problem Title</label>
                                <input
                                    {...register('title')}
                                    placeholder="e.g. Two Sum"
                                    className={`w-full bg-[#0f172a] border ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                                />
                                {errors.title && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.title.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Description (Markdown Supported)</label>
                                <textarea
                                    {...register('description')}
                                    placeholder="Explain the problem statement clearly..."
                                    className={`w-full bg-[#0f172a] border ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all min-h-[160px] resize-y`}
                                />
                                {errors.description && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.description.message}</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                                    <div className="relative">
                                        <select
                                            {...register('difficulty')}
                                            className={`w-full bg-[#0f172a] border ${errors.difficulty ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 appearance-none`}
                                        >
                                            <option value="easy">🟢 Easy</option>
                                            <option value="medium">🟡 Medium</option>
                                            <option value="hard">🔴 Hard</option>
                                        </select>
                                    </div>
                                    {errors.difficulty && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.difficulty.message}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Tag / Category</label>
                                    <div className="relative">
                                        <select
                                            {...register('tags')}
                                            className={`w-full bg-[#0f172a] border ${errors.tags ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 appearance-none`}
                                        >
                                            <option value="array">Array</option>
                                            <option value="linkedList">Linked List</option>
                                            <option value="graph">Graph</option>
                                            <option value="dp">Dynamic Programming</option>
                                            <option value="math">Math</option>
                                        </select>
                                    </div>
                                    {errors.tags && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.tags.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Cases Section */}
                    <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all hover:bg-[#1e293b]/90">
                        <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                            <ListChecks className="text-emerald-400 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">Test Cases</h2>
                        </div>

                        {/* Visible Test Cases */}
                        <div className="mb-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-200 flex items-center">
                                    <Server className="w-5 h-5 mr-2 text-slate-400" />
                                    Visible Test Cases (Shown to User)
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                                    className="mt-3 sm:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors flex items-center text-slate-300 hover:text-white"
                                >
                                    <span className="text-emerald-400 mr-2 text-lg leading-none">+</span> Add Visible Case
                                </button>
                            </div>

                            <div className="space-y-6">
                                {visibleFields.map((field, index) => (
                                    <div key={field.id} className="relative bg-[#0f172a]/50 border border-slate-700/50 rounded-2xl p-6 transition-colors hover:border-emerald-500/30">
                                        <div className="absolute top-4 right-4">
                                            <button
                                                type="button"
                                                onClick={() => removeVisible(index)}
                                                className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                                                title="Remove Test Case"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Input</label>
                                                <textarea
                                                    {...register(`visibleTestCases.${index}.input`)}
                                                    placeholder="e.g. 4\n1 2 3 4"
                                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Output</label>
                                                <textarea
                                                    {...register(`visibleTestCases.${index}.output`)}
                                                    placeholder="e.g. 10"
                                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Explanation</label>
                                                <textarea
                                                    {...register(`visibleTestCases.${index}.explanation`)}
                                                    placeholder="Why is this the output? (optional but recommended)"
                                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {errors.visibleTestCases && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.visibleTestCases.message}</span>}
                            </div>
                        </div>

                        {/* Hidden Test Cases */}
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-200 flex items-center">
                                    <Server className="w-5 h-5 mr-2 text-slate-400" />
                                    Hidden Test Cases (For Evaluation)
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => appendHidden({ input: '', output: '' })}
                                    className="mt-3 sm:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors flex items-center text-slate-300 hover:text-white"
                                >
                                    <span className="text-indigo-400 mr-2 text-lg leading-none">+</span> Add Hidden Case
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hiddenFields.map((field, index) => (
                                    <div key={field.id} className="relative bg-[#0f172a]/50 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                                        <div className="absolute top-3 right-3">
                                            <button
                                                type="button"
                                                onClick={() => removeHidden(index)}
                                                className="p-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="space-y-3 mt-4">
                                            <div>
                                                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">Input</label>
                                                <textarea
                                                    {...register(`hiddenTestCases.${index}.input`)}
                                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                                                    rows={2}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">Output</label>
                                                <textarea
                                                    {...register(`hiddenTestCases.${index}.output`)}
                                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                                                    rows={1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.hiddenTestCases && <span className="text-red-400 text-sm mt-1.5 inline-block">{errors.hiddenTestCases.message}</span>}
                        </div>
                    </div>

                    {/* Code Templates Section */}
                    <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all hover:bg-[#1e293b]/90">
                        <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                            <Code className="text-amber-400 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">Code Templates & Solutions</h2>
                        </div>

                        <div className="opacity-80 mb-6 text-sm text-slate-400">
                            Provide the boilerplate code presented to the user, and the full reference solution used to validate hidden test cases internally.
                        </div>

                        <div className="space-y-8">
                            {[0, 1, 2, 3].map((index) => {
                                const langMap = ['C++', 'Java', 'JavaScript', 'Python'];
                                const langColors = ['text-blue-400', 'text-red-400', 'text-yellow-400', 'text-green-400'];
                                return (
                                    <div key={index} className="bg-[#0f172a]/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                                        <div className="bg-white/5 px-4 py-3 border-b border-slate-700/50 font-medium text-slate-200 flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-2 bg-current ${langColors[index]}`}></span>
                                            {langMap[index]}
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-700/50">
                                            <div className="p-4">
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">Initial Code / Boilerplate</label>
                                                <textarea
                                                    {...register(`startCode.${index}.initialCode`)}
                                                    className="w-full bg-black/40 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm leading-relaxed focus:outline-none focus:border-amber-500/50 transition-colors"
                                                    rows={7}
                                                    spellCheck="false"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">Complete Reference Solution</label>
                                                <textarea
                                                    {...register(`referenceSolution.${index}.completeCode`)}
                                                    className="w-full bg-black/40 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm leading-relaxed focus:outline-none focus:border-amber-500/50 transition-colors"
                                                    rows={7}
                                                    spellCheck="false"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="sticky bottom-6 z-50 pt-4 pb-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full group relative flex items-center justify-center p-4 rounded-2xl text-lg font-bold text-white shadow-2xl transition-all overflow-hidden ${isSubmitting ? 'cursor-not-allowed opacity-80 bg-slate-800' : 'hover:-translate-y-1 hover:shadow-cyan-500/25'}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 transition-all group-hover:scale-105"></div>

                            <span className="relative z-10 flex items-center">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting to Database...
                                    </>
                                ) : (
                                    <>
                                        🚀 Launch Problem to Platform
                                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminPanel;