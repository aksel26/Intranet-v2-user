"use client";

import notification from "@/components/GNB/Notification";
import { Box, Button, Checkbox, Group, Image, PasswordInput, Space, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import myImage from "/public/images/ACG_LOGO_GRAY.png";
import { IconAbc, IconLock } from "@tabler/icons-react";
export default function Login() {
  const router = useRouter();

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
          notification({
            title: "로그인 오류",
            color: "red",
            message: message,
          });
        }

        if (statusCode === 200) {
          router.push("/main");
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error: any) => {
        notification({
          title: "로그인 오류",
          color: "red",
          message: "로그인 중 오류가 발생하였습니다.",
        });
      });
  };
  return (
    <Box w={"70%"}>
      <Stack justify="center" mb="md" align="center">
        <Image component={NextImage} src={myImage} alt="CI" w={"5rem"} h={"1rem"} />
        <Text fz={{ base: "sm", xs: "sm", sm: "sm", md: "md" }} variant="gradient" gradient={{ from: "blue", to: "pink", deg: 90 }} fw={700}>
          Valid Approach, Valuable People
        </Text>
      </Stack>
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <TextInput
          size="md"
          withAsterisk
          leftSection={<IconAbc strokeWidth={1.2} />}
          placeholder="아이디를 입력해 주세요."
          key={form.key("id")}
          {...form.getInputProps("id")}
        />
        <Space h="md" />
        <PasswordInput
          leftSection={<IconLock strokeWidth={1.2} />}
          placeholder="비밀번호를 입력해 주세요."
          key={form.key("password")}
          {...form.getInputProps("password")}
          size="md"
        />

        <Group justify="center" mt="md">
          <Button fullWidth type="submit">
            로그인
          </Button>
        </Group>
        <Group justify="end">
          <Checkbox
            mt="md"
            size="xs"
            radius={"sm"}
            labelPosition="left"
            label="아이디 기억하기"
            key={form.key("saveId")}
            {...form.getInputProps("saveId", { type: "checkbox" })}
          />
        </Group>
        <Text c={"dimmed"} ta={"right"} fz={"xs"} mt={"xs"}>
          계정 생성은 P&C팀에게 문의해 주세요.
        </Text>
      </form>
    </Box>
  );
}
