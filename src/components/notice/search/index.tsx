import { searchNotice } from "@/app/api/get/getApi";
import { Combobox, Highlight, Loader, ScrollArea, TextInput, useCombobox } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const router = useRouter();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState({ searchWord: "", pageNo: 1 });

  // 디바운스 처리
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue((prev) => ({ ...prev, searchWord: value, pageNo: 1 }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notices", debouncedValue],
    queryFn: () => searchNotice(debouncedValue),
    enabled: debouncedValue.searchWord.length > 0,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });

  const options = (data?.data.data.notices || []).map((item: any) => (
    <Combobox.Option value={item.title} key={item.noticeIdx} onClick={() => movePage(item.noticeIdx)}>
      <Highlight highlight={value} size="sm">
        {item.title}
      </Highlight>
    </Combobox.Option>
  ));

  const loading = isLoading || isFetching;
  const empty = data?.data.data?.notices.length === 0;

  const movePage = (index: number) => {
    router.push(`/notice/${index}`);
  };

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          styles={{ input: { background: "white", border: "1px solid var(--mantine-color-gray-4)", position: "relative" } }}
          w={400}
          placeholder="제목 또는 내용을 입력하세요."
          radius={"md"}
          rightSection={loading ? <Loader size={18} /> : <IconSearch size={18} />}
          variant="filled"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            if (event.currentTarget.value) {
              combobox.openDropdown();
            }
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            if (value) {
              combobox.openDropdown();
            }
          }}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!data}>
        <Combobox.Options mah={200}>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options}
          </ScrollArea.Autosize>
          {empty && <Combobox.Empty>검색 결과가 없습니다</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Search;
