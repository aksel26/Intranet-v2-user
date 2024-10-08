"use client";
import { Button, Flex, Select, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

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
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Flex direction={"column"} rowGap={10}>
      <Tabs defaultValue="lunch">
        <Tabs.List grow>
          <Tabs.Tab value="breakfast">조식</Tabs.Tab>
          <Tabs.Tab value="lunch">중식</Tabs.Tab>
          <Tabs.Tab value="dinner">석식</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="breakfast">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex direction={"column"} rowGap={10} py={"md"}>
              <Select
                label="결제자"
                placeholder="결제자를 선택해 주세요."
                data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
                key={form.key("breakfast-")}
                {...form.getInputProps("email")}
                searchValue={searchValue}
                onSearchChange={handleSearchChange} // 검색 입력 시 드롭다운 제어
                dropdownOpened={opened} // 드롭다운 열림 여부 상태로 관리
                onDropdownClose={() => setOpened(false)} // 드롭다운 닫기
              />
              <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
              <TextInput label="금액" placeholder="금액을 입력해 주세요." />
            </Flex>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="lunch">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex direction={"column"} rowGap={10} py={"md"}>
              <Select
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
              />
              <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
              <TextInput label="금액" placeholder="금액을 입력해 주세요." />
              <Select
                label="근태"
                placeholder="근태 유형을 선택해 주세요."
                data={["근무", "반차", "휴가", "재택근무"]}
                searchable
                styles={{
                  dropdown: {
                    zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
                  },
                }}
              />
            </Flex>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="dinner">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex direction={"column"} rowGap={10} py={"md"}>
              <Select
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
              />
              <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
              <TextInput label="금액" placeholder="금액을 입력해 주세요." />
            </Flex>
          </form>
        </Tabs.Panel>
      </Tabs>

      <Button>저장하기</Button>
    </Flex>
  );
}
