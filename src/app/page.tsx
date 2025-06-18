"use client";
import notification from "@/components/GNB/Notification";
import { AppShell, Center, Container, Box, Button, Checkbox, Group, Image, PasswordInput, Space, Stack, Text, TextInput, Affix } from "@mantine/core";
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import myImage from "/public/images/ACG_LOGO_GRAY.png";
import { IconAbc, IconChevronRight, IconLock } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function page() {
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

    const result = await signIn("credentials", {
      redirect: false,
      id,
      password,
    });
    if (result?.error) {
      notification({
        title: "로그인 오류",
        color: "red",
        message: result?.error,
      });
    } else {
      router.push("/main");
    }
  };
  return (
    <AppShell>
      <AppShell.Main>
        <Affix position={{ bottom: 40, right: 40 }}>
          <Button
            variant="gradient"
            gradient={{ from: "rgba(156, 219, 175, 1)", to: "yellow", deg: 90 }}
            leftSection={<IconChevronRight size={16} />}
            onClick={() => alert("검사운영관리 페이지로 이동")}
          >
            검사운영 관리
          </Button>
        </Affix>
        <Container h={"100svh"} size={"xs"}>
          <Center h={"100%"}>
            <Box w={"70%"}>
              <Stack justify="center" mb="md" align="center">
                <Image component={NextImage} src={myImage} alt="CI" w={"5rem"} h={"1rem"} />
                <Text fz={{ base: "sm", xs: "sm", sm: "sm", md: "md" }} variant="gradient" gradient={{ from: "blue", to: "pink", deg: 90 }} fw={600}>
                  Valid Approach, Valuable People
                </Text>
              </Stack>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput size="md" withAsterisk leftSection={<IconAbc strokeWidth={1.2} />} placeholder="아이디를 입력해 주세요." key={form.key("id")} {...form.getInputProps("id")} />
                <Space h="md" />
                <PasswordInput leftSection={<IconLock strokeWidth={1.2} />} placeholder="비밀번호를 입력해 주세요." key={form.key("password")} {...form.getInputProps("password")} size="md" />

                <Group justify="center" mt="md">
                  <Button fullWidth type="submit">
                    로그인
                  </Button>
                </Group>
                <Group justify="end">
                  <Checkbox mt="md" size="xs" radius={"sm"} labelPosition="left" label="아이디 기억하기" key={form.key("saveId")} {...form.getInputProps("saveId", { type: "checkbox" })} />
                </Group>
                <Text c={"dimmed"} ta={"right"} fz={"xs"} mt={"xs"}>
                  계정 생성은 P&C팀에게 문의해 주세요.
                </Text>
              </form>
            </Box>
          </Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
