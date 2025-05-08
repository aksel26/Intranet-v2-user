import notification from "@/components/GNB/Notification";
import { useChangeMyInfo } from "@/hooks/useSubmitForm";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { formatPhoneNumber } from "@/utils/phoneNumber";
import { Box, Button, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const UpdateBaseInfo = () => {
  const { myInfo } = myInfoStore();
  const queryClient = useQueryClient();
  const { mutate: changeMyInfo } = useChangeMyInfo();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    userInfoform.setFieldValue("userCell", formatted);
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

  useEffect(() => {
    const initialValues = {
      userAddress: myInfo?.userAddress || "",
      userCell: myInfo?.userCell || "",
    };

    userInfoform.setInitialValues(initialValues);
    userInfoform.setValues(initialValues);
  }, [myInfo]);

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
      <Text mb={"xs"}>개인정보 수정</Text>
      <Box w={{ base: "100%", sm: "400px" }}>
        <form onSubmit={userInfoform.onSubmit(submitChangeMyInfo)}>
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
                letterSpacing: 1,
              },
              label: {
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
          />
          <TextInput
            mt={"md"}
            placeholder="주소를 입력해 주세요."
            withAsterisk
            label="주소"
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
              },
            }}
            key={userInfoform.key("userAddress")}
            {...userInfoform.getInputProps("userAddress")}
          />

          <Button type="submit" size="sm" my={"md"} fullWidth>
            변경하기
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default UpdateBaseInfo;
