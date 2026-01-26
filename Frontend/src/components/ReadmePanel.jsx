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


import { FileText, PencilOff } from "lucide-react";
import React from "react";
import EditReadme from "./EditReadme";
import PreviewReadme from "./PreviewReadme";

const ReadmePanel = ({ mode, source, handleEdit }) => {
  return (
    /* flex flex-col ensures that children can grow to fill the height */
    <div className="w-full bg-zinc-900/40 border border-zinc-700/50 rounded-xl min-h-[500px] flex flex-col overflow-hidden">
      
      {/* 1. Empty State: Shown only when source is empty */}
      {source === "" && (
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

      {/* 2. Content State: Shown when source has data */}
      {source !== "" && (
        <div className="flex-1 w-full h-full">
          {mode === "Edit" ? (
            <EditReadme source={source} handleEdit={handleEdit}/>
          ) : (
            <PreviewReadme source={source} />
          )}
        </div>
      )}
    </div>
  );
};

export default ReadmePanel;