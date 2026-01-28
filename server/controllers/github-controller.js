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
    res.status(200).json({repoInfo});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
