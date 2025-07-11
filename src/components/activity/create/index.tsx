// import notification from "@/components/GNB/Notification";
import { activityService } from "@/api/services/activity/activity.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
// import { useSubmitFormActivity } from "@/hooks/useSubmitForm";
import { myInfoStore } from "@/store/myInfoStore";
// import { myInfoStore } from "@/lib/store/myInfoStore";
import { Button, Flex, NumberInput, rem, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
// import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useEffect } from "react";

interface FormValues {
  targetDay: string | null;
  amount: number | null;
  content: string | null;
  payerName: string | null;
}

export default function ActivityInputForm({ onClose, opened }: any) {
  const queryClient = useQueryClient();

  const { myInfo } = myInfoStore();
  //   const { mutate } = useSubmitFormActivity();

  const { mutate } = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(activityService.createActivity, {
    invalidateKeys: [["activity"]],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activity"] });
      notification({
        title: "활동비",
        color: "green",
        message: "활동비 내역이 저장되었습니다.",
      });

      form.setFieldValue("targetDay", ""); // form의 name 필드값을 업데이트
      form.setFieldValue("content", ""); // form의 name 필드값을 업데이트
      form.setFieldValue("amount", null); // form의 name 필드값을 업데이트
      if (opened) onClose();
    },
    onError: (error: Error) => {
      console.log("error:", error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
      notification({ title: "활동비 입력", color: "red", message: errorMessage });
    },
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      amount: null,
      targetDay: "", // Added targetDay
      payerName: "본인", // Added payerName
    },
  });

  useEffect(() => {
    const userName = myInfo?.userName || "";
    form.setFieldValue("payerName", userName); // form의 name 필드값을 업데이트
  }, [myInfo]);

  const handleSubmit = (values: FormValues) => {
    const temp = { ...values };

    temp.targetDay = dayjs(temp.targetDay).format("YYYY-MM-DD");

    mutate(temp);
  };

  if (myInfo?.gradeName === "인턴" || myInfo?.gradeName === "위원" || myInfo?.gradeName === "선임" || myInfo?.gradeName === "책임") {
    return (
      <Text fz={"sm"} c={"dimmed"}>
        활동비 입력 권한이 없습니다.
      </Text>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
        <DateInput
          label="일자"
          locale="ko"
          clearable
          highlightToday
          leftSection={<Calendar style={{ width: rem(18), height: rem(18) }} strokeWidth={1.5} />}
          placeholder="사용일자를 선택해 주세요."
          valueFormat="MM월 D일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
          key={form.key("targetDay")}
          {...form.getInputProps("targetDay")}
        />
        <TextInput label="사용처" placeholder="결제하신 곳의 상호명을 입력해 주세요." key={form.key("content")} {...form.getInputProps("content")} />

        <NumberInput label="금액" placeholder="금액을 입력해 주세요." thousandSeparator="," hideControls suffix=" 원" key={form.key("amount")} {...form.getInputProps("amount")} />

        <Button type="submit" mt={20}>
          저장하기
        </Button>
      </Flex>
    </form>
  );
}
