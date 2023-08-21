"use server";
import { revalidatePath } from "next/cache";
import Showject from "../models/showject.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import User from "../models/user.model";
import Comment from "../models/comment.model";

interface Params {
  image: string;
  title: string;
  description: string;
  sourceCodeUrl: string;
  liveUrl: string;
  authorId: string;
  path: string;
}

export async function createShowject({
  image,
  title,
  description,
  sourceCodeUrl,
  liveUrl,
  authorId,
  path,
}: Params) {
  try {
    connectToDB();

    // Create new showject to the DB
    const createdShowject = await Showject.create({
      showjectImg: image,
      title,
      description,
      author: authorId,
      sourceCodeUrl,
      liveUrl,
    });

    // Update user's showject collection to the DB
    await User.findByIdAndUpdate(authorId, {
      $push: {
        showjectsCollection: createdShowject._id,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create showject: ${error.message}`);
  }
}

export async function fetchShowjects() {
  try {
    connectToDB();

    const showjectsQuery = Showject.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "author", model: User });

    const showjects = await showjectsQuery.exec();

    return showjects;
  } catch (error: any) {
    throw new Error(`Failed to fetch showjects: ${error.message}`);
  }
}

export async function fetchShowjectInfo(showjectId: string) {
  try {
    connectToDB();

    const showjectQuery = Showject.findById(showjectId)
      .populate({
        path: "loveCount",
        model: User,
        select: "_id id name username image",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id id name username image",
      })
      .populate({
        path: "comments",
        model: Comment,
        select: "_id id name username image",
      });

    const showject = await showjectQuery.exec();

    return showject;
  } catch (error: any) {
    throw new Error(`Failed to fetch showject's info: ${error.message}`);
  }
}
