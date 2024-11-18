"use client";
import notification from "@/components/GNB/Notification";
import { useChangeMyInfo, useChangePassword } from "@/hooks/useSubmitForm";
import { formatPhoneNumber } from "@/utils/phoneNumber";
import { Button, Container, Flex, Group, NavLink, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
interface ErrorResponse {
  message: string;
  code?: string;
  details?: string;
}

const MyInfo = () => {
  const queryClient = useQueryClient();
  const { mutate: changePassword } = useChangePassword();
  const { mutate: changeMyInfo } = useChangeMyInfo();

  const [prePasswordErr, setPrePasswordErr] = useState(false);

  const userInfoform = useForm({
    initialValues: {
      userAddress: "",
      userCell: "",
    },
    validate: {
      userCell: (value) => {
        if (!value) return "휴대폰 번호를 입력해주세요";
        if (value.replace(/-/g, "").length !== 11) {
          return "올바른 휴대폰 번호를 입력해주세요";
        }
        return null;
      },
    },
  });

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    userInfoform.setFieldValue("userCell", formatted);
  };

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

  const submitChangeMyInfo = (values: any) => {
    changeMyInfo(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        notification({ title: "내 정보 변경", color: "green", message: "내 정보가 변경되었습니다." });

        userInfoform.reset();
      },
      onError: (error) => {
        if (error.message) {
          notification({ title: "내 정보 변경", color: "red", message: "내 정보 변경을 실패하였습니다." });
        }
      },
    });
  };
  return (
    <Container size={"lg"} p={0} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} pt={"lg"} p={"sm"}>
        <Text size="xl" fw={700}>
          내 정보 수정
        </Text>

        <NavLink label="기본정보 변경" childrenOffset={28} mt={"lg"} py={"md"}>
          <form onSubmit={userInfoform.onSubmit(submitChangeMyInfo)}>
            <Stack py={"md"}>
              <TextInput
                value={userInfoform.values.userCell}
                onChange={handleChange}
                error={userInfoform.errors.userCell}
                label="연락처"
                withAsterisk
                placeholder="010-0000-0000"
                maxLength={13}
                styles={{
                  input: {
                    letterSpacing: "1px",
                  },
                }}
              />
              <TextInput
                placeholder="주소를 입력해 주세요."
                withAsterisk
                label="주소"
                key={userInfoform.key("userAddress")}
                {...userInfoform.getInputProps("userAddress")}
              />

              <Group justify="end">
                <Button type="submit" size="sm">
                  변경하기
                </Button>
              </Group>
            </Stack>
          </form>
        </NavLink>

        <NavLink label="비밀번호 변경" childrenOffset={28} py={"md"}>
          <form onSubmit={passwordForm.onSubmit(submitChangePassword)}>
            <Stack py={"md"}>
              <PasswordInput
                label="기존 비밀번호"
                withAsterisk
                placeholder="기존 비밀번호"
                key={passwordForm.key("prePassword")}
                {...passwordForm.getInputProps("prePassword")}
                error={prePasswordErr && "기존 비밀번호가 올바르지 않습니다."}
              />
              <PasswordInput
                label="새 비밀번호"
                withAsterisk
                placeholder="새 비밀번호"
                key={passwordForm.key("newPassword")}
                {...passwordForm.getInputProps("newPassword")}
              />
              <PasswordInput
                label="새 비밀번호 확인"
                withAsterisk
                placeholder="새 비밀번호 확인"
                key={passwordForm.key("confirmPassword")}
                {...passwordForm.getInputProps("confirmPassword")}
              />
              <Group justify="end">
                <Button type="submit" size="sm">
                  변경하기
                </Button>
              </Group>
            </Stack>
          </form>
        </NavLink>
      </Flex>
    </Container>
  );
};

export default MyInfo;
