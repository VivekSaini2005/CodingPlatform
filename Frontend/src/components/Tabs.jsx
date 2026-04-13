import { useState } from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        px-4 py-2 text-sm font-medium focus:outline-none transition-colors
                        ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
