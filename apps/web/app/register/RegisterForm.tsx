"use client";

import { AuthLayout } from "@/catalyst-components/auth-layout";
import { Button } from "@/catalyst-components/button";
import { Field, Label } from "@/catalyst-components/fieldset";
import { Heading } from "@/catalyst-components/heading";
import { Strong, Text, TextLink } from "@/catalyst-components/text";
import { ValidatedInput } from "@/catalyst-components/validated-input";
import Form from "next/form";
import { useActionState, useState } from "react";
import { register } from "./actions";
import { RegisterActionState, registerFormSchema } from "./schema";

const initialState: RegisterActionState = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = registerFormSchema.safeParse(data);
    if (!validationResult.success) {
      event.preventDefault();
    }
  };

  return (
    <AuthLayout>
      <Form
        onSubmit={handleSubmit}
        action={formAction}
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Heading>Create your account</Heading>
        <Field>
          <Label>First name</Label>
          <ValidatedInput
            type="text"
            name="firstName"
            wasSubmitted={wasSubmitted}
            fieldSchema={registerFormSchema.shape["firstName"]}
            defaultValue={state.form?.firstName}
            errors={state.errors?.firstName}
          />
        </Field>
        <Field>
          <Label>Last name</Label>
          <ValidatedInput
            type="text"
            name="lastName"
            wasSubmitted={wasSubmitted}
            fieldSchema={registerFormSchema.shape["lastName"]}
            defaultValue={state.form?.lastName}
            errors={state.errors?.lastName}
          />
        </Field>
        <Field>
          <Label>Email</Label>
          <ValidatedInput
            type="email"
            name="email"
            wasSubmitted={wasSubmitted}
            fieldSchema={registerFormSchema.shape["email"]}
            defaultValue={state.form?.email}
            errors={state.errors?.email}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <ValidatedInput
            type="password"
            name="password"
            fieldSchema={registerFormSchema.shape["password"]}
            wasSubmitted={wasSubmitted}
            defaultValue={state.form?.password}
            errors={state.errors?.password}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={pending}>
          Create account
        </Button>
        <Text>
          Already have an account?{" "}
          <TextLink href="/login">
            <Strong>Sign in</Strong>
          </TextLink>
        </Text>
      </Form>
    </AuthLayout>
  );
}
