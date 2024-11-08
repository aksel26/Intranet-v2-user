"use client";
import notification from "@/components/GNB/Notification";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useDeleteWelfares, useUpdateFormWelfare } from "@/hooks/useSubmitForm";
import { toggleStore } from "@/lib/store/toggleStore";
import { Button, Flex, Group, LoadingOverlay, MultiSelect, NumberInput, Popover, rem, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
dayjs.locale("ko");

interface FormValues {
  targetDay: string;
  amount: number | null;
  content: string | null;
  payerName: string | null;
  payeeIdxs: number[] | null;
  selfWrittenYN: string;
}

export default function WelfareUpdateForm({ onClose, updateWelfareDetail }: any) {
  const { welfareIdx, content, amount, payerName, selfWrittenYN } = updateWelfareDetail;

  const { data: userList, isLoading, isError } = useGetUsers();
  const [users, setUsers] = useState<any>([]);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const [selectedPayee, setSelectedPayee] = useState<any>([]);

  const [isSelfWritten, setIsSelfWritten] = useState(selfWrittenYN === "N" ? false : true);

  const { toggleInfo } = toggleStore((state) => state);

  const selectPayee = (e: any) => {
    setSelectedPayee(e);
  };

  const { mutate } = useUpdateFormWelfare();
  const { mutate: deleteWelfare } = useDeleteWelfares();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      selfWrittenYN: selfWrittenYN,
      content: content,
      amount: amount,
      payerName: payerName, // Added payerName
    },
  });

  useEffect(() => {
    setTargetDate(dayjs(updateWelfareDetail.targetDay).toDate());
    setSelectedPayee(
      updateWelfareDetail.payeeList.map((item: any) => ({
        userIdx: item.userIdx,
        userName: item.userName,
      }))
    );
  }, [updateWelfareDetail]);

  useEffect(() => {
    setUsers(userList?.data.data);
  }, [userList]);

  const queryClient = useQueryClient();

  const handleSubmit = (values: any) => {
    const payeeIdxs = selectedPayee.map((item: any) => item.userIdx);
    console.log(values, payeeIdxs);

    const temp = {
      queryParams: welfareIdx,
      body: {
        payeeIdxs: payeeIdxs,
        targetDay: dayjs(targetDate).format("YYYY-MM-DD"),
        ...values,
      },
    };

    console.log("👀", temp);
    mutate(temp, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["welfares"] });
        notification({
          title: "복지포인트",
          color: "green",
          message: "복지포인트 내역이 수정되었습니다.",
        });
        onClose();
      },
    });
  };

  const handleDeleteWelfare = () => {
    deleteWelfare(welfareIdx, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["welfares"] });
        notification({
          title: "복지포인트",
          color: "green",
          message: "복지포인트 내역이 삭제되었습니다.",
        });
        onClose();
      },
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
        <DatePickerInput
          label="일자"
          locale="ko"
          leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          placeholder="사용일자를 선택해 주세요."
          value={targetDate}
          onChange={setTargetDate}
          valueFormat="MM월 D일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
          disabled={!isSelfWritten}
        />
        {isLoading ? (
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        ) : (
          <MultiSelect
            styles={{
              dropdown: {
                zIndex: 1001,
              },
            }}
            label="동반결제자"
            placeholder={updateWelfareDetail.payeeList.length < 1 ? "결제한 인원을 선택해 주세요." : undefined}
            data={users?.map((user: any) => ({
              value: user.userIdx.toString(),
              label: user.userName,
              searchValue: user.userName,
            }))}
            onChange={(values) => {
              const selectedUsers = users?.filter((user: any) => values.includes(user.userIdx.toString()));
              selectPayee(selectedUsers);
            }}
            searchable
            defaultValue={updateWelfareDetail.payeeList?.map((item: any) => item.userIdx.toString()) || []}
            disabled={!isSelfWritten}
          />
        )}
        <TextInput
          label="사용처"
          placeholder="결제하신 곳의 상호명을 입력해 주세요."
          key={form.key("content")}
          {...form.getInputProps("content")}
          disabled={!isSelfWritten}
        />

        <Popover
          shadow="lg"
          radius={"lg"}
          arrowPosition="side"
          arrowOffset={9}
          arrowSize={10}
          arrowRadius={1}
          width={170}
          withArrow
          opened={toggleInfo.isOpen}
          position="top-end"
        >
          <Popover.Target>
            <NumberInput
              label="금액"
              placeholder="금액을 입력해 주세요."
              thousandSeparator=","
              hideControls
              suffix=" 원"
              key={form.key("amount")}
              {...form.getInputProps("amount")}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">
              결제자 본인이 아닌 경우, <br />
              <Text component="span" fw={900}>
                금액
              </Text>
              만 수정할 수 있어요.
            </Text>
          </Popover.Dropdown>
        </Popover>
        <Group wrap="nowrap">
          <Button fullWidth type="submit" mt={20}>
            수정하기
          </Button>
          <Button disabled={!isSelfWritten} fullWidth type="button" mt={20} color="red" variant="light" onClick={handleDeleteWelfare}>
            삭제하기
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
