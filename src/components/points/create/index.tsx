// import { useGetUsers } from "@/hooks/useGetUsers";
// import { useSubmitFormWelfare } from "@/hooks/useSubmitForm";
// import { myInfoStore } from "@/lib/store/myInfoStore";
import { pointsService } from "@/api/services/points/points.services";
import { userService } from "@/api/services/user/user.services";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import notification from "@/components/common/notification";
import { myInfoStore } from "@/store/myInfoStore";
import { Button, Flex, MultiSelect, NumberInput, rem, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
// import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface InputPayload {
  selfWrittenYN: string;
  content: string;
  amount: number | null;
  targetDay: string | null;
  payerName: string;
  payeeIdxs: string[];
}
interface OutputPayload {
  selfWrittenYN: string;
  content: string | null;
  amount: number | null;
  targetDay: string;
  payerName: string | null;
  payeeIdxs: number[];
}

export default function WelfareInputForm({ close }: any) {
  const { myInfo } = myInfoStore();
  const queryClient = useQueryClient();
  const { data: userList, isLoading, isError } = useApiQuery(["users"], userService.getAll);
  const [users, setUsers] = useState<any>([]);

  //   const { mutate } = useSubmitFormWelfare();

  const { mutate } = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(pointsService.createPoint, {
    invalidateKeys: [["welfares"]],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["welfares"] });
      notification({
        title: "복지포인트",
        color: "green",
        message: "복지포인트 내역이 저장되었습니다.",
      });

      form.setFieldValue("targetDay", null); // form의 name 필드값을 업데이트
      form.setFieldValue("payeeIdxs", []); // form의 name 필드값을 업데이트
      form.setFieldValue("content", ""); // form의 name 필드값을 업데이트
      form.setFieldValue("amount", null); // form의 name 필드값을 업데이트
      close();
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
      notification({ title: "복지포인트 입력", color: "red", message: errorMessage });
    },
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      selfWrittenYN: "Y",
      content: "",
      amount: null,
      targetDay: null, // Added targetDay
      payerName: "본인", // Added payerName
      payeeIdxs: [], // Added payeeIdxs
    },
  });
  useEffect(() => {
    setUsers(userList?.data.data.filter((user: any) => user.userName !== myInfo?.userName));
  }, [userList, myInfo]);

  useEffect(() => {
    const userName = myInfo?.userName || "";
    form.setFieldValue("payerName", userName); // form의 name 필드값을 업데이트
  }, [myInfo]);

  // payload 변환 함수
  const transformPayload = (input: InputPayload): OutputPayload => {
    // targetDay를 YYYY-MM-DD 형식으로 변환
    const date = dayjs(input.targetDay).format("YYYY-MM-DD");

    // payeeIdxs를 number 배열로 변환
    const numberPayeeIdxs = input.payeeIdxs.map((idx) => Number(idx));

    return {
      ...input,
      targetDay: date,
      payeeIdxs: numberPayeeIdxs,
    };
  };

  const handleSubmit = (values: InputPayload) => {
    const payload = transformPayload(values);
    console.log("payload:", payload);
    mutate(payload);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
        <DatePickerInput
          label="일자"
          locale="ko"
          highlightToday
          leftSection={<Calendar style={{ width: rem(18), height: rem(18) }} strokeWidth={1.5} />}
          placeholder="사용일자를 선택해 주세요."
          key={form.key("targetDay")}
          {...form.getInputProps("targetDay")}
          valueFormat="MM월 D일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
        />
        <MultiSelect
          styles={{
            dropdown: {
              zIndex: 1001,
            },
          }}
          label="동반결제자"
          placeholder="결제한 인원을 선택해 주세요."
          data={users?.map((user: any) => ({
            value: user.userIdx.toString(),
            label: user.userName,
            searchValue: user.userName,
          }))}
          key={form.key("payeeIdxs")}
          {...form.getInputProps("payeeIdxs")}
          searchable
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
