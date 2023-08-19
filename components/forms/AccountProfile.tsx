"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { ChangeEvent, useState, memo } from "react";
import { isBase64Image } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { CgSpinner } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.actions";
import { error } from "console";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    image: string;
    job: string;
    location: string;
    personalWebsite: string;
    github: string;
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };

  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const [loadSpin, setLoadSpin] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",

      job: user?.job || "",
      location: user?.location || "",
      personalWebsite: user?.personalWebsite || "",
      github: user?.github || "",
      linkedIn: user?.linkedIn || "",
      facebook: user?.facebook || "",
      twitter: user?.twitter || "",
      instagram: user?.instagram || "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    setLoadSpin(true);

    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }

    // TODO: Create or Update user profile
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      email: values.email,
      bio: values.bio,
      image: values.profile_photo,
      job: values.job || "",
      location: values.location || "",
      personalWebsite: values.personalWebsite || "",
      github: values.github || "",
      linkedIn: values.linkedIn || "",
      facebook: values.facebook || "",
      twitter: values.twitter || "",
      instagram: values.instagram || "",
      path: pathname,
    });

    if (pathname === `/profile/edit`) {
      router.back();
    } else {
      router.push(`/home`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5">
        {/* ----------- PROFILE PHOTO ----------- */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover min-w-[74px] max-w-[74px] min-h-[74px] max-h-[74px]"
                  />
                ) : (
                  <Image
                    src="/images/profile.svg"
                    alt="profile photo"
                    width={80}
                    height={80}
                    priority
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="bg-transparent border-none"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- FULLNAME ----------- */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">Name</FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- USERNAME ----------- */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Username
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- BIO ----------- */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">Bio</FormLabel>
              <FormControl>
                <Textarea rows={10} className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- JOB ----------- */}
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">Job</FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- LOCATION ----------- */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Location
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- PERSONAL WEBSITE ----------- */}
        <FormField
          control={form.control}
          name="personalWebsite"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Personal Website/Portfolio
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- GITHUB LINK ----------- */}
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Github Link
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- LINKEDIN ----------- */}
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                LinkedIn Link
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- FACEBOOK ----------- */}
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Facebook Link
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- TWITTER ----------- */}
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Twitter Link
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- INSTAGRAM ----------- */}
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Instagram Link
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-accent-1 hover:bg-accent-1_hover flex gap-2 items-center text-light-1 font-medium text-base p-6 mt-5">
          {loadSpin && <CgSpinner size={22} className="animate-spin" />}
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default memo(AccountProfile);
