import mongoose from "mongoose";

const ReadmeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
// repoInfo data
    owner: { type: String, required: true },
    repo: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: null },
    homepage: { type: String, default: null },
    license: { type: mongoose.Schema.Types.Mixed, default: null },
    branch: { type: String, required: true, default: "main" },
    // markdown content
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ReadmeSchema.index({ userId: 1, url: 1 });
export const Readme = mongoose.model("Readme", ReadmeSchema);
