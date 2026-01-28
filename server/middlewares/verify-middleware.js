// *****************************************
//            verify Github URL
// *****************************************
export const verifyMiddleware = async (req, res, next) => {
  try {
    const { url } = req.body;
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(regex);
    if (match) {
      const owner = match[1];
      const repo = match[2].replace(".git", "");
      req.owner = owner;
      req.repo = repo;
      req.url = url;
    } else {
      return res.status(400).json({ message: "Give url is incorrect" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
};
