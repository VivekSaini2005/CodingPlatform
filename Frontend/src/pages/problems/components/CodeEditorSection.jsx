import Editor from '@monaco-editor/react';

const CodeEditorSection = ({ language, code, setCode }) => {
    const handleEditorWillMount = (monaco) => {
        monaco.editor.defineTheme('github-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1E1E1E',
                'editor.lineHighlightBackground': '#2d2d2d',
                'editorCursor.foreground': '#3b82f6',
                'editor.selectionBackground': '#3b82f633',
                'editor.inactiveSelectionBackground': '#3b82f611',
            }
        });
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] overflow-hidden">
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={language === 'c++' ? 'cpp' : language}
                    theme="github-dark"
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
