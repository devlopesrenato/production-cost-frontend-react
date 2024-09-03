import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import {
  Arrow,
  DropdownMenu,
  Option,
  Options,
  SearchInput,
  SelectBox,
  SSelect,
} from "./styled";
import { Loading } from "../Loading";

type SelectDataType = {
  key: string | number;
  label: string;
};

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  data: SelectDataType[];
  onChange?: any;
  disabled?: boolean;
  value?: any;
  loading?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  data,
  onChange,
  disabled,
  value,
  loading,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string | undefined>(value);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const [filteredData, setFilteredData] = useState<SelectDataType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text) {
      setSelectedValue(undefined);
      onChange && onChange();
    }
    setFilteredData(
      selectedValue || !text
        ? data
        : data.filter((item) =>
            item.label.toLowerCase().includes(text.toLowerCase())
          )
    );
  }, [text, data]);

  useEffect(() => {
    const item = data.find(
      ({ label, key }) =>
        label.toLowerCase().includes(value) ||
        String(key).toLowerCase().includes(value)
    );
    if (item) {
      setText(item.label);
      setSelectedValue(item.key.toString());
      onChange && onChange(item.key.toString(), item);
    }
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      console.log({ selectedValue });
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      !divRef.current?.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setSelectedValue(undefined);
    onChange && onChange();
  };

  const handleOptionClick = (itemSelected: SelectDataType) => () => {
    setSelectedValue(itemSelected.key.toString());
    const labelItemSelected = data.find(
      ({ key }) => key.toString() === itemSelected.key.toString()
    )?.label;
    setText(labelItemSelected);
    setIsOpen(false);
    onChange && onChange(itemSelected.key.toString(), itemSelected);
  };

  const handleToggleDropdown = () => {
    if (!loading) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SSelect ref={divRef}>
      <SelectBox $disabled={String(loading)} onClick={handleToggleDropdown}>
        <SearchInput
          ref={inputRef}
          $disabled={String(loading)}
          type="search"
          onChange={handleSearchChange}
          value={text}
          {...rest}
        />
        {loading ? <Loading size={20} /> : <Arrow $open={String(isOpen)} />}
      </SelectBox>
      {isOpen && (
        <DropdownMenu>
          <Options>
            {filteredData.map((item) => (
              <Option
                key={item.key}
                onClick={handleOptionClick(item)}
                $selected={String(item.key == selectedValue)}
              >
                {item.label}
              </Option>
            ))}
          </Options>
        </DropdownMenu>
      )}
    </SSelect>
  );
};
