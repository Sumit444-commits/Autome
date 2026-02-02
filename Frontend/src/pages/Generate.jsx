import {
  BadgeAlert,
  CloudDownload,
  Copy,
  FileSpreadsheet,
  Type,
  Image,
  ListChecks,
  Layers,
  FolderTree,
  Terminal,
  User,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReadmePanel from "../components/ReadmePanel";
import download from "downloadjs";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import api from "../configs/api";

const sections = [
  {
    name: "Header",
    icon: Type,
    desc: "Project title, description, and status badges.",
  },
  {
    name: "App Preview",
    icon: Image,
    desc: "Visual screenshots or GIFs of your running application.",
  },
  {
    name: "Key Features",
    icon: ListChecks,
    desc: "Highlighting the core functionality and value of the code.",
  },
  {
    name: "Technology Stack",
    icon: Layers,
    desc: "Automatically detected libraries and frameworks.",
  },
  {
    name: "Directory Structure",
    icon: FolderTree,
    desc: "A tree-view visualization of your project's folders.",
  },
  {
    name: "Getting Started",
    icon: Terminal,
    desc: "Installation steps and local development commands.",
  },
  {
    name: "Author",
    icon: User,
    desc: "Your GitHub profile link and contact information.",
  },
];
const githubRegex =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/([\w-]+)\/([\w.-]+)(?:\/tree\/([\w.-]+))?\/?$/;

const Generate = () => {
  const { id } = useParams();
  const [repoURL, setRepoURL] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [mode, setMode] = useState("Preview");
  const { repoInfo, fetchRepoInfo, generateReadme } = useStore();
  const [repoHeader, setRepoHeader] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setIsGenerating] = useState(false);
  const [update, setUpdate] = useState(false);
  const { isLoggedIn, isAuthLoading } = useAuth();

  const navigate = useNavigate();

  const [source, setSource] = useState("");

  const handleAvailbility = async () => {
    if (repoURL === "") {
      toast.error("Insert URL!");
      return;
    }
    if (!githubRegex.test(repoURL)) {
      toast.error("Check The repo format!");
      return;
    }
    setLoading(true);
    fetchRepoInfo(repoURL);
    setLoading(false);
  };

  const handleEdit = (value) => {
    setSource(value);
    setUpdate(true);
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
  const handleGenerate = async () => {
    try {
      if (repoHeader) {
        setSource("");
        setIsGenerating(true);
        const data = await generateReadme(repoHeader);
        if (data.generated) {
          toast.success(data.message);
          navigate(`/generate/${data.id}`);
        } else {
          toast.error("Something went wrong...");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleUpdate = useCallback(async () => {
    try {
      const response = await api.put(`/api/user/readme/edit/${id}`, {
        content: { source },
      });
      setUpdate(false);
      setMode("Preview");
      toast.success("Saved successfully!");
    } catch (err) {
      console.error("Update failed", err);
    }
  }, [id, source]); // Add dependencies as needed
  useEffect(() => {
    if (id) {
      if (isAuthLoading) return;
      if (!isLoggedIn) {
        navigate("/auth?page=login");
        return;
      }
      const fetchReadmes = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/api/user/readme/${id}`);

          setRepoURL(response.data.readme.url);
          setSource(response.data.readme.content || "");
          setRepoHeader({
            url: response.data.readme.url,
            owner: response.data.readme.owner,
            repo: response.data.readme.repo,
            description: response.data.readme.description,
            branch: response.data.readme.branch,
            homepage: response.data.readme.homepage,
            license: response.data.readme.license,
          });
          setIsAvailable(true);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchReadmes();
    } else {
      setRepoURL("");
      setSource("");
      setRepoHeader(null);
      setIsAvailable(false);
    }
  }, [id, navigate, isAuthLoading, isLoggedIn]);

  useEffect(() => {
    if (repoInfo) {
      console.log(repoInfo);
      setRepoHeader(repoInfo);
      setIsAvailable(true);
    } else {
      setRepoHeader(null);
      setIsAvailable(false);
    }
  }, [repoInfo]);

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
                      onClick={() => {
                        {
                          !isLoggedIn
                            ? navigate("/auth?page=login")
                            : handleAvailbility();
                        }
                      }}
                      disabled={(id && true) || loading || generating}
                      className={`text-center w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-zinc-700 transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {id ? (
                        "Disabled"
                      ) : (
                        <>
                          {!isLoggedIn ? (
                            "Login to use"
                          ) : (
                            <>
                              {loading ? "Checking..." : "Check Availability"}
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* If repo avialable state */}
              {isAvailable && isLoggedIn && (
                <div className="space-y-6 mt-6">
                  <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                    {/* Repo Description */}
                    <div className="">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-100 mb-1">
                          {repoHeader?.repo}
                        </h2>
                        <div className="bg-indigo-700/10 rounded-full text-indigo-700 px-2">
                          {repoHeader?.branch}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400">
                        {repoHeader?.description
                          ? repoHeader?.description
                          : "No description"}
                      </p>
                    </div>
                    <div className="bg-white/8 w-full h-[1px]" />
                    {/* Customization */}
                    <div>
                      <h3 className="text-lg mb-4">Sections Includes</h3>
                      <div className="flex flex-wrap gap-3">
                        {sections.map((section, index) => {
                          const Icon = section.icon; // Assign component to a variable
                          return (
                            <div
                              key={index}
                              className="group relative flex items-center gap-2 rounded-lg bg-indigo-600/10 px-3 py-1.5 text-[12px] font-medium text-indigo-300 border border-indigo-500/20 transition-all hover:bg-indigo-600/25 hover:border-indigo-500/50 cursor-help"
                            >
                              {/* Dynamic Icon Rendering */}
                              <Icon
                                size={14}
                                className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                              />

                              <span>{section.name}</span>

                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 scale-0 rounded-md bg-zinc-900 p-2 text-[11px] text-zinc-400 border border-zinc-800 shadow-2xl transition-all duration-200 group-hover:scale-100 z-50 pointer-events-none">
                                <p className="leading-tight">{section.desc}</p>
                                <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-zinc-900"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-white/8 w-full h-[1px]" />
                    <p className="flex justify-between items-center bg-zinc-400/20 py-2 px-2 rounded-lg">
                      Customization & Styling{" "}
                      <span className="bg-indigo-600/40 text-indigo-600 px-2 py-1 rounded-full">
                        Coming soon
                      </span>
                    </p>
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
                  disabled={
                    (id && !update) || !isAvailable || !isLoggedIn || generating
                  }
                  onClick={() => {
                    if (id) {
                      handleUpdate();
                    } else {
                      handleGenerate(repoHeader);
                    }
                  }}
                  className={`flex gap-3 bg-indigo-600 py-3 items-center justify-center rounded-xl px-6 hover:bg-indigo-700 transition-all duration-200 w-full md:w-auto shadow-lg shadow-indigo-500/20 disabled:shadow-none group disabled:bg-zinc-700`}
                >
                  <FileSpreadsheet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-md font-bold text-white">
                    {id ? (
                      !update ? (
                        "Save"
                      ) : (
                        "Save Changes"
                      )
                    ) : (
                      <>{generating ? "Generating..." : "Generate README"}</>
                    )}
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
                generating={generating}
              />
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Generate;
