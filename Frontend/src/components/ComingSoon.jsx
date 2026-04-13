import React from 'react';
import { Rocket, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ title, description }) => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-full animate-bounce">
                <Rocket className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                {title} <span className="text-blue-600 dark:text-blue-400">Coming Soon</span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                {description || "We're working hard to bring you this feature. Stay tuned for updates as we build the best coding experience for you!"}
            </p>

            <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
            </Link>

            <div className="mt-16 flex gap-8">
                <div className="flex flex-col items-center">
                    <div className="h-1 w-12 bg-blue-600 dark:bg-blue-400 rounded-full mb-2"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Design</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-1 w-12 bg-blue-600 dark:bg-blue-400 rounded-full mb-2"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Dev</span>
                </div>
                <div className="flex flex-col items-center opacity-30">
                    <div className="h-1 w-12 bg-gray-300 dark:bg-gray-700 rounded-full mb-2"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Launch</span>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
