"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgSpinner } from "react-icons/cg";
import { useState, memo } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CommentValidation } from "@/lib/validations/showject";
import { Textarea } from "../ui/textarea";
import { BiSolidSend } from "react-icons/bi";
import { addCommentToShowject } from "@/lib/actions/comment.action";

interface Props {
  showjectId: string;
  currentUserImg: string;
  currentUserId: string;
  commentUnderShowject: boolean;
}

const Comment = ({
  showjectId,
  currentUserImg,
  currentUserId,
  commentUnderShowject,
}: Props) => {
  const pathname = usePathname();
  const [loadSpin, setLoadSpin] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoadSpin(true);

    await addCommentToShowject({
      text: values.comment,
      showjectId: showjectId,
      authorId: currentUserId,
      parentId: "",
      commentToShowject: commentUnderShowject,
      path: pathname,
    });

    setLoadSpin(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-2">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex flex-1 gap-2 items-center">
              <FormLabel className="">
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={50}
                  height={50}
                  className="hidden sm:flex max-w-[44px] max-h-[44px] rounded-full object-cover border"
                />
              </FormLabel>

              <div className="flex-1 flex border pb-2 pr-2 rounded-md items-end">
                <div className="flex-1 ">
                  <FormControl>
                    <Textarea
                      rows={1}
                      className="bg-transparent relative resize-none border-none no-focus"
                      placeholder="Comment..."
                      {...field}></Textarea>
                  </FormControl>
                  <FormMessage className="pl-2 pt-1" />
                </div>

                {!loadSpin && (
                  <Button
                    type="submit"
                    className="flex items-center gap-1 bg-accent-1 text-light-1 hover:bg-accent-1_hover px-4 py-2">
                    Send <BiSolidSend size={24} />
                  </Button>
                )}

                {loadSpin && (
                  <Button
                    disabled
                    className="flex items-center gap-1 bg-accent-1_hover cursor-default text-light-1 hover:bg-accent-1_hover px-4 py-2">
                    Send <CgSpinner size={22} className="animate-spin" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Comment;
