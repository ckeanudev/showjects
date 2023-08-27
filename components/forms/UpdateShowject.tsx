"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, memo } from "react";
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
import { ShowjectValidation } from "@/lib/validations/showject";
import { updateShowject } from "@/lib/actions/showject.action";

interface Props {
  _id: string;
  title: string;
  showjectImg: string;
  description: string;
  sourceCodeUrl: string;
  liveUrl: string;
}

const UpdateShowject = ({
  _id,
  title,
  showjectImg,
  description,
  sourceCodeUrl,
  liveUrl,
}: Props) => {
  const [loadSpin, setLoadSpin] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ShowjectValidation),
    defaultValues: {
      showject_photo: showjectImg || "",
      title: title || "",
      description: description || "",
      sourceCodeUrl: sourceCodeUrl || "",
      liveUrl: liveUrl || "",
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

  const onSubmit = async (values: z.infer<typeof ShowjectValidation>) => {
    setLoadSpin(true);

    const blob = values.showject_photo;

    const imgRes = await startUpload(files);

    if (imgRes && imgRes[0].fileUrl) {
      values.showject_photo = imgRes[0].fileUrl;
    }

    console.log({
      image: values.showject_photo,
      title: values.title,
      description: values.description || "",
      sourceCodeUrl: values.sourceCodeUrl,
      liveUrl: values.liveUrl || "",
      path: pathname,
    });

    // TODO: Update showject
    await updateShowject({
      showjectId: _id,
      image: values.showject_photo,
      title: values.title,
      description: values.description || "",
      sourceCodeUrl: values.sourceCodeUrl,
      liveUrl: values.liveUrl || "",
      path: pathname,
    });

    router.push(`/showject/${_id}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="showject_photo"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={800}
                    height={800}
                    priority
                    className="object-contain object-center w-full max-h-[400px] p-3 rounded-lg bg-light-3 cursor-pointer"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-[400px] p-3 rounded-lg bg-light-3">
                    <p className="text-lg text-dark-2">Click to Add Photo</p>
                  </div>
                )}
              </FormLabel>
              <FormControl className="">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="bg-transparent border-none "
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- TITLE ----------- */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Showject Title
              </FormLabel>
              <FormControl>
                <Input type="text" className="no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- DESCRIPTION ----------- */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Showject Description
              </FormLabel>
              <FormControl>
                <Textarea rows={10} className="no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- Source Code URL ----------- */}
        <FormField
          control={form.control}
          name="sourceCodeUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Source Code URL
              </FormLabel>
              <FormControl>
                <Input type="text" className="no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------- Live URL ----------- */}
        <FormField
          control={form.control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium text-dark-4">
                Live URL
              </FormLabel>
              <FormControl>
                <Input type="text" className="no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!loadSpin && (
          <Button
            type="submit"
            className="bg-accent-1 hover:bg-accent-1_hover flex gap-2 items-center text-light-1 font-medium text-base p-6 mt-5">
            Save My Showject Info
          </Button>
        )}

        {loadSpin && (
          <Button
            disabled
            className="bg-accent-1_hover hover:bg-accent-1_hover flex gap-2 items-center text-light-1 font-medium text-base p-6 mt-5 cursor-default">
            <CgSpinner size={22} className="animate-spin" />
            Save My Showject Info
          </Button>
        )}
      </form>
    </Form>
  );
};

export default memo(UpdateShowject);
