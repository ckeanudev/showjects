"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  job: string;
  personalWebsite: string;
  github: string;
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
  path: string;
}

// --------- Create or Update user info --------- //
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  job,
  personalWebsite,
  github,
  linkedIn,
  facebook,
  twitter,
  instagram,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        job,
        personalWebsite,
        github,
        linkedIn,
        facebook,
        twitter,
        instagram,
        onboarded: true,
      },
      { upsert: true }
    ).then((res) => {
      console.log(`Creating/Updating user info successfully!`);
    });

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update User: ${error.message}`);
  }
}

// --------- Fetch user info --------- //
export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fecth user info: ${error.message}`);
  }
}