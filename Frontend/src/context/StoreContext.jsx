import { createContext, useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";

const StoreContext = createContext({
  repoInfo: null,
  setRepoInfo: () => {},
  fetchRepoInfo: () => {},
});

const StoreProvider = ({ children }) => {
  const [repoInfo, setRepoInfo] = useState(null);

  const fetchRepoInfo = async (url) => {
    try {
      const { data } = await api.post("/api/github/info", { url });
      if (data.repoInfo) {
        setRepoInfo(data.repoInfo);
        toast.success("Repository Found!");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Repository not found";
      toast.error(message);
      console.error(error);
    } 
  };

  const generateReadme = async (repoInfo) => {
    try {
      const { data } = await api.post("/api/github/generate", { repoInfo });    
      if (data) {
        toast.success("code generated");
        return data
      }
    } catch (error) {
      const message = error.response?.data?.message || "Repository not found";
      toast.error(message);
      console.error(error);
    } 
  };

  

  const value = {
    repoInfo,
    setRepoInfo,
    fetchRepoInfo,
   generateReadme
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
