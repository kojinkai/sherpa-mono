"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginActionState, loginFormSchema } from "./schema";

export async function login(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const form = Object.fromEntries(formData);

  const validationResult = loginFormSchema.safeParse(form);
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
