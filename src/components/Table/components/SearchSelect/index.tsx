import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import {
  DropDown,
  SearchButton,
  InputSearch,
  ButtonSearch,
  AreaSearch,
  ActionsArea,
  ButtonClear,
} from "./styled";

interface SearchProps {
  search: {
    column: string;
    value: string;
  }[];
  column: string;
  click: (data: { column: string; value: string; exactly: boolean }) => void;
  clearall: () => void;
  datasource: any[];
}

interface Options {
  label: string;
  key: number | string;
}

const SearchSelect: React.FC<SearchProps> = ({
  column,
  search,
  click,
  clearall,
  datasource,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const data = search.find(({ column: name }) => name === column);
  const [value, setValue] = useState(data?.value || "");
  const [options, setOptions] = useState<Options[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const areaSearchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSelectElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const color = search.find(({ column: name }) => name === column)
    ? "#6298fc"
    : "";

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    setValue(data?.value || "");
  }, [data?.value]);

  useEffect(() => {
    const optionsField: Options[] = datasource.reduce((acc, current) => {
      const field = current[column];
      if (!acc.some((item: any) => String(item.label) === String(field))) {
        acc.push({ label: String(field), key: field });
      }
      return acc;
    }, []);
    const optionsSorted = optionsField?.sort((a: Options, b: Options) =>
      a.label.localeCompare(b.label, "en-ES", { numeric: true })
    );
    setOptions(optionsSorted);
  }, [datasource]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      !buttonRef.current?.contains(event.target as Node) &&
      !dropDownRef.current?.contains(event.target as Node) &&
      !areaSearchRef.current?.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  function handleFind(newValue: string) {
    setTimeout(() => {
      click && click({ column, value: newValue, exactly: true });
      setOpen(false);
    }, 100);
  }

  return (
    <SearchButton>
      <IoSearchOutline onClick={() => setOpen(true)} color={color} />
      {open ? (
        <DropDown ref={dropDownRef}>
          <AreaSearch ref={areaSearchRef}>
            <InputSearch
              ref={inputRef}
              value={value}
              onChange={({ target }) => setValue(target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" ? handleFind(value) : null;
              }}
            >
              <option></option>
              {options.map((option) => (
                <option key={option.key}>{option.label}</option>
              ))}
            </InputSearch>
            <ButtonSearch ref={buttonRef} onClick={() => handleFind(value)}>
              <BiSearchAlt id="icon-search" /> Search
            </ButtonSearch>
          </AreaSearch>
          <ActionsArea ref={areaSearchRef}>
            <ButtonClear ref={buttonRef} onClick={clearall}>
              Clear All
            </ButtonClear>
            <ButtonClear
              ref={buttonRef}
              onClick={() => {
                setValue("");
                handleFind("");
              }}
            >
              Clear
            </ButtonClear>
          </ActionsArea>
        </DropDown>
      ) : (
        <></>
      )}
    </SearchButton>
  );
};
export default SearchSelect;
