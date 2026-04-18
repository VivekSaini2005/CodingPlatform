import Editor from '@monaco-editor/react';
import { useTheme } from '../../../context/themeContext';

const CodeEditorSection = ({ language, code, setCode }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const normalizeLanguage = (value) => {
        if (!value) return 'plaintext';
        const lower = value.toLowerCase();
        if (lower === 'c++') return 'cpp';
        if (lower === 'javascript') return 'javascript';
        if (lower === 'python') return 'python';
        if (lower === 'java') return 'java';
        return lower;
    };

    const handleEditorWillMount = (monaco) => {
        // Define Dark Theme
        monaco.editor.defineTheme('github-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#111827',
                'editor.foreground': '#e5e7eb',
                'editorLineNumber.foreground': '#6b7280',
                'editorLineNumber.activeForeground': '#d1d5db',
                'editor.lineHighlightBackground': '#1f2937',
                'editorCursor.foreground': '#60a5fa',
                'editor.selectionBackground': '#2563eb55',
                'editor.inactiveSelectionBackground': '#2563eb22',
                'editorIndentGuide.background1': '#37415188',
                'editorIndentGuide.activeBackground1': '#9ca3af99'
            }
        });

        // Define Light Theme
        monaco.editor.defineTheme('github-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
                'editor.foreground': '#111827',
                'editorLineNumber.foreground': '#9ca3af',
                'editorLineNumber.activeForeground': '#374151',
                'editor.lineHighlightBackground': '#f3f4f6',
                'editorCursor.foreground': '#2563eb',
                'editor.selectionBackground': '#3b82f633',
                'editor.inactiveSelectionBackground': '#3b82f61a',
                'editorIndentGuide.background1': '#e5e7eb',
                'editorIndentGuide.activeBackground1': '#9ca3af'
            }
        });
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] overflow-hidden">
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={normalizeLanguage(language)}
                    theme={isDarkMode ? 'github-dark' : 'github-light'}
                    value={code}
                    beforeMount={handleEditorWillMount}
                    onChange={(value) => setCode(value ?? '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 15,
                        fontFamily: 'JetBrains Mono, Fira Code, Cascadia Code, Menlo, Monaco, Consolas, monospace',
                        fontLigatures: true,
                        fontWeight: '500',
                        lineHeight: 24,
                        roundedSelection: true,
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        smoothScrolling: true,
                        mouseWheelZoom: true,
                        renderLineHighlight: 'gutter',
                        lineNumbersMinChars: 3,
                        lineDecorationsWidth: 10,
                        tabSize: 4,
                        insertSpaces: true,
                        detectIndentation: false,
                        formatOnType: true,
                        formatOnPaste: true,
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: true
                        },
                        suggestOnTriggerCharacters: true,
                        bracketPairColorization: { enabled: true },
                        guides: {
                            bracketPairs: true,
                            indentation: true
                        },
                        scrollbar: {
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                            alwaysConsumeMouseWheel: false
                        },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 14, bottom: 14 }
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditorSection;
