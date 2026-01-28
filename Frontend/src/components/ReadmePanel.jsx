// import { FileText, PencilOff } from "lucide-react";
// import React from "react";
// import EditReadme from "./EditReadme";
// import PreviewReadme from "./PreviewReadme";

// const ReadmePanel = ({ mode, source, handleEdit }) => {
//   return (
//  <>

//     <div className="w-full bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-10 min-h-[400px]">

//       {source === "" && (
//         <>
//           {/* Centered Empty State Container */}
//           <div className="flex flex-col items-center justify-center h-full min-h-[320px]">
//             {/* Icon Container - Fixed height/width for perfect circle */}
//             <div className="w-14 h-14 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 text-zinc-500 border border-white/5">
//               {mode === "Preview" ? (
//                 <FileText size={26} strokeWidth={1.5} />
//               ) : (
//                 <PencilOff size={26} strokeWidth={1.5} />
//               )}
//             </div>

//             {/* Dynamic Text */}
//             <p className="text-zinc-500 max-w-[280px] text-center leading-relaxed text-sm">
//               {mode === "Preview"
//                 ? "No preview available yet. Enter a GitHub URL to generate your documentation."
//                 : "The editor will appear here once your README is generated."}
//             </p>
//           </div>
//         </>
//       )}
//       {source !== "" && (
//         <>
//           {mode !== "Preview" ? (
//             <EditReadme source={source} handleEdit={handleEdit}/>
//           ) : (
//             <PreviewReadme source={source} />
//           )}
//         </>
//       )}
//     </div>

//     </>
//   );
// };

// export default ReadmePanel;

import { FileText, PencilOff, Sparkles } from "lucide-react";
import React from "react";
import EditReadme from "./EditReadme";
import PreviewReadme from "./PreviewReadme";

const ReadmePanel = ({ mode, source, handleEdit, generating }) => {
  return (
    /* flex flex-col ensures that children can grow to fill the height */
    <div className="w-full bg-zinc-900/40 border border-zinc-700/50 rounded-xl min-h-[500px] flex flex-col overflow-hidden">
      {/* 1. Empty State: Shown only when source is empty */}
      {source === "" && !generating && (
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="w-14 h-14 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 text-zinc-500 border border-white/5">
            {mode === "Preview" ? (
              <FileText size={26} strokeWidth={1.5} />
            ) : (
              <PencilOff size={26} strokeWidth={1.5} />
            )}
          </div>

          <p className="text-zinc-500 max-w-[280px] text-center leading-relaxed text-sm">
            {mode === "Preview"
              ? "No preview available yet. Enter a GitHub URL to generate your documentation."
              : "The editor will appear here once your README is generated."}
          </p>
        </div>
      )}

     {generating && (
  <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-6">
    <div className="relative">
      {/* Uses the custom slow spin defined in @theme */}
      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 animate-pulse">
        <Sparkles className="text-blue-400 animate-spin-slow" size={32} />
      </div>
      <div className="absolute inset-0 border-2 border-blue-500/5 rounded-full scale-125 animate-ping opacity-20" />
    </div>

    <div className="text-center space-y-2">
      <h3 className="text-zinc-200 font-medium">Analyzing Repository DNA...</h3>
      <p className="text-zinc-500 max-w-[320px] leading-relaxed text-sm">
        Gemini is reading your <span className="text-blue-400/80">package.json</span> to build the perfect README.
      </p>
    </div>

    {/* The Shimmer Progress Bar */}
    <div className="w-full max-w-xs h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full animate-loader-slide" />
    </div>
  </div>
)}
      {/* 2. Content State: Shown when source has data */}
      {source !== "" && (
        <div className="flex-1 w-full h-full">
          {mode === "Edit" ? (
            <EditReadme source={source} handleEdit={handleEdit} />
          ) : (
            <PreviewReadme source={source} />
          )}
        </div>
      )}
    </div>
  );
};

export default ReadmePanel;
