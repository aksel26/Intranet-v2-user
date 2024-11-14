"use client";
import { ActionIcon, Button, Container, Flex, Group, NavLink, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Back from "/public/icons/arrow-left.svg";

const MyInfo = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userCell: "",
      userAddress: "",
    },
  });
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <Container size={"lg"} p={0} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} pt={"lg"} p={"sm"}>
        <Text size="xl" fw={700}>
          내 정보 수정
        </Text>

        <NavLink label="기본정보 변경" childrenOffset={28} mt={"lg"} py={"md"}>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack py={"md"}>
              <TextInput withAsterisk label="연락처" value={"010-2222-1111"} key={form.key("userCell")} {...form.getInputProps("userCell")} />
              <TextInput withAsterisk label="주소" value={"서울시 용산구 서빙고로 18"} key={form.key("userAddress")} {...form.getInputProps("userAddress")} />

              <Group justify="end">
                <Button size="sm">변경하기</Button>
              </Group>
            </Stack>
          </form>
        </NavLink>

        <NavLink label="비밀번호 변경" childrenOffset={28} py={"md"}>
          <Stack py={"md"}>
            <PasswordInput label="기존 비밀번호" withAsterisk placeholder="기존 비밀번호" />
            <PasswordInput label="새 비밀번호" withAsterisk placeholder="새 비밀번호" />
            <PasswordInput label="새 비밀번호 확인" withAsterisk placeholder="새 비밀번호 확인" />
            <Group justify="end">
              <Button size="sm">변경하기</Button>
            </Group>
          </Stack>
        </NavLink>
      </Flex>
    </Container>
  );
};

export default MyInfo;
