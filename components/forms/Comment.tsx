"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  console.log(pathname);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToShowject({
      text: values.comment,
      showjectId: showjectId,
      authorId: currentUserId,
      parentId: "",
      commentToShowject: commentUnderShowject,
      path: pathname,
    });

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
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={1}
                  className="bg-transparent relative resize-none"
                  placeholder="Comment..."
                  {...field}></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-accent-1 text-light-1 hover:bg-accent-1_hover p-2">
          Send <BiSolidSend size={24} />
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
