import { smsService } from "@/api/services/sms/sms.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
import SmsDetails from "@/components/sms/details";
import SmsDetailsModal from "@/components/sms/details/modal";
import { Button, Grid, GridCol, Group, Paper, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

const SMS = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const [value, setValue] = useState("");
  const [phoneCount, setPhoneCount] = useState(0);
  const [formattedValue, setFormattedValue] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fromPhoneNumber: "",
      message: "",
      toPhoneNumbers: [],
      totalCount: 0,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const sendSMS = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(smsService.sendSMS, {
    onSuccess: async () => {
      close();
      notification({
        title: "SMS 전송",
        color: "green",
        message: "SMS 전송이 완료되었습니다.",
      });
      form.reset();
      setValue("");
      setPhoneCount(0);
      setFormattedValue("");
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["sms"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "SMS 전송",
        color: "red",
        message: errorMessage,
      });
    },
  });

  const formatPhoneNumbers = (input: string) => {
    // 쉼표로 구분된 전화번호들을 배열로 변환
    const phoneNumbers = input
      .split(",")
      .map((phone) => phone.trim())
      .filter((phone) => phone.length > 0);

    // 전화번호 유효성 검사 (선택사항)
    const validPhoneNumbers = phoneNumbers.filter((phone) => {
      // 간단한 한국 전화번호 패턴 체크 (010-XXXX-XXXX)
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      return phoneRegex.test(phone);
    });

    // 전화번호 개수 업데이트
    setPhoneCount(validPhoneNumbers.length);

    // 각 전화번호를 새 줄로 구분하여 표시
    const formatted = validPhoneNumbers.join("\n");
    setFormattedValue(formatted);

    return formatted;
  };

  const handleBlur = () => {
    const formatted = formatPhoneNumbers(value);
    setValue(formatted);
  };

  const handleFocus = () => {
    // 포커스 시 쉼표로 구분된 형식으로 다시 변환 (선택사항)
    if (formattedValue) {
      const phones = formattedValue.split("\n").filter((phone) => phone.trim());
      setValue(phones.join(", "));
    }
  };
  const submitSMS = (values: any) => {
    const submit = { ...values };
    submit.toPhoneNumbers = formattedValue.split("\n").map((phone) => phone.trim());
    submit.totalCount = formattedValue.split("\n").length;

    sendSMS.mutate(values);
  };

  return (
    <>
      <Stack gap={1} mb="xs">
        <Title order={4}>안내 SMS 전송</Title>
        <Text c={"gray.6"} fz={"sm"}>
          안내 SMS 전송 및 현황을 확인할 수 있습니다.
        </Text>
      </Stack>

      <Grid mt={"md"}>
        <GridCol span={{ base: 12, md: 4 }}>
          <form onSubmit={form.onSubmit(submitSMS)}>
            <Stack gap={2}>
              <Group justify="space-between" align="end">
                <Text fz={"sm"} c={"gray"}>
                  발신정보
                </Text>
                <Button variant="outline" size="xs" onClick={open} hiddenFrom="md">
                  내역
                </Button>
              </Group>
              <Paper p={"lg"}>
                <Textarea
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-6)" } }}
                  placeholder="안내 문구를 입력해 주세요."
                  autosize
                  label="안내문구"
                  minRows={5}
                  maxRows={10}
                  key={form.key("message")}
                  {...form.getInputProps("message")}
                />
                <TextInput
                  key={form.key("fromPhoneNumber")}
                  {...form.getInputProps("fromPhoneNumber")}
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-6)" } }}
                  placeholder="010-0000-0000"
                  label="회신번호"
                />
              </Paper>
            </Stack>

            <Stack gap={2} mt={"md"}>
              <Text fz={"sm"} c={"gray"}>
                수신정보
              </Text>
              <Paper p={"lg"}>
                <Stack mb={3} gap={2}>
                  <Text fw={500} fz={"sm"}>
                    총 {phoneCount}명
                  </Text>
                  <Text c={"gray"} fz={"sm"}>
                    여러 수신자에게 전송하실 경우,{" "}
                    <Text component="span" c="black" fz="sm">
                      쉼표(,)
                    </Text>
                    로 구분해 입력해 주세요.
                  </Text>
                </Stack>
                <Textarea
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder="010-0000-0000"
                  autosize
                  minRows={5}
                  maxRows={5}
                />
                <Button fullWidth mt={"md"} type="submit">
                  전송
                </Button>
              </Paper>
            </Stack>
          </form>
        </GridCol>
        <GridCol span={{ base: 12, md: 8 }}>
          <SmsDetails />
        </GridCol>
        <SmsDetailsModal opened={opened} close={close} />
      </Grid>
    </>
  );
};

export default SMS;
