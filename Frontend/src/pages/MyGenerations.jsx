import { useState, useMemo, useEffect } from "react";
import {
  Github,
  FileText,
  ArrowRight,
  Shield,
  Search,
  PlusCircle,
  Ghost,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import api from "../configs/api";
import { useAuth } from "../hooks/useAuth";

const MyGenerations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [readmes, setReadmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, isAuthLoading } = useAuth();

  // Fetch logic stays the same...
  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn) {
      navigate("/auth?page=login");
      return;
    }
    const fetchReadmes = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/user/readmes`);
        setReadmes(response.data.userReadmes || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReadmes();
  }, [isLoggedIn, isAuthLoading, navigate]);

 const handleDelete = async (e, id) => {
  e.stopPropagation(); // Stop navigation to detail page
  
  if (window.confirm("Move this generation to trash?")) {
    try {
      // Use your 'api' axios instance which has the base URL
      await api.delete(`/api/user/readme/delete/${id}`);
      
      // Update UI by removing the item from local state
      setReadmes((prev) => prev.filter((readme) => readme._id !== id));
      
      // Optional: Add a toast notification here
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete. Please try again.");
    }
  }
};

  const filteredReadmes = useMemo(() => {
    return readmes?.filter(
      (readme) =>
        readme.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        readme.owner.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [readmes, searchQuery]);

  if (isAuthLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <SectionTitle
        title="My Library"
        description="Your AI-curated repository documentation."
      />

      <section className="relative max-w-7xl mx-auto px-8 md:px-16 mt-12 pb-24">
        {readmes.length > 0 && (
          <div className="flex justify-end mb-10">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repository..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>
        )}

        {readmes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-white/10 rounded-[2rem] text-center">
            <PlusCircle className="text-indigo-400 w-12 h-12 mb-4 opacity-50" />
            <p className="text-gray-400 mb-6">No generations found.</p>
            <button
              onClick={() => navigate("/")}
              className="text-indigo-400 hover:underline"
            >
              Create your first README
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReadmes.map((readme) => (
              <div
                key={readme._id}
                onClick={() => navigate(`/generate/${readme._id}`)}
                className="group relative flex flex-col bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-sm"
              >
                {/* Header: Title and Delete */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <FileText
                      size={20}
                      className="text-indigo-400"
                      title="README File"
                    />
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, readme._id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete Generation"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Body: Text Content */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-1 truncate leading-tight">
                    {readme.repo.replace(/-/g, " ")}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                    <Github size={12} title="Repository Owner" /> {readme.owner}
                  </p>
                </div>

                {/* Footer: Metadata and Actions */}
                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-400/5 px-2 py-0.5 rounded border border-indigo-400/10 uppercase tracking-wider"
                      title="Branch"
                    >
                      {readme.branch}
                    </div>
                    {readme.license && (
                      <div
                        className="text-[10px] text-gray-500 flex items-center gap-1 uppercase"
                        title="License Type"
                      >
                        <Shield size={10} />{" "}
                        {readme.license.spdx_id || readme.license || "License"}
                      </div>
                    )}
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyGenerations;
