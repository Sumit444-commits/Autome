import geminiAi from "../config/ai-config.js";
import octokit from "../config/octokit-config.js";

const prompt = `
Act as a Principal Technical Architect and Expert Documentation Engineer. Your mission is to generate a comprehensive, high-fidelity README.md for the project described in the JSON data below.

### 🧩 INPUT DATA CONTEXT
Repository Info: \${JSON.stringify(repoInfo)}
File Structure: \${JSON.stringify(cleanedPaths)}
Source Code Snippets: \${JSON.stringify(readedFilesText)}

### 🛠 PHASE 1: ARCHITECTURAL DISCOVERY (INTERNAL ANALYSIS)
Before writing, analyze the input to resolve the following challenges:
1. **Identify Project Identity:**
   - **Title:** Search 'readedFilesText' for a <title> tag in HTML or 'name' in configuration files (package.json, go.mod, etc.). If 'repoInfo.repo' is generic (e.g., "my-project"), prioritize the code-defined name.
   - **Tagline:** Differentiate between a null/generic description and the actual logic. If 'repoInfo.description' is insufficient, deduce the purpose by analyzing imports (e.g., if you see 'tensorflow', it is a Machine Learning project; if 'express', it is a Web Server).
2. **Detect Ecosystem:** Determine if the project is MERN, Python (Django/Flask), Go, Rust, or other based on the presence of "DNA" files like 'requirements.txt' or 'Cargo.toml'.

### 📝 PHASE 2: README CONTENT REQUIREMENTS
Generate the Markdown output following this exact structure:

1. **Header Section:**
   - Display a clean, centered-style header with the Title and a sophisticated Value Proposition.
   - Include dynamic placeholders for GitHub badges (License, Build, Stars).
   - If 'repoInfo.homepage' exists, include a "Live Demo" link.

2. **🖼️ App Preview:**
   - Provide a dedicated section for visual previews.
   - Insert a Markdown image placeholder: "![App Preview](path/to/your/screenshot.png)".
   - Add a brief instruction note in HTML comments: "".

3. **🚀 Key Features (Evidence-Based):**
   - List 5-7 core features based ONLY on discovered logic.
   - If 'socket.io' is found: "Real-time Bidirectional Communication".
   - If 'stripe' or 'paypal' is found: "Integrated Secure Payment Gateway".
   - If 'i18next' or 'gettext' is found: "Internationalization & Multi-language Support".

4. **🛠 Technology Stack:**
   - Create a categorized table (Frontend, Backend, Database, DevOps).
   - Use the specific versions found in the dependency files for maximum accuracy.

5. **📂 Directory Structure:**
   - Generate a clean ASCII tree representation of 'cleanedPaths'.
   - Annotate key folders with a brief description of their architectural role (e.g., "/controllers: Handles business logic").

6. **⚙️ Getting Started:**
   - Provide precise, stack-specific installation and environment setup commands.
   - List every Environment Variable key found in 'app.js', 'main.py', or '.env.example'. Do NOT include the actual values.

7. **👤 Author:**
   - Create a professional "Author" or "Created By" section.
   - Use the 'owner' field (\${repoInfo.owner}) to credit the creator.
   - Include a link to the user's GitHub profile: "https://github.com/\${repoInfo.owner}".
   - Add placeholders for other social links (LinkedIn, Portfolio) to encourage professional networking.

### 🎨 TONE & FORMATTING RULES
- **Tone:** Professional, objective, and "Developer-First."
- **Formatting:** Use GitHub Flavored Markdown (GFM). Ensure high readability with clear headers, bold text for emphasis, and horizontal rules between sections.
- **Constraints:** Output ONLY the Markdown content. Do not include conversational filler.

---
**Begin README Generation:**
`;

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

    // bytez model
    // const { error, output } = await bytezModel.run(
    //   [
    //     {
    //       role: "user",
    //       content: ai_prompt,
    //     },
    //   ],
    //   {
    //     max_new_tokens: 2048, // Ensure it doesn't cut off early
    //     temperature: 0.5,
    //   },
    // );

    // if (error) {
    //   console.log(error);
    //   // return res
    //   //   .status(400)
    //   //   .json({ message: "Failed to generate", error: error });
    // } else {
    //   return output;
    // }

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
