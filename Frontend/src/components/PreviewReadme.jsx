import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const PreviewReadme = ({ source }) => {
  return (
    /* Added max-height and custom scrollbar styling for a better dashboard feel */
    <div className="w-full h-full min-h-[400px] max-h-[600px] overflow-y-auto rounded-xl scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <MarkdownPreview
        source={source}
        className="p-8 leading-relaxed"
        style={{ 
          backgroundColor: "transparent",
          fontFamily: 'inherit' 
        }}
        wrapperElement={{ "data-color-mode": "dark" }}
      />
    </div>
  );
};

export default PreviewReadme;