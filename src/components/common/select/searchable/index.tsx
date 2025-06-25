import { userService } from "@/api/services/user/user.services";
import { useApiQuery } from "@/api/useApi";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

const SearchableSelect = ({ form, formKey, type }: any) => {
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["users"],
  //     queryFn: () => api.getUsers(),
  //   });
  const { data, isLoading, isError } = useApiQuery(["users"], userService.getAll);

  const users = data?.data?.data.map((user: any) => user.userName) || [];

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState(form.values[type].payerName || "");

  useEffect(() => {
    const payerName = form.values[type].payerName || "";
    setSearch(payerName || "");
  }, [type]);

  const shouldFilterOptions = users?.every((item: string) => item !== search);
  const filteredOptions = shouldFilterOptions ? users?.filter((item: string) => item.includes(search.trim())) : users;

  const options = filteredOptions.map((item: string) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        form.setFieldValue(formKey, val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="결제자"
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder="결제자 정보를 입력해 주세요."
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchableSelect;
