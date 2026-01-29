import geminiAi from "../config/ai-config.js";
import octokit from "../config/octokit-config.js";
import { prompt } from "../utils/prompt.js";

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
      /\.(png|jpg|jpeg|avif|gif|svg|ico|pdf|docx|zip|tar|gz|mp4|env|ds_store|md)$/i;
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

    const cleanedPaths = allPaths.filter((path) => {
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
    });

    const importantFiles = cleanedPaths.filter((path) => {
      const fileName = path.split("/").pop().toLowerCase();
      return (
        fileName === "package.json" ||
        fileName === "requirements.txt" ||
        fileName === "pyproject.toml" ||
        fileName === "manage.py" ||
        fileName === "settings.py" ||
        fileName === "dockerfile" ||
        fileName === "go.mod" ||
        fileName === "index.html" ||
        // Pattern matches for entry points (using .test for precision)
        /^app\.(js|jsx|ts|tsx|py)$/i.test(fileName) ||
        /^main\.(js|jsx|ts|tsx|py)$/i.test(fileName)
      );
    });
    let readedFilesText = "";
    for (const file of importantFiles) {
      const content = await readFile(repoInfo.owner, repoInfo.repo, file);
      const fileText = Buffer.from(content, "base64").toString("UTF-8");
      readedFilesText += "{File Path: " + file + ", Data: " + fileText + "},";
    }

    const result = await generateCode(
      repoInfo,
      cleanedPaths.toString(),
      readedFilesText.toString(),
    );

    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// *****************************************
//            read files
// *****************************************
export const readFile = async (owner, repo, path) => {
  try {
    const { data: content } = await octokit.rest.repos.getContent({
      owner: owner,
      repo: repo,
      path: path,
    });
    return content.content;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// *****************************************
//            Generate Readme Code
// *****************************************

export const generateCode = async (repoInfo, cleanedPaths, readedFilesText) => {
  try {
    const ai_prompt = prompt
      .replace("\${JSON.stringify(repoInfo)}", JSON.stringify(repoInfo))
      .replace("\${JSON.stringify(cleanedPaths)}", JSON.stringify(cleanedPaths))
      .replace(
        "\${JSON.stringify(readedFilesText)}",
        JSON.stringify(readedFilesText),
      )
      .replace("\${repoInfo.owner}", JSON.stringify(repoInfo.owner));

    const response = await geminiAi.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: ai_prompt,
    });
    return response.text;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
