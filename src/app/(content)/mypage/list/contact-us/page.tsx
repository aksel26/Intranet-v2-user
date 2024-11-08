"use client";

import { useSubmitForm } from "@/hooks/useSubmitForm";
import { ActionIcon, Box, Button, Divider, Flex, Group, Radio, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Back from "../../../../../../public/icons/arrow-left.svg";

const ContactUs = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const { mutate: submit, isError, isSuccess } = useSubmitForm();
  const queryClient = useQueryClient();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      category: "question",
      text: "",
    },
    validate: {
      text: (value) => (value.length < 5 ? "최소 5자 이상 입력해 주세요." : null),
      category: (value) => (value ? null : "유형을 반드시 선택해 주세요."),
    },
  });

  useEffect(() => {
    const value = sessionStorage.getItem("user");
    if (value) {
      const { userName } = JSON.parse(value);
      setUserName(userName);
      form.setFieldValue("name", userName); // form의 name 필드값을 업데이트
    }
  }, []);

  // 폼 제출 처리
  const handleSubmit = (values: any) => {
    const { text, category } = values;
    submit(
      { text: text, category: category },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["qna"] });
          notifications.show({
            title: "문의하기",
            message: "정상적으로 접수되었습니다.",
            position: "top-center",
            color: "green",
          });

          router.back();

          // updateQueries(["qna"]);
        },
      }
    );
  };

  const goBack = () => router.back();

  return (
    <Flex direction={"column"} rowGap={"xl"} pt={"lg"}>
      <Group gap={"xs"}>
        <ActionIcon variant="subtle" onClick={goBack}>
          <Back />
        </ActionIcon>
        <Text size="xl" fw={700}>
          작성하기
        </Text>
      </Group>

      <Box px={"xs"}>
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ height: "100%" }}>
          <TextInput
            label="성명"
            styles={{
              label: {
                fontWeight: 700,
              },
            }}
            readOnly
            variant="unstyled"
            {...form.getInputProps("name")} // form의 name 상태와 연결
            required
          />

          <Divider my="lg" />

          <Radio.Group
            label="문의 유형"
            {...form.getInputProps("category")}
            required
            styles={{
              label: {
                fontWeight: 700,
              },
            }}
          >
            <Flex columnGap={"lg"} mt="xs">
              <Radio value="question" label="질문" />
              <Radio value="bug" label="버그" />
              <Radio value="proposal" label="제안" />
            </Flex>
          </Radio.Group>

          <Divider my="lg" />

          <Textarea
            styles={{
              label: {
                fontWeight: 700,
              },
              input: {
                height: 150,
              },
            }}
            label="내용"
            placeholder="내용을 작성해 주세요."
            {...form.getInputProps("text")} // form의 message 상태와 연결
            required
            minRows={10}
            autosize={false} // 자동 크기 조절 비활성화
          />

          <Button type="submit" mt="xl" fullWidth>
            제출하기
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactUs;
