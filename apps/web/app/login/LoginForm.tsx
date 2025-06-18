"use client";

import { useActionState, useState } from "react";
import Form from "next/form";
import { login } from "./actions";
import {
  AuthLayout,
  Button,
  Checkbox,
  CheckboxField,
  Field,
  Heading,
  Label,
  Strong,
  Text,
  TextLink,
  ValidatedInput,
} from "@/components";
import { LoginActionState, loginFormSchema } from "./schema";

const initialState: LoginActionState = {
  form: {
    email: "",
    password: "",
  },
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = loginFormSchema.safeParse(data);
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
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label>Email</Label>
          <ValidatedInput
            type="email"
            name="email"
            wasSubmitted={wasSubmitted}
            fieldSchema={loginFormSchema.shape["email"]}
            defaultValue={state.form?.email}
            errors={state.errors?.email}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <ValidatedInput
            type="password"
            name="password"
            fieldSchema={loginFormSchema.shape["password"]}
            wasSubmitted={wasSubmitted}
            defaultValue={state.form?.password}
            errors={state.errors?.password}
          />
        </Field>
        <div className="flex items-center justify-between">
          <CheckboxField>
            <Checkbox name="remember" />
            <Label>Remember me</Label>
          </CheckboxField>
          <Text>
            <TextLink href="#">
              <Strong>Forgot password?</Strong>
            </TextLink>
          </Text>
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          Login
        </Button>
        <Text>
          Don’t have an account?{" "}
          <TextLink href="/register">
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </Form>
    </AuthLayout>
  );
}
