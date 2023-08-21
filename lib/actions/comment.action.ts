"use server";
import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import { connectToDB } from "../mongoose";
import Showject from "../models/showject.model";
import User from "../models/user.model";

interface Params {
  text: string;
  showjectId: string;
  authorId: string;
  parentId: string;
  commentToShowject: boolean;
  path: string;
}

export async function addCommentToShowject({
  text,
  showjectId,
  authorId,
  parentId,
  commentToShowject,
  path,
}: Params) {
  try {
    connectToDB();

    if (commentToShowject) {
      // If the comment is for the showject
      const createComment = await Comment.create({
        text,
        author: authorId,
        showProjectId: showjectId,
        parentId: "",
      });

      await Showject.findByIdAndUpdate(showjectId, {
        $push: {
          comments: createComment._id,
        },
      });
    } else {
      // If the comment is for another comment
      const createComment = await Comment.create({
        text,
        author: authorId,
        showProjectId: showjectId,
        parentId: parentId,
      });

      const savedCreateComment = await createComment.save();

      await Comment.findByIdAndUpdate(parentId, {
        $push: {
          children: savedCreateComment._id,
        },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment: ${error.message}`);
  }
}
