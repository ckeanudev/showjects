import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  description: String,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
