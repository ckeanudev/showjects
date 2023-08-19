import * as z from "zod";

export const ShowjectValidation = z.object({
  showject_photo: z.string().url().nonempty(),
  title: z.string().nonempty(),
  description: z.string().optional(),
  sourceCodeUrl: z.string().url().nonempty(),
  liveUrl: z.string().url().optional().or(z.literal("")),
});
