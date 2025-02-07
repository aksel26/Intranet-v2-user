"use client";

import { useLeave } from "@/hooks/useSubmitForm";
import { ATTENDANCE_OPTIONS_NORMAL, ATTENDANCE_OPTIONS_REMARK } from "@/lib/enums";
import { Button, Divider, Drawer, FileButton, Group, Indicator, Input, Select, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useState } from "react";
import notification from "../GNB/Notification";

type TLeaveInfo = {
  commuteDate: Date | null;
  attendance: string | null;
};
function Vacation({ opened, close }: any) {
  const [value, setValue] = useState<any>([]);
  const { mutate: leave } = useLeave();
  const [file, setFile] = useState<File | null>(null);

  const selectDate = (date: Date[]) => {
    setValue((prev: TLeaveInfo[]) =>
      date.map((item: Date) => ({ commuteDate: item, attendance: prev.find((p) => p.commuteDate === item)?.attendance || null }))
    );
  };

  const attendance = (value: any, commuteDate: any) => {
    setValue((prevState: any) => prevState.map((item: any) => (item.commuteDate === commuteDate ? { ...item, attendance: value } : item)));
  };

  const [confirmPerson, setConfirmPerson] = useState();

  const selectConfirm = (value: any) => {
    setConfirmPerson(value);
  };

  const submit = () => {
    let submitData: any = {};

    const temp = value;

    temp.forEach((item: any) => {
      item.commuteDate = dayjs(item.commuteDate).format("YYYY-MM-DD");
    });

    submitData.leaveInfo = temp;
    submitData.confirmPersonIdx = confirmPerson;

    leave(
      { dto: submitData },
      {
        onError: (error: any) => {
          notification({ color: "red", title: "휴가 신청", message: "휴가 신청 중 오류가 발생하였습니다." });
        },
        onSuccess: (data: any) => {
          notification({ color: "green", title: "휴가 신청 완료", message: "결재자의 승인을 기다려주세요." });
          close();
        },
      }
    );
  };

  return (
    <Drawer opened={opened} onClose={close} position="right" title="휴가 신청하기">
      <DatePicker
        highlightToday
        locale="ko"
        type="multiple"
        firstDayOfWeek={0}
        onChange={selectDate}
        style={{ width: "100%" }}
        styles={{
          month: { width: "100%" },
          calendarHeader: { maxWidth: "unset" },
        }}
        renderDay={(date) => {
          const day = date.getDate();
          const isToday = dayjs(date).isSame(dayjs(), "day");
          if (day === 14) {
            return (
              <Indicator color="yellow" position="top-end" size={10} offset={-5}>
                <div>{day}</div>
              </Indicator>
            );
          }
          if (day === 15) {
            return (
              <Indicator color="blue" position="top-end" size={10} offset={-5}>
                <div>{day}</div>
              </Indicator>
            );
          }
          return (
            <Indicator color="yellow" position="top-end" size={12} processing offset={-5} disabled={!isToday}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
      <Text my={"sm"}>신청정보</Text>
      <Stack>
        {value.length < 1 ? (
          <Text c={"dimmed"} fz={"sm"} ta={"center"}>
            캘린더에서 일자를 선택해 주세요.
          </Text>
        ) : (
          <Stack gap={4}>
            <Group>
              <Text w={111} c={"dimmed"} fz={"sm"}>
                신청일
              </Text>
              <Text c={"dimmed"} fz={"sm"}>
                유형
              </Text>
            </Group>
            <Stack gap={"xs"}>
              {value.map((item: any, index: number) => (
                <Group wrap="nowrap" key={index}>
                  <Input value={dayjs(item.commuteDate).format("YYYY-MM-DD")} readOnly variant="unstyled" size="md" />

                  <Select
                    checkIconPosition="right"
                    size="sm"
                    placeholder="휴가 유형을 선택해 주세요."
                    clearable
                    onChange={(e) => attendance(e, item.commuteDate)}
                    //   value={item.attendance}
                    w={"100%"}
                    data={[
                      {
                        group: "일반휴가",
                        items: Object.values(ATTENDANCE_OPTIONS_NORMAL),
                      },
                      {
                        group: "특이사항",
                        items: Object.values(ATTENDANCE_OPTIONS_REMARK),
                      },
                    ]}
                  />
                </Group>
              ))}
            </Stack>
          </Stack>
        )}
        <Divider />

        <Select
          styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
          size="sm"
          label="승인자 선택"
          placeholder="결재 담당자를 선택해 주세요."
          data={[
            { value: "1", label: "김대리" },
            { value: "2", label: "박대리" },
          ]}
          clearable
          checkIconPosition="right"
          onChange={selectConfirm}
        />
        {file && (
          <Text size="xs" ta="center" mt="sm">
            파일명: {file.name}
          </Text>
        )}
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button variant="light" {...props}>
              첨부사진 올리기
            </Button>
          )}
        </FileButton>

        <Button fullWidth onClick={submit}>
          신청하기
        </Button>
      </Stack>
    </Drawer>
  );
}

export default Vacation;
