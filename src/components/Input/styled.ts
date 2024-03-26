import styled from "styled-components";


const SInput = styled.input`
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
    &:hover, &:focus-within {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
        outline: 0;
    }
`

const SInputPassword = styled.div`
    display: flex;
    align-items: center;
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
    gap: 5px;
    &:hover, &:focus-within {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
        outline: 0;
    }
    svg {
        color: #8c8c8c;
        font-size: 16px;
        &:hover {
            cursor: pointer;
        }
    }
`

const SInputNumber = styled.div`
    display: flex;
    align-items: center;
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
    gap: 5px;
    &:hover, &:focus-within {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
        outline: 0;
    }
    svg {
        color: #8c8c8c;
        font-size: 16px;
        &:hover{
            color: #1677ff;
        }
    }
`

const SInputInternal = styled.input`
    outline: 0;
    border: 0;
    width: 100%;
    font-size: 14px;
    height: 22px;
`

const SButton = styled.button`
    outline: 0;
    border: 0;
    background-color: transparent;
    display: flex;
    &:hover {
        cursor: pointer;
    }
    &:disabled {
        cursor: not-allowed;
    }
`

export {
    SInput,
    SInputPassword,
    SInputNumber,
    SInputInternal,
    SButton,
}