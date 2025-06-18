import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Please enter a valid first name" })
    .max(15, { message: "Should be no more than 15 characters" })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Please enter a valid last name" })
    .max(15, { message: "Should be no more than 15 characters" })
    .trim(),
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

export type RegisterActionState = {
  form?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
};
