import { Button, Group, Modal, MultiSelect, Select, Stack, Textarea, TextInput } from "@mantine/core";

const ReserveModal = ({ opened, close }: any) => {
  return (
    <Modal opened={opened} onClose={close} title="회의실 예약하기" centered>
      <Stack gap={"md"}>
        <Group align="center" wrap="nowrap">
          <TextInput
            label="예약자"
            value={"김현민"}
            readOnly
            w={100}
            size="compact-xs"
            variant="unstyled"
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          />
          <TextInput
            label="회의 시간"
            value={"12:00 ~ 13:00"}
            readOnly
            size="compact-xs"
            variant="unstyled"
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          />
          <TextInput
            label="회의실"
            value={"G Room"}
            readOnly
            size="compact-xs"
            variant="unstyled"
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          />
        </Group>
        <TextInput
          label="회의 주제"
          placeholder="회의의 주제를 입력해 주세요."
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
        />
        <Select
          label="회의 유형"
          placeholder="회의유형을 선택해 주세요."
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          data={[
            { value: "회의", label: "회의" },
            { value: "교육", label: "교육" },
            { value: "세미나", label: "세미나" },
          ]}
        />
        <MultiSelect
          searchable
          label="참석자"
          placeholder="참석자를 선택해 주세요."
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          data={[
            { value: "김김김", label: "김김김" },
            { value: "우우우", label: "우우우" },
            { value: "석석석", label: "석석석" },
          ]}
        />

        <Textarea
          placeholder="회의 내용을 입력해 주세요."
          label="내용"
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          minRows={4}
          autosize
        />
        <Group align="center" wrap="nowrap" mt={"xs"}>
          <Button fullWidth>등록하기</Button>
          <Button fullWidth variant="light" color="gray" onClick={close}>
            닫기
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ReserveModal;
