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
  click: (data: { column: string; value: string }) => void;
  clearall: () => void;
}

const Search: React.FC<SearchProps> = ({ column, search, click, clearall }) => {
  const [open, setOpen] = useState<boolean>(false);
  const data = search.find(({ column: name }) => name === column);
  const [value, setValue] = useState(data?.value || "");
  const dropDownRef = useRef<HTMLDivElement>(null);
  const areaSearchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
      click && click({ column, value: newValue });
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
              placeholder="Search"
              value={value}
              onChange={({ target }) => setValue(target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" ? handleFind(value) : null;
              }}
            />
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
export default Search;
