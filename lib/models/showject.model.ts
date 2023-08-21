import mongoose from "mongoose";

const showjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  showjectImg: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sourceCodeUrl: { type: String, required: true },
  liveUrl: String,
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  loveCount: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Showject =
  mongoose.models.Showject || mongoose.model("Showject", showjectSchema);

export default Showject;
