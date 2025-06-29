import { userService } from "@/api/services/user/user.services";
import { useApiQuery } from "@/api/useApi";
import { myInfoStore } from "@/store/myInfoStore";
import type { TUsers } from "@/types/users";
import { formatYYYYMMDD } from "@/utils/date/format";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const RegistMeeting = ({ opened, close, target }: any) => {
  // const { data, isLoading, isError } = useApiQuery(
  //   ["users"],
  //   userService.getAll,
  //   { enabled: !!opened }
  // );
  // const users = data?.data.data;

  const { myInfo } = myInfoStore();

  const form = useForm({
    mode: "uncontrolled",
    // initialValues: {
    //   userAddress: "",
    //   userCell: "",
    // },
    // validate: {
    //   userCell: (value) => {
    //     if (!value) return "휴대폰 번호를 입력해주세요";
    //     if (value.replace(/-/g, "").length !== 11) {
    //       return "올바른 휴대폰 번호를 입력해주세요";
    //     }
    //     return null;
    //   },
    // },
  });

  const submit = (values: any) => {
    console.log("values: ", values);
    alert("회의실 등록");
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="회의 일정 등록"
      centered
      size={"sm"}
    >
      {/* <form onSubmit={form.onSubmit(submit)}> */}
      <Stack>
        <Paper>
          <Group justify="space-between" align="center" mt={"sm"}>
            <Stack gap={2}>
              <Text c={"gray"} fz={"sm"}>
                예약자
              </Text>
              <Text fz={"sm"}>{myInfo?.userName}</Text>
            </Stack>
            <Stack gap={2}>
              <Text c={"gray"} fz={"sm"}>
                회의실
              </Text>
              <Text fz={"sm"}>
                {target?.resource._resource.extendedProps.room}
              </Text>
            </Stack>
            <Stack gap={2}>
              <Text c={"gray"} fz={"sm"}>
                일자
              </Text>
              <Text fz={"sm"}>{formatYYYYMMDD(target?.start)}</Text>
            </Stack>
          </Group>
        </Paper>
        <TextInput
          styles={{
            label: {
              fontSize: "var(--mantine-font-size-xs",
              color: "var(--mantine-color-gray-5)",
            },
          }}
          placeholder="제목을 입력해 주세요."
          label="제목"
          // key={form.key("title")}
          // {...form.getInputProps("title")}
        />
        <Select
          placeholder="회의 유형을 선택해 주세요."
          styles={{
            label: {
              fontSize: "var(--mantine-font-size-xs",
              color: "var(--mantine-color-gray-5)",
            },
          }}
          label="회의 유형"
          data={["검사", "면접", "회의", "고객사미팅", "협력사미팅"]}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
          // key={form.key("useCar")}
          // {...form.getInputProps("useCar")}
        />

        <MultiSelect
          searchable
          placeholder="참석자를 선택해 주세요."
          styles={{
            label: {
              fontSize: "var(--mantine-font-size-xs",
              color: "var(--mantine-color-gray-5)",
            },
          }}
          label="참석자"
          data={["하나", "둘", "셋"]}
          // data={users?.map((user: TUsers) => ({
          //   value: user.userIdx.toString(),
          //   label: user.userName,
          //   searchValue: user.userName,
          // }))}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
          // key={form.key("attendeeUserIdxs")}
          // {...form.getInputProps("attendeeUserIdxs")}
        />

        <MultiSelect
          searchable
          placeholder="참조자를 선택해 주세요."
          styles={{
            label: {
              fontSize: "var(--mantine-font-size-xs",
              color: "var(--mantine-color-gray-5)",
            },
          }}
          label="침조자"
          data={["하나", "둘", "셋"]}
          // data={users?.map((user: TUsers) => ({
          //   value: user.userIdx.toString(),
          //   label: user.userName,
          //   searchValue: user.userName,
          // }))}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
          // key={form.key("attendeeUserIdxs")}
          // {...form.getInputProps("attendeeUserIdxs")}
        />
        <Textarea
          placeholder="내용을 입력해 주세요."
          styles={{
            label: {
              fontSize: "var(--mantine-font-size-xs",
              color: "var(--mantine-color-gray-5)",
            },
          }}
          label="내용"
          autosize
          minRows={4}
          // key={form.key("content")}
          // {...form.getInputProps("content")}
        />

        <Group wrap="nowrap">
          <Button fullWidth variant="light" type="submit">
            등록하기
          </Button>
          <Button fullWidth variant="light" color="gray">
            닫기
          </Button>
        </Group>
      </Stack>
      {/* </form> */}
    </Modal>
  );
};

export default RegistMeeting;
