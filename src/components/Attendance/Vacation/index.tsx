"use client";

import * as api from "@/app/api/get/getApi";
import { LEAVE_TYPE } from "@/lib/enums";
import { getWeekdaysBetweenDates } from "@/utils/vacationDate";
import { Box, Button, Drawer, FileButton, Group, Indicator, MultiSelect, Select, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import notification from "../../GNB/Notification";
import LeaveTypeBox from "../LeaveTypeBox";
import VacationConfirmModal from "../VacationConfirmModal";
import { getLeaveTypeKey } from "@/utils/leaveTypeKey";
import { TYearMonth } from "@/types/apiTypes";
import AttachmentPreview from "./attachment";

type TDateRange = [Date | null, Date | null];
type TSelect = { value: string | undefined; label: string | undefined };
function Vacation({ opened, close }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });
  const [params, setParams] = useState<TYearMonth>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  });
  const {
    data: vacations,
    isLoading: isLoading_vacations,
    isError: isError_vacations,
  } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => api.getMyVacations(params) });

  const commuteData = vacations?.data.data;

  const [confirmList, setConfirmList] = useState([]);

  const [dateValue, setDateValue] = useState<TDateRange>([null, null]);

  const [confirmPerson, setConfirmPerson] = useState<any[]>();

  const [attendance, setAttendance] = useState<string | number>(LEAVE_TYPE.연차);

  const [file, setFile] = useState<File | null>(null);

  const [submitInfo, setSubmitInfo] = useState();

  const [note, setNote] = useState("");

  const handleNote = (e: any) => setNote(e.target.value);

  const selectDate = (date: TDateRange) => setDateValue(date);

  const [refs, setRefs] = useState<string[]>([]);
  const selectConfirm = (values: any) => {
    // setConfirmPerson(data);

    const selectedItems = values
      .map((value: any) => confirmList.find((user: any) => user.userIdx + "" === value))
      .map((user: any) => ({
        value: user.userIdx + "",
        label: user.userName,
      }));

    // Now pass the full objects to your handler
    setConfirmPerson(selectedItems);
    // console.log(data);
  };
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
    submitData.confirmPerson = confirmPerson.map((item: TSelect) => Number(item.value));
    submitData.note = note;
    submitData.ccUserIdxs = refs.map((ref) => Number(ref));

    setSubmitInfo(submitData);

    openSubmitConfirm();
  };

  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);
  const [submitConfirm, { open: openSubmitConfirm, close: closeSubmitConfirm }] = useDisclosure(false);
  const [preview, { open: openPreview, close: closePreview }] = useDisclosure(false);

  const renderDay = (date: any) => {
    const day = date.getDate();

    // Format date to match the format in commuteData
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    // Find if this date is in the commuteData
    const commuteEntry = commuteData.find((entry: any) => entry.commuteDate === formattedDate);

    if (commuteEntry) {
      // If commuteDate exists, show blue indicator for confirmYN="Y", yellow for "N"
      const indicatorColor = commuteEntry.confirmYN === "Y" ? "blue" : "yellow";

      return (
        <Indicator color={indicatorColor} position="top-end" size={10} offset={-5}>
          <div>{day}</div>
        </Indicator>
      );
    }

    // For dates without commuteData, show a processing indicator only if it's today
  };

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
        level="month"
        // style={{ width: "100%" }}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        styles={{
          month: { width: "100%", height: 300 },
          day: { width: "100%", height: "100%" },

          calendarHeader: { maxWidth: "unset" },
        }}
        renderDay={renderDay}
      />

      <Group justify="end">
        <Group gap={5}>
          <Box w={10} h={10} style={{ borderRadius: "50%" }} bg={"yellow"} />
          <Text fz={"xs"}>미승인</Text>
        </Group>
        <Group gap={5}>
          <Box w={10} h={10} style={{ borderRadius: "50%" }} bg={"blue"} />
          <Text fz={"xs"}>승인</Text>
        </Group>
      </Group>

      <Group my={"sm"} align="end">
        <Text>휴가 선택</Text>
        <Text fz={"sm"} c={"dimmed"}>
          {getLeaveTypeKey(attendance)}
        </Text>
      </Group>

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

      <TextInput
        mb={"sm"}
        styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
        label="특이사항 입력"
        placeholder="특이사항을 입력해 주세요."
        onChange={handleNote}
        value={note}
      />

      <Group mb={"sm"}>
        {file && (
          <Button fullWidth variant="subtle" onClick={openPreview}>
            파일명: {file.name}
          </Button>
        )}
      </Group>
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

      <VacationConfirmModal
        opened={submitConfirm}
        close={closeSubmitConfirm}
        closeDrawer={closeDrawer}
        confirmPerson={confirmPerson}
        submitInfo={submitInfo}
        file={file}
      />
      <AttachmentPreview opened={preview} close={closePreview} file={file} />
    </Drawer>
  );
}

export default Vacation;
