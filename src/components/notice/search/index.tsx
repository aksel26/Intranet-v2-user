import { Button, Group, TextInput } from "@mantine/core";
import { Search } from "lucide-react";
// import { IconSearch } from "@tabler/icons-react";
import { useRef } from "react";

const SearchNotice = ({ setParams }: any) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const search = (e: any) => {
    if (e.key === "Enter" || e.key === "NumpadEnter" || e.type === "click") {
      if (searchRef.current) {
        const value = searchRef.current.value || null;
        setParams((prev: any) => ({ ...prev, searchWord: value }));
      }
    }
  };
  return (
    <Group wrap="nowrap">
      <TextInput onKeyUp={(e) => search(e)} ref={searchRef} placeholder="제목 또는 내용을 입력하세요." miw={240} leftSection={<Search size={18} />} />
      <Button onClick={search} onKeyUp={(e) => search(e)} variant="light">
        검색
      </Button>
    </Group>
  );
};

export default SearchNotice;
