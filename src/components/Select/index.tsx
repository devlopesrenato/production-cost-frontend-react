import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Arrow,
  DropdownMenu,
  Option,
  Options,
  SearchInput,
  SelectBox,
  SelectedValue,
  SSelect,
} from "./styled";

type SelectDataType = {
  key: string | number;
  label: string;
};

interface SelectProps {
  data: SelectDataType[];
  customPlaceholder?: string;
  onChange?: (value: string, data: SelectDataType | undefined) => void;
}

export const Select: React.FC<SelectProps> = ({
  data,
  customPlaceholder,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<SelectDataType[]>([]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOptionClick = (item: SelectDataType) => () => {
    setSelectedValue(item.key.toString());
    setIsOpen(false);
    onChange && onChange(item.key.toString(), item);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SSelect>
      <SelectBox onClick={handleToggleDropdown}>
        <SelectedValue>
          {selectedValue
            ? data.find((item) => item.key.toString() === selectedValue)?.label
            : customPlaceholder}
        </SelectedValue>
        <Arrow $open={String(isOpen)} />
      </SelectBox>
      {isOpen && (
        <DropdownMenu>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <Options>
            {filteredData.map((item) => (
              <Option key={item.key} onClick={handleOptionClick(item)}>
                {item.label}
              </Option>
            ))}
          </Options>
        </DropdownMenu>
      )}
    </SSelect>
  );
};
