import { login } from "./actions";
import Form from "next/form";

import {
  AuthLayout,
  Button,
  Checkbox,
  CheckboxField,
  Field,
  Heading,
  Input,
  Label,
  Strong,
  Text,
  TextLink,
} from "@/components";

export default function Login() {
  return (
    <AuthLayout>
      <Form action={login} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input type="password" name="password" />
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
        <Button type="submit" className="w-full">
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
