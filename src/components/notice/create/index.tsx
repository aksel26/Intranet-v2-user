import { Button, Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Calendar } from "lucide-react";
//   import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

const CreateNotice = ({ opened, close }: any) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([null, null]);

  const dateSelect = (val: [Date | null, Date | null]) => {
    setDateValue(val);
  };

  return (
    <Modal opened={opened} onClose={close} title="공지/일정 등록" centered>
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
          />
          <TextInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="첨부파일"
          />
          <Button fullWidth type="submit">
            등록하기
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateNotice;
