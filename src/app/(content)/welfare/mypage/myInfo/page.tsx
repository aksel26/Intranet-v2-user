"use client";
import { ActionIcon, Button, Flex, Group, NavLink, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Back from "/public/icons/arrow-left.svg";

const MyInfo = () => {
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     userCell: "",
  //     userAddress: "",
  //   },
  // });

  // const passwordForm = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     newPassword: "",
  //     confirmPassword: "",
  //   },
  //   validate: {
  //     confirmPassword: (value, values) => (value !== values.newPassword ? "비밀번호가 일치하지 않습니다." : null),
  //   },
  // });
  const router = useRouter();
  const goBack = () => router.back();

  const changePassword = (values: any) => {
    console.log(values);
  };
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
      없앨까
    </Flex>
  );
};

export default MyInfo;
