"use client";
import { Button, Flex, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Select from "react-select";

export default function MealInputForm() {
  const [opened, setOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setOpened(value.length > 0); // 입력이 시작되면 드롭다운 열기
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      "breakfast-payerName": "",
      "breakfast-place": "",
      "breakfast-price": "",
    },

    // validate: {
    //   "breakfast-payerName": (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Flex direction={"column"} rowGap={10} className="modal-parent-portal">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Tabs defaultValue="lunch">
          <Tabs.List grow>
            <Tabs.Tab value="breakfast">조식</Tabs.Tab>
            <Tabs.Tab value="lunch">중식</Tabs.Tab>
            <Tabs.Tab value="dinner">석식</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="breakfast">
            <Flex direction={"column"} rowGap={10} py={"md"}>
              {/* <Select
                label="결제자"
                placeholder="결제자를 선택해 주세요."
                data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
                comboboxProps={{
                  // position: "bottom",
                  middlewares: { flip: true, shift: true },
                  // Modal의 portal container를 target으로 지정
                  portalProps: {
                    target: ".modal-parent-portal",
                  },
                }}
                key={form.key("breakfast-payerName")}
                {...form.getInputProps("breakfast-payerName")}
                searchValue={searchValue}
                onSearchChange={handleSearchChange} // 검색 입력 시 드롭다운 제어
                dropdownOpened={opened} // 드롭다운 열림 여부 상태로 관리
                onDropdownClose={() => setOpened(false)} // 드롭다운 닫기
              /> */}
              <Select options={options} />

              <TextInput
                key={form.key("breakfast-place")}
                {...form.getInputProps("breakfast-place")}
                label="식당명"
                placeholder="식당 상호명을 입력해 주세요."
              />
              <TextInput key={form.key("breakfast-price")} {...form.getInputProps("breakfast-price")} label="금액" placeholder="금액을 입력해 주세요." />
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="lunch">
            <Flex direction={"column"} rowGap={10} py={"md"}>
              {/* <Select
                label="결제자"
                placeholder="결제자를 선택해 주세요."
                data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
                searchValue={searchValue}
                onSearchChange={handleSearchChange} // 검색 입력 시 드롭다운 제어
                dropdownOpened={opened} // 드롭다운 열림 여부 상태로 관리
                onDropdownClose={() => setOpened(false)} // 드롭다운 닫기
              /> */}
              <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
              <TextInput label="금액" placeholder="금액을 입력해 주세요." />
              {/* <Select
                label="근태"
                placeholder="근태 유형을 선택해 주세요."
                data={["근무", "반차", "휴가", "재택근무"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
              /> */}
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="dinner">
            <Flex direction={"column"} rowGap={10} py={"md"}>
              {/* <Select
                label="결제자"
                placeholder="결제자를 선택해 주세요."
                data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
                searchValue={searchValue}
                onSearchChange={handleSearchChange} // 검색 입력 시 드롭다운 제어
                dropdownOpened={opened} // 드롭다운 열림 여부 상태로 관리
                onDropdownClose={() => setOpened(false)} // 드롭다운 닫기
              /> */}
              <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
              <TextInput label="금액" placeholder="금액을 입력해 주세요." />
            </Flex>
          </Tabs.Panel>
        </Tabs>

        <Button type="submit">저장하기</Button>
      </form>
    </Flex>
  );
}
