import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Should be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Should contain at least one letter." })
    .regex(/[0-9]/, { message: "Should contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Should contain at least one special character.",
    })
    .trim(),
});

export type LoginActionState = {
  form?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
};
