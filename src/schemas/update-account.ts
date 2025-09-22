import * as z from "zod";

export const UpdateAccountSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  name: z.string().min(2, "Name should be at least 2 characters.").max(50),
  phone: z.string().max(25).optional(),
  address: z.string().max(100).optional(),
});

export type UpdateAccountData = z.infer<typeof UpdateAccountSchema>;
