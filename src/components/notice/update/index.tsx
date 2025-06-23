import { Button, FileInput, Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Calendar, Upload } from "lucide-react";
// import { IconCalendar, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

const ModifyNotice = ({ opened, close, details }: any) => {
  //

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: details?.title,
      content: "",
    },
  });
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([null, null]);

  const dateSelect = (val: [Date | null, Date | null]) => {
    setDateValue(val);
  };

  const [file, setFile] = useState<File | null>(null);
  if (!details) return null;
  return (
    <Modal opened={opened} onClose={close} title="공지/일정 수정" centered>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap={"xs"}>
          <TextInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="제목"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            // label="조회기간"
            type="range"
            locale="ko"
            highlightToday
            firstDayOfWeek={0}
            clearable
            label="일자 & 시간"
            allowSingleDateInRange
            placeholder="조회일자를 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            valueFormat="YYYY/MM/DD"
            leftSection={<Calendar size={20} strokeWidth={1.2} />}
            onChange={dateSelect}
            value={dateValue}
          />
          <TextInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="장소"
          />

          <Select
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="참석자"
            data={["g", "sdf", "sdfsdf", "df"]}
            // comboboxProps={{
            //   withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            //   transitionProps: { transition: "pop", duration: 200 },
            //   size: "sm",
            // }}
            // onChange={selectYear}
            // value={yearValue}
            // data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
            // size="md"
            // variant="unstyled"
            // fw={600}
            // dropdownOpened={isActive}
            // onBlur={() => setIsActive(false)}
            // onClick={() => setIsActive(true)}
          />
          <Select
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="참조"
            data={["g", "sdf", "sdfsdf", "df"]}
            // comboboxProps={{
            //   withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            //   transitionProps: { transition: "pop", duration: 200 },
            //   size: "sm",
            // }}
            // onChange={selectYear}
            // value={yearValue}
            // data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
            // size="md"
            // variant="unstyled"
            // fw={600}
            // dropdownOpened={isActive}
            // onBlur={() => setIsActive(false)}
            // onClick={() => setIsActive(true)}
          />

          <Select
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="차량 사용"
            data={["미사용", "회사차", "렌트카", "자가용"]}
            // comboboxProps={{
            //   withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            //   transitionProps: { transition: "pop", duration: 200 },
            //   size: "sm",
            // }}
            // onChange={selectYear}
            // value={yearValue}
            // data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
            // size="md"
            // variant="unstyled"
            // fw={600}
            // dropdownOpened={isActive}
            // onBlur={() => setIsActive(false)}
            // onClick={() => setIsActive(true)}
          />

          <Textarea
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="내용"
            autosize
            minRows={4}
            key={form.key("content")}
            {...form.getInputProps("content")}
          />

          <FileInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            clearable
            leftSection={<Upload size={17} strokeWidth={1.2} />}
            label="첨부파일"
            placeholder="첨부파일을 업로드 해주세요."
          />
          <Button fullWidth type="submit">
            수정하기
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModifyNotice;
