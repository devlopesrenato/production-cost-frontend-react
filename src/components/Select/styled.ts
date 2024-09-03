import styled from "styled-components";

const SSelect = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
  color: #000;
`;

const SelectBox = styled.div<{ $disabled: string }>`
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: ${({ $disabled }) =>
    $disabled == "true" ? "not-allowed" : "pointer"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding-right: 10px;
  &:hover,
  &:focus-within {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  z-index: 100000;
  max-height: 250px;
`;

const SearchInput = styled.input<{ $disabled: string }>`
  outline: 0;
  border: 0;
  border-radius: 4px;
  background: #ffffff;
  font-size: 14px;
  padding: 4px 11px;
  width: 100%;
  min-width: 0;
  cursor: ${({ $disabled }) =>
    $disabled == "true" ? "not-allowed" : "pointer"};
`;

const Options = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div<{ $selected: string }>`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ $selected }) =>
    $selected == "true" ? "#1677ff" : ""};
  &:hover {
    background-color: ${({ $selected }) =>
      $selected == "true" ? "#1677ff" : "#f0f0f0"};
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
`;

const Arrow = styled.div<{ $open: string }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: ${({ $open }) => ($open === "true" ? 0 : "5px solid #333")};
  border-bottom: ${({ $open }) => ($open === "true" ? "5px solid #333" : "")};
`;

export {
  SSelect,
  SelectBox,
  DropdownMenu,
  SearchInput,
  Arrow,
  Options,
  Option,
};
