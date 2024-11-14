"use client";
import { ActionIcon, Button, Flex, Group, NavLink, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
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
    <Flex direction={"column"} pt={"lg"} p={"sm"}>
      <Group gap={"xs"}>
        <ActionIcon variant="subtle" onClick={goBack}>
          <Back />
        </ActionIcon>
        <Text size="xl" fw={700}>
          내 정보 수정
        </Text>
      </Group>

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
      {/* 
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput withAsterisk label="Email" placeholder="your@email.com" key={form.key("email")} {...form.getInputProps("email")} />

        <Checkbox mt="md" label="I agree to sell my privacy" key={form.key("termsOfService")} {...form.getInputProps("termsOfService", { type: "checkbox" })} />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form> */}
    </Flex>
  );
};

export default MyInfo;
