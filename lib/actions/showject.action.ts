"use server";
import { revalidatePath } from "next/cache";
import Showject from "../models/showject.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import User from "../models/user.model";
import Comment from "../models/comment.model";

interface Params {
  showjectId?: string;
  image: string;
  title: string;
  description: string;
  sourceCodeUrl: string;
  liveUrl: string;
  authorId?: string;
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

export async function updateShowject({
  showjectId,
  image,
  title,
  description,
  sourceCodeUrl,
  liveUrl,
  path,
}: Params) {
  try {
    connectToDB();

    // Update showject's info to the DB
    await Showject.findByIdAndUpdate(showjectId, {
      title: title,
      showjectImg: image,
      description: description,
      sourceCodeUrl: sourceCodeUrl,
      liveUrl: liveUrl,
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
        path: "author",
        model: User,
        select: "_id id name username image",
      })
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "author",
          model: User,
          select: `_id id name username image`,
        },
      });

    const showject = await showjectQuery.exec();

    return showject;
  } catch (error: any) {
    throw new Error(`Failed to fetch showject's info: ${error.message}`);
  }
}

export async function reactLoveShowject(
  userId: string,
  showjectId: string,
  reactLove: boolean,
  path: string
) {
  try {
    connectToDB();

    const showject = await Showject.findById(showjectId);

    if (reactLove) {
      showject.loveCount.push(userId);
    } else {
      const indexTemp = showject.loveCount.indexOf(userId);
      console.log(indexTemp);
      showject.loveCount.splice(indexTemp, 1);
    }

    await showject.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to react love: ${error.message}`);
  }
}

export async function deleteShowject(
  showjectId: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    await Showject.deleteOne({ _id: showjectId });

    await User.findByIdAndUpdate(userId, {
      $pull: {
        showjectsCollection: showjectId,
      },
    });

    console.log(`Delete successfully!`);

    // revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete showject: ${error.message}`);
  }
}
