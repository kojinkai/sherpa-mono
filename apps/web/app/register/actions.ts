"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { RegisterActionState, registerFormSchema } from "./schema";

export async function register(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const form = Object.fromEntries(formData);

  const validationResult = registerFormSchema.safeParse(form);
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { email, password, ...rest } = form;

  const data = {
    email: email as string,
    password: password as string,
    options: {
      data: rest,
    },
  };

  const { error } = await supabase.auth.signUp(data);

  console.log("error from supabase: ", error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/register/check-email", "layout");
  redirect("/register/check-email");
}
