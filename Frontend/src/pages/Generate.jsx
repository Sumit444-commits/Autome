import { CloudDownload, Copy, FileSpreadsheet } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReadmePanel from "../components/ReadmePanel";
import download from "downloadjs";

const Generate = () => {
  const githubRegex =
    /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w.-]+(?:\.git)?\/?$/;
  const [repoURL, setRepoURL] = useState("");
  const [isAvailable, setisAvailable] = useState(false);
  const [mode, setMode] = useState("Preview");

  const [repoOwn, setRepoOwn] = useState({
    owner: "sumit444-commits",
    repo: "ai-code-reviewer",
    description: "hey this is for test",
  });
  const [source, setSource] = useState(`
# 🚀 Autome | AI-Powered README Generator

[![Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://github.com/Sumit444-commits)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%20AI-orange.svg)](https://gemini.google.com/)

**Autome** is a specialized engine designed to bridge the gap between complex codebases and professional documentation. Built as a **MERN stack** application, it analyzes your repositories to generate structured READMEs in seconds.

## 🛠 Features
- **Intelligent Analysis:** Deep-dives into project directory structures.
- **Markdown Export:** Generate production-ready .md files.
- **AI Synthesis:** Leverages Google's Gemini AI for context-aware writing.

## 💻 Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | React & Tailwind CSS |
| **Backend** | Node.js & Express |
| **Database** | MongoDB |
| **AI Engine** | Google Gemini |

## 📦 Installation
\`\`\`bash
git clone https://github.com/Sumit444-commits/autome.git
cd autome
npm install
\`\`\`

---
*Developed by **Sumit Sharma** at Mehran University of Engineering and Technology.*
`);

  const handleAvailbility = async () => {
    if (repoURL === "") {
      toast.error("Insert URL!");
      return;
    }
    if (!githubRegex.test(repoURL)) {
      toast.error("Check The repo format!");
      return;
    }
    console.log(repoURL);
    setisAvailable(true);
  };

  const handleEdit = (value) => {
    setSource(value);
  };
  const handleCopy = () => {
    if (source === "") {
      return;
    }
    navigator.clipboard
      .writeText(source)
      .then(() => toast.success("code copied Succesfully!"))
      .catch((err) => toast.error("Failed to copy!"));
  };
  const handleDownload = () => {
    if (source === "") {
      return;
    }
    download(source, "readme.md", "text/markdown");
  };
  return (
    <>
      <section className=" md:px-16  pt-24 min-h-screen">
        <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left panel */}
            <div>
              {/* URL INPUT State */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100 mb-1">
                      Generate Your Readme
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Paste your GitHub URL and let Autome build professional
                      documentation in seconds.
                    </p>
                  </div>
                  <div className="space-y-5">
                    {/* URL INPUT */}
                    <label className="block text-sm font-medium">
                      Repository URL
                    </label>
                    <input
                      type="text"
                      value={repoURL}
                      onChange={(e) => setRepoURL(e.target.value)}
                      required
                      placeholder="e.g., https://github.com/Sumit444-commits/ai-code-reviewer"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleAvailbility}
                      className="text-center w-full bg-indigo-600 py-2 rounded-lg  hover:bg-indigo-700 transition-all duration-200"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
              {/* If repo avialable state */}
              {isAvailable && (
                <div className="space-y-6 mt-6">
                  <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                    {/* Repo Description */}
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-zinc-100 mb-1">
                        {repoOwn.repo}
                      </h2>
                      <p className="text-sm text-zinc-400">
                        {repoOwn.description !== ""
                          ? repoOwn.description
                          : "No description"}
                      </p>
                    </div>
                    <div className="bg-white/8 w-full h-[1px]" />
                    {/* Customization */}
                  </div>
                </div>
              )}
            </div>

            {/* Right panel */}
            <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
              <div
                className={`flex items-center justify-between gap-6 md:flex-row flex-col`}
              >
                <button
                  disabled={!isAvailable}
                  className={`flex gap-3 bg-indigo-600 py-3 items-center justify-center rounded-xl px-6 hover:bg-indigo-700 transition-all duration-200 w-full md:w-auto ${isAvailable && "shadow-lg"} shadow-indigo-500/20 group ${!isAvailable && "disabled:bg-zinc-700"}`}
                >
                  <FileSpreadsheet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-md font-bold text-white">
                    Generate README
                  </span>
                </button>

                {/* Copy & Download Group */}
                <div className="flex gap-4 w-full md:w-auto">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 text-zinc-300 rounded-xl active:scale-95 transition-all text-sm h-12 px-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <Copy size={18} />
                    <span>Copy</span>
                  </button>

                  {/* Download Button */}
                  <button
                  onClick={handleDownload}
                    type="button"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 text-zinc-300 rounded-xl active:scale-95 transition-all text-sm h-12 px-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <CloudDownload size={18} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="bg-zinc-800 w-full h-10 rounded-xl grid grid-cols-2 text-center items-center my-6 relative p-1 cursor-pointer select-none">
                {/* The Sliding Background */}
                <div
                  className={`absolute w-[calc(50%-4px)] h-[calc(100%-8px)] transition-all duration-300 ease-in-out bg-zinc-600 rounded-lg shadow-sm ${
                    mode === "Preview"
                      ? "translate-x-1"
                      : "translate-x-[calc(100%+3px)]"
                  }`}
                />

                {/* Button 1 */}
                <div
                  onClick={() => setMode("Preview")}
                  className={`relative z-10 py-1 text-sm font-medium transition-colors ${mode === "Preview" ? "text-white" : "text-zinc-400"}`}
                >
                  Preview
                </div>

                {/* Button 2 */}
                <div
                  onClick={() => setMode("Edit")}
                  className={`relative z-10 py-1 text-sm font-medium transition-colors ${mode === "Edit" ? "text-white" : "text-zinc-400"}`}
                >
                  Edit
                </div>
              </div>

              {/* Panel for Edit and Preview */}

              <ReadmePanel
                mode={mode}
                source={source}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Generate;
