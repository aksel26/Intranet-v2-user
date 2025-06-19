import notification from "@/components/GNB/Notification";
import { useChangePassword } from "@/hooks/useSubmitForm";
import { Box, Button, Paper, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const UpdatePassword = () => {
  const { mutate: changePassword } = useChangePassword();
  const [prePasswordErr, setPrePasswordErr] = useState(false);
  const passwordForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      prePassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) => (value !== values.newPassword ? "비밀번호가 일치하지 않습니다." : null),
    },
  });

  const submitChangePassword = (values: any) => {
    changePassword(values, {
      onSuccess: () => {
        notification({ title: "비밀번호 변경", color: "green", message: "비밀번호가 변경되었습니다." });
        setPrePasswordErr(false);
        passwordForm.reset();
      },
      onError: (error) => {
        if (error.message) {
          setPrePasswordErr(true);
        }
      },
    });
  };

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"sm"}>
      <Text mb={"xs"}>비밀번호 수정</Text>
      <Box w={{ base: "100%", sm: "400px" }}>
        <form onSubmit={passwordForm.onSubmit(submitChangePassword)}>
          <PasswordInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
            label="기존 비밀번호"
            withAsterisk
            placeholder="기존 비밀번호"
            key={passwordForm.key("prePassword")}
            {...passwordForm.getInputProps("prePassword")}
            error={prePasswordErr && "기존 비밀번호가 올바르지 않습니다."}
          />
          <PasswordInput
            mt={"md"}
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
            label="새 비밀번호"
            withAsterisk
            placeholder="새 비밀번호"
            key={passwordForm.key("newPassword")}
            {...passwordForm.getInputProps("newPassword")}
          />
          <PasswordInput
            mt={"md"}
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
            label="새 비밀번호 확인"
            withAsterisk
            placeholder="새 비밀번호 확인"
            key={passwordForm.key("confirmPassword")}
            {...passwordForm.getInputProps("confirmPassword")}
          />
          <Button type="submit" size="sm" my={"md"} fullWidth>
            변경하기
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default UpdatePassword;
