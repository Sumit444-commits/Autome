export const prompt = `
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