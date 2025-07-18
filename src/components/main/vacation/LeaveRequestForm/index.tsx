import {
  Badge,
  Box,
  Button,
  Drawer,
  FileButton,
  Group,
  Indicator,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LEAVE_TYPE } from "@/lib/enums/leaveType/leaveType";
import { getWeekdaysBetweenDates } from "@/utils/date/excludeWeekends";
import notification from "@/components/common/notification";
import { getLeaveTypeKey } from "@/utils/leave/getLeaveTypeByKey";
import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { MousePointerClick } from "lucide-react";
import VacationConfirmModal from "./confirm";
import AttachmentPreview from "./preview";
import LeaveTypeBox from "./leaveTypeBox";
import { useApiQuery } from "@/api/useApi";
import { userService } from "@/api/services/user/user.services";
import { leaveService } from "@/api/services/leave/leave.services";
import ToolTipDetailsVacation from "@/components/common/tooltip/ToolTipDetailsVacation";

type TDateRange = [string | null, string | null];
type TSelect = { value: string | undefined; label: string | undefined };
function Vacation({ opened, close }: any) {
  const [params, setParams] = useState<TYearMonth>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  });

  const { data, isLoading, isError } = useApiQuery(
    ["users"],
    userService.getAll
  );

  const {
    data: vacations,
    isLoading: isLoading_vacations,
    isError: isError_vacations,
  } = useApiQuery(["vacationAll", params], () =>
    leaveService.getLeaves(params)
  );

  const {
    data: vacationSummary,
    isLoading: isLoading_vacationSummary,
    isError: isError_vacationSummary,
  } = useApiQuery(["vacationSummary", { year: params.year }], () =>
    leaveService.getLeaveSummary({ year: params.year })
  );

  const leaveUsageStats = vacationSummary?.data.data.leaveUsageStats || {};

  const commuteData = vacations?.data.data;

  const [confirmList, setConfirmList] = useState([]);

  const [dateValue, setDateValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const [confirmPerson, setConfirmPerson] = useState<any[]>();

  const [attendance, setAttendance] = useState<string | number>(
    LEAVE_TYPE.연차
  );

  const [file, setFile] = useState<File | null>(null);

  const [submitInfo, setSubmitInfo] = useState();

  const [note, setNote] = useState("");

  const handleNote = (e: any) => setNote(e.target.value);

  const selectDate = (date: TDateRange) => setDateValue(date);

  const [refs, setRefs] = useState<string[]>([]);
  const selectConfirm = (values: any) => {
    // setConfirmPerson(data);

    const selectedItems = values
      .map((value: any) =>
        confirmList.find((user: any) => user.userIdx + "" === value)
      )
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
    if (dateValue.some((date) => !date)) {
      notification({
        title: "휴가 신청",
        color: "yellow",
        message: "날짜를 반드시 선택해 주세요.",
      });
      return;
    }

    if (!confirmPerson) {
      notification({
        title: "휴가 신청",
        color: "yellow",
        message: "승인자를 반드시 선택해 주세요.",
      });
      return;
    }
    const submitData: any = {};
    const leaveInfo = getWeekdaysBetweenDates(dateValue, attendance);
    submitData.leaveInfo = leaveInfo;
    submitData.confirmPerson = confirmPerson.map((item: TSelect) =>
      Number(item.value)
    );
    submitData.note = note;
    submitData.ccUserIdxs = refs.map((ref) => Number(ref));

    setSubmitInfo(submitData);

    openSubmitConfirm();
  };

  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);
  const [
    submitConfirm,
    { open: openSubmitConfirm, close: closeSubmitConfirm },
  ] = useDisclosure(false);
  const [preview, { open: openPreview, close: closePreview }] =
    useDisclosure(false);

  const renderDay = (date: any) => {
    const day = dayjs(date).date();

    // Format date to match the format in commuteData
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    // Find if this date is in the commuteData
    const commuteEntry = commuteData?.find(
      (entry: any) => entry.commuteDate === formattedDate
    );

    if (commuteEntry) {
      // If commuteDate exists, show blue indicator for confirmYN="Y", yellow for "N"
      const indicatorColor = commuteEntry.confirmYN === "Y" ? "blue" : "yellow";

      return (
        <Indicator
          color={indicatorColor}
          position="top-end"
          size={10}
          offset={-5}
        >
          <div>{day}</div>
        </Indicator>
      );
    }

    // For dates without commuteData, show a processing indicator only if it's today
  };

  const isWeekend = (date: any) => {
    const day = dayjs(date).day();
    return day === 0 || day === 6; // 0: 일요일, 6: 토요일
  };
  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      position="right"
      title="휴가 신청하기"
    >
      <DatePicker
        highlightToday
        type="range"
        locale="ko"
        allowSingleDateInRange
        excludeDate={isWeekend}
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

      <Group justify="space-between" align="center">
        <ToolTipDetailsVacation details={leaveUsageStats}>
          <Button
            variant="subtle"
            size="compact-xs"
            leftSection={<MousePointerClick strokeWidth={1.2} size={18} />}
          >
            휴가 사용현황 보기
          </Button>
        </ToolTipDetailsVacation>

        <Group>
          <Group gap={5}>
            <Box w={10} h={10} style={{ borderRadius: "50%" }} bg={"yellow"} />
            <Text fz={"xs"}>미승인</Text>
          </Group>
          <Group gap={5}>
            <Box w={10} h={10} style={{ borderRadius: "50%" }} bg={"blue"} />
            <Text fz={"xs"}>승인</Text>
          </Group>
        </Group>
      </Group>

      <Group my={"sm"} align="center" mt={"lg"}>
        <Text fz={"sm"}>휴가 선택</Text>
        <Badge color="blue" variant="light" radius="sm">
          {getLeaveTypeKey(attendance)}
        </Badge>
      </Group>

      <LeaveTypeBox attendance={attendance} setAttendance={setAttendance} />

      <MultiSelect
        my={"md"}
        styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
        size="sm"
        label="승인자 선택"
        placeholder="결재 담당자를 선택해 주세요."
        data={confirmList?.map((user: any) => ({
          value: user.userIdx + "",
          label: user.userName,
        }))}
        clearable
        checkIconPosition="right"
        onChange={selectConfirm}
        // value={confirmPerson?.value + ""}
        searchable
      />
      <MultiSelect
        mb={"md"}
        styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
        size="sm"
        label="참조자 선택"
        placeholder="참조인원을 선택해 주세요."
        data={data?.data.data?.map((user: any) => ({
          value: user.userIdx + "",
          label: user.userName,
        }))}
        clearable
        checkIconPosition="right"
        onChange={selectRefs}
        searchable
        // value={confirmPerson?.value + ""}
      />

      <TextInput
        mb={"md"}
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
