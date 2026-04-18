const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#262626]">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        px-4 py-2 text-sm font-medium focus:outline-none transition-colors border-b-2
                        ${activeTab === tab.id
                            ? 'text-gray-900 dark:text-white border-yellow-500'
                            : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
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
