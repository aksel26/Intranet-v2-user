"use client";

import * as api from "@/app/api/get/getApi";
import { LEAVE_TYPE } from "@/lib/enums";
import { getWeekdaysBetweenDates } from "@/utils/vacationDate";
import { Button, Drawer, FileButton, Indicator, MultiSelect, Select, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import notification from "../GNB/Notification";
import LeaveTypeBox from "./LeaveTypeBox";
import VacationConfirmModal from "./VacationConfirmModal";

type TDateRange = [Date | null, Date | null];
type TSelect = { value: string | undefined; label: string | undefined };
function Vacation({ opened, close }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });

  const [confirmList, setConfirmList] = useState([]);

  const [dateValue, setDateValue] = useState<TDateRange>([null, null]);

  const [confirmPerson, setConfirmPerson] = useState<string[]>();

  const [attendance, setAttendance] = useState<string | number>(LEAVE_TYPE.연차);

  const [file, setFile] = useState<File | null>(null);

  const [submitInfo, setSubmitInfo] = useState();

  const selectDate = (date: TDateRange) => setDateValue(date);

  const [refs, setRefs] = useState<string[]>([]);
  const selectConfirm = (data: any) => setConfirmPerson(data);
  const selectRefs = (data: any) => setRefs(data);

  const resetState = () => {
    setDateValue([null, null]);
    setConfirmPerson(undefined);
    setAttendance(LEAVE_TYPE.연차);
    setFile(null);
  };

  const closeDrawer = () => {
    resetState();
    close();
  };

  const submit = () => {
    let submitData: any = {};

    if (dateValue.some((date: Date | null) => !date)) {
      notification({ title: "휴가 신청", color: "yellow", message: "날짜를 반드시 선택해 주세요." });
      return;
    }

    if (!confirmPerson) {
      notification({ title: "휴가 신청", color: "yellow", message: "승인자를 반드시 선택해 주세요." });
      return;
    }

    const leaveInfo = getWeekdaysBetweenDates(dateValue, attendance);
    submitData.leaveInfo = leaveInfo;
    submitData.confirmPerson = confirmPerson;
    submitData.ccUserIdxs = refs.map((ref) => Number(ref));

    setSubmitInfo(submitData);

    openSubmitConfirm();
  };

  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);

  const [submitConfirm, { open: openSubmitConfirm, close: closeSubmitConfirm }] = useDisclosure(false);

  return (
    <Drawer opened={opened} onClose={closeDrawer} position="right" title="휴가 신청하기">
      <DatePicker
        highlightToday
        type="range"
        locale="ko"
        allowSingleDateInRange
        // type="multiple"
        value={dateValue}
        firstDayOfWeek={0}
        onChange={selectDate}
        // style={{ width: "100%" }}
        styles={{
          month: { width: "100%", height: 300 },
          day: { width: "100%", height: "100%" },

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
      <Text my={"sm"}>휴가 선택</Text>

      <LeaveTypeBox attendance={attendance} setAttendance={setAttendance} />

      <MultiSelect
        mb={"sm"}
        styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
        size="sm"
        label="승인자 선택"
        placeholder="결재 담당자를 선택해 주세요."
        data={confirmList?.map((user: any) => ({ value: user.userIdx + "", label: user.userName }))}
        clearable
        checkIconPosition="right"
        onChange={selectConfirm}
        // value={confirmPerson?.value + ""}
        searchable
      />
      <MultiSelect
        mb={"sm"}
        styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
        size="sm"
        label="참조자 선택"
        placeholder="참조인원을 선택해 주세요."
        data={data?.data.data?.map((user: any) => ({ value: user.userIdx + "", label: user.userName }))}
        clearable
        checkIconPosition="right"
        onChange={selectRefs}
        searchable
        // value={confirmPerson?.value + ""}
      />
      {file && (
        <Text size="xs" ta="center" mt="sm">
          파일명: {file.name}
        </Text>
      )}
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => (
          <Button variant="light" {...props} size="sm" fullWidth mb={"sm"}>
            첨부사진 올리기
          </Button>
        )}
      </FileButton>

      <Button fullWidth onClick={submit}>
        신청하기
      </Button>

      <VacationConfirmModal opened={submitConfirm} close={closeSubmitConfirm} closeDrawer={closeDrawer} submitInfo={submitInfo} />
    </Drawer>
  );
}

export default Vacation;
