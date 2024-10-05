"use client";

import { Box, Button, Divider, Flex, Radio, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const ContactUs = () => {
  // useForm 훅을 이용해 폼 상태 관리
  const form = useForm({
    initialValues: {
      name: "기본이름 박제",
      type: "quesiton",
      content: "",
    },

    validate: {
      content: (value) => (value.length < 5 ? "최소 5자 이상 입력해 주세요." : null),
      type: (value) => (value ? null : "유형을 반드시 선택해 주세요."),
    },
  });

  // 폼 제출 처리
  const handleSubmit = (values: any) => {
    console.log(values);
    alert("Form submitted");
  };

  const router = useRouter();

  const goBack = () => router.back();

  return (
    <Flex direction={"column"} rowGap={"xl"} p={"md"} pt={40}>
      <Flex align={"center"}>
        <Box p={"sm"} pl={0} onClick={goBack}>
          <IconChevronLeft color="#c6c6c6" />
        </Box>
        <Text size="xl" fw={800}>
          문의하기
        </Text>
      </Flex>
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
          {...form.getInputProps("type")}
          required
          styles={{
            label: {
              fontWeight: 700,
            },
          }}
        >
          <Flex columnGap={"lg"} mt="xs">
            <Radio value="quesiton" label="질문" />
            <Radio value="bug" label="버그" />
            <Radio value="suggestion" label="제안" />
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
          {...form.getInputProps("content")} // form의 message 상태와 연결
          required
          minRows={10}
          autosize={false} // 자동 크기 조절 비활성화
        />

        <Button type="submit" mt="xl" fullWidth>
          제출하기
        </Button>
      </form>
    </Flex>
  );
};

export default ContactUs;
