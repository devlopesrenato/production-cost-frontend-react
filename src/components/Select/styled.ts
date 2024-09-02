import styled from "styled-components";

const SSelect = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
  color: #000;  
`;

const SelectBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5.5px 11px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  &:hover,
  &:focus-within {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }
`;

const SelectedValue = styled.div`
  flex: 1;
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

const SearchInput = styled.input`
  box-sizing: border-box;
  background: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  padding: 4px 11px;
  line-height: 1.5;
  width: 100%;
  min-width: 0;
  transition: all 0.2s;
  margin-bottom: 5px;
  outline: 0;
  &:hover,
  &:focus-within {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }
`;

const Options = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
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
  SelectedValue,
  DropdownMenu,
  SearchInput,
  Arrow,
  Options,
  Option,
};
