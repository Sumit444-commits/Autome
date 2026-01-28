import octokit from "../config/octokit-config.js";

// *****************************************
//            fetch REPO info
// *****************************************
export const getRepoInfo = async (req, res) => {
  try {
    const { owner, repo, url } = req;

    const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
    const repoInfo = {
      url: url,
      owner: owner,
      repo: repoData.name,
      description: repoData.description,
      homepage: repoData.homepage,
      license: repoData.license,
      branch: repoData.default_branch,
    };
    res.status(200).json({ repoInfo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// *****************************************
//            Fetch Paths
// *****************************************
export const fetchTreeData = async (req, res) => {
  try {
    const { repoInfo } = req.body;

    const { data: treeData } = await octokit.rest.git.getTree({
      owner: repoInfo.owner,
      repo: repoInfo.repo,
      tree_sha: repoInfo.branch || "main",
      recursive: true,
    });

    const allPaths = treeData.tree.map((p) => p.path);

    // A more robust regex to catch common junk across all languages
    const universalIgnoreRegex =
      /\.(png|jpg|jpeg|gif|svg|ico|pdf|docx|zip|tar|gz|mp4|env|ds_store|md)$/i;
    const folderIgnoreList = [
      "node_modules", // Node.js / React / Next.js
      ".git", // Version control
      ".next", // Next.js build folder
      "build", // React build folder
      "dist", // Bundler output
      "__pycache__", // Python cached bytecode
      "venv", // Python virtual environments
      ".venv", // Python virtual environments
      "env", // Python environments
      ".expo", // React Native
      "target", // Rust/Java
      "vendor", // PHP/Go
    ];

    const pathString = allPaths
      .filter((path) => {
        const p = path.toLowerCase();
        const isInIgnoredFolder = folderIgnoreList.some((folder) =>
          p.includes(folder),
        );
        const isUnwantedExtension = universalIgnoreRegex.test(p);
        const isLockFile =
          p.endsWith("package-lock.json") ||
          p.endsWith("yarn.lock") ||
          p.endsWith("poetry.lock");
        return !isInIgnoredFolder && !isUnwantedExtension && !isLockFile;
      })
      .toString();

    res.status(200).json({ pathString });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
