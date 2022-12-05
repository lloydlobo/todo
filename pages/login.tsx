// prettier-ignore
import {
    Anchor, Button,
    Center, Checkbox, Container,
    Group, Paper, PasswordInput, Text, TextInput, Title
} from "@mantine/core";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Layout } from "../components";

export default function LoginPage() {
  return (
    <Layout title="Login">
      <div>
        <Container>
          <Center>
            <AuthenticationForm />
          </Center>
        </Container>
      </div>
    </Layout>
  );
}

type LoginData = {
  email: string;
  password: string;
};

export function AuthenticationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData, any>();

  const onSubmitHandler = (
    data: LoginData,
    event?: BaseSyntheticEvent<object, any, any> | undefined
  ): void => {
    console.log(data.email, data.password);
  };

  return (
    <Center>
      <Container size={420} my={40}>
        <Title align="center" className="font-display" sx={(theme) => ({})}>
          Sign In
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Link
            className="text-blue-400"
            href="/register"
            //   onClick={(event) => event.preventDefault()}
          >
            Create account
          </Link>
        </Text>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
        <form action="submit" onSubmit={handleSubmit(onSubmitHandler)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {/* register your input into the hook by invoking the "register" function */}
            <TextInput
              label="Email"
              placeholder="email@gmail.com"
              required
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email ? (
              <div className="text-xs text-red-500">
                <>{errors.email.message}</>
              </div>
            ) : null}

            {/* include validation with required or other standard HTML validation rules */}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...register("password", {
                required: "Please enter a valid password.",
                minLength: {
                  value: 6,
                  message: "Password is more than 5 chars",
                },
              })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password ? (
              <div className="text-xs text-red-500">
                <>{errors.password.message}</>
              </div>
            ) : null}
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
              <Anchor<"a">
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button type="submit" variant="outline" fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}
