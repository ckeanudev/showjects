import * as z from "zod";

export const ShowjectValidation = z.object({
  showject_photo: z.string().url().nonempty(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  sourceCodeUrl: z.string().url().nonempty(),
  liveUrl: z.string().url().optional().or(z.literal("")),
});

export const CommentValidation = z.object({
  comment: z.string().nonempty().min(3),
});
