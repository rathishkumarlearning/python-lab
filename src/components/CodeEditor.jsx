import Editor from '@monaco-editor/react'

export default function CodeEditor({ 
  code, 
  value,
  onChange, 
  readOnly = false,
  disabled = false,
  height = '100%',
}) {
  const handleEditorChange = (newValue) => {
    if (onChange) {
      onChange(newValue || '')
    }
  }

  const editorValue = value ?? code ?? ''

  return (
    <div className="h-full rounded-lg overflow-hidden border border-white/10">
      <Editor
        height={height}
        defaultLanguage="python"
        value={editorValue}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          readOnly: readOnly || disabled,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-white/50">
            Loading editor...
          </div>
        }
      />
    </div>
  )
}
