import Editor from '@monaco-editor/react';
import { useTheme } from '../../../context/themeContext';

const CodeEditorSection = ({ language, code, setCode }) => {
    const { theme } = useTheme();

    // Determine active theme
    const isDarkMode =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const handleEditorWillMount = (monaco) => {
        // Define Dark Theme
        monaco.editor.defineTheme('github-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1e293b', // Match tailwind slate-800 or slate-900 background roughly
                'editor.lineHighlightBackground': '#33415555',
                'editorCursor.foreground': '#3b82f6',
                'editor.selectionBackground': '#3b82f633',
                'editor.inactiveSelectionBackground': '#3b82f611',
            }
        });

        // Define Light Theme
        monaco.editor.defineTheme('github-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
                'editor.lineHighlightBackground': '#f1f5f9',
                'editorCursor.foreground': '#3b82f6',
                'editor.selectionBackground': '#3b82f633',
                'editor.inactiveSelectionBackground': '#3b82f611',
            }
        });
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={language === 'c++' ? 'cpp' : language}
                    theme={isDarkMode ? 'github-dark' : 'github-light'}
                    value={code}
                    beforeMount={handleEditorWillMount}
                    onChange={(value) => setCode(value)}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 10 }
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditorSection;
