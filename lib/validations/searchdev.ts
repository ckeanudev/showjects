import * as z from "zod";

export const SearchDevValidation = z.object({
  username: z.string().nonempty(),
});
