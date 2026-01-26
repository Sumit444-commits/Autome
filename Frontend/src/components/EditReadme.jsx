import React from "react";
import Editor from "@monaco-editor/react";

const EditReadme = ({ source, handleEdit }) => {
  return (
    /* Set a specific height or use h-full if the parent has a defined height */
    <div className="w-full h-[500px] border border-white/10 rounded-xl overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        theme="vs-dark"
        value={source}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: "on",
          padding: { top: 20 },
          automaticLayout: true, // This is crucial for tabs
        }}
        onMount={(editor, monaco) => {
          setTimeout(() => {
            editor.layout();
          }, 10);
        }}
        onChange={handleEdit}
      />
    </div>
  );
};

export default EditReadme;
