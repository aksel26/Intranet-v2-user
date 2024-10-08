"use client";

import { Button, Center, Checkbox, Container, Group, rem, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX, IconCheck } from "@tabler/icons-react";

import { notifications } from "@mantine/notifications";
import { p } from "framer-motion/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      password: "",
      saveId: false,
    },

    validate: {
      id: (value) => (/^[a-z|A-Z|0-9|]+$/.test(value) ? null : "영문으로 입력해 주세요."),
    },
  });

  const submit = async (value: any) => {
    const { id, password } = value;

    await fetch("https://test-acg-playground.insahr.co.kr/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password: password }),
    })
      .then((response) => response.json())
      .then(async ({ statusCode, message, data }) => {
        if (statusCode === 400 || statusCode === 401) {
          notifications.show({
            title: "로그인 오류",
            message: message,
            position: "top-center",
            color: "red",
            icon: xIcon,
          });
        }

        if (statusCode === 200) {
          router.push("/meal");
          sessionStorage.setItem("token", JSON.stringify(data));
        }
      });
  };
  return (
    <Container p={0} h={"100%"} bg={"white"}>
      <Center h={"100%"}>
        <form
          onSubmit={form.onSubmit((values) => submit(values))}
          style={{
            width: "300px",
          }}
        >
          <TextInput size="md" withAsterisk label="아이디" placeholder="아이디를 입력해 주세요." key={form.key("id")} {...form.getInputProps("id")} />
          <Space h="md" />
          <TextInput
            size="md"
            withAsterisk
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Checkbox mt="md" label="아이디 기억하기" key={form.key("saveId")} {...form.getInputProps("saveId", { type: "checkbox" })} />
          <Space h="md" />
          <Group justify="center" mt="md">
            <Button fullWidth type="submit">
              로그인
            </Button>
          </Group>
        </form>
      </Center>
    </Container>
  );
}
