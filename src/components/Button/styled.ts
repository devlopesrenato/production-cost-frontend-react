import styled from "styled-components";

const SButton = styled.button<{ $type?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    outline: 0;
    cursor: pointer;
    border: 1px solid;
    border-color: ${({ $type, theme }) => $type === 'primary' ? '#1677ff' : theme.colors.backgroundHeadTable};
    background-color: ${({ $type }) => $type === 'primary' ? '#1677ff' : '#FFF'};
    color: ${({ $type }) => $type === 'primary' ? '#FFF' : '#000'};
    &:hover {
        border-color: #1677ff;
        color: ${({ $type }) => $type === 'primary' ? '#FFF' : '#1677ff'};
        background-color: ${({ $type }) => $type === 'primary' ? '#1677ff5e' : '#FFFFFFd0'};
    }
    &:disabled {
        cursor: not-allowed;
        background-color: ${({ $type }) => $type === 'primary' ? '#1677ffd0' : '#FFFFFFd0'};
        border-color: ${({ $type, theme }) => $type === 'primary' ? '#1677ff' : theme.colors.backgroundHeadTable};
        color: ${({ $type }) => $type === 'primary' ? '#FFF' : '#000'};
    }
`

export { SButton }