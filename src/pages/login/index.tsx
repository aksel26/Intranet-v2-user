import React, { useState } from "react";
// import notification from "@/components/GNB/Notification";
import {
  AppShell,
  Center,
  Container,
  Box,
  Button,
  Checkbox,
  Group,
  Image,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Affix,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

import { ChevronRight, Lock } from "lucide-react";

import logo from "@/assets/logo/ACG_LOGO_GRAY.png";
import { useAuthStore } from "../../store/useAuthStore";
import notification from "@/components/global/notification";
// import notification from "../../components/global/notification";

// 로그인 API 함수
const loginApi = async (id: string, password: string) => {
  try {
    // 실제 API 엔드포인트로 교체하세요
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }

    const data = await response.json();
    return {
      token: data.data.accessToken,
      user: data.data.userName,
    };
  } catch (error: any) {
    // 개발용 mock 데이터 (실제 API 구현 후 제거)

    throw new Error("로그인에 실패했습니다.");
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      password: "",
      saveId: false,
    },

    validate: {
      id: (value) =>
        /^[a-z|A-Z|0-9|]+$/.test(value) ? null : "영문으로 입력해 주세요.",
    },
  });
  const submit = async (value: any) => {
    const { id, password } = value;
    setLoading(true);

    try {
      const { token, user } = await loginApi(id, password);
      login(token, user);
      navigate("/main", { replace: true });
    } catch (err: any) {
      // const message = err.response.message
      notification({
        title: "로그인",
        color: "red",
        message: "로그인 중 문제가 발생하였습니다.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppShell>
      <AppShell.Main>
        <Affix position={{ bottom: 40, right: 40 }}>
          <Button
            variant="gradient"
            gradient={{ from: "rgba(156, 219, 175, 1)", to: "yellow", deg: 90 }}
            leftSection={<ChevronRight size={16} />}
            onClick={() => alert("검사운영관리 페이지로 이동")}
          >
            검사운영 관리
          </Button>
        </Affix>
        <Container h={"100svh"} size={"xs"}>
          <Center h={"100%"}>
            <Box w={"70%"}>
              <Stack justify="center" mb="md" align="center">
                <Image src={logo} w={"7rem"} />
                <Text
                  fz={{ base: "sm", xs: "sm", sm: "sm", md: "md" }}
                  variant="gradient"
                  gradient={{ from: "blue", to: "pink", deg: 90 }}
                  fw={600}
                >
                  Valid Approach, Valuable People
                </Text>
              </Stack>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput
                  size="md"
                  withAsterisk
                  leftSection={"ID"}
                  placeholder="아이디를 입력해 주세요."
                  key={form.key("id")}
                  {...form.getInputProps("id")}
                />
                <Space h="md" />
                <PasswordInput
                  leftSection={<Lock strokeWidth={1.2} />}
                  placeholder="비밀번호를 입력해 주세요."
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                  size="md"
                />

                <Group justify="center" mt="md">
                  <Button fullWidth type="submit" loading={loading}>
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
          </Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Login;
