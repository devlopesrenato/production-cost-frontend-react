import styled from "styled-components";

const SearchButton = styled.div`
    display: grid;
    svg {    
        &:hover {
            color: #1677ff;
        }
    }
`

const DropDown = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: center;
    padding: 10px;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.background}; 
    border-radius: 10px;
    border: 1px solid #97979770;
    gap: 10px;
    top: 40px;
`

const AreaSearch = styled.div`
    display: flex;
    gap: 5px;
    height: 25px;     
`

const InputSearch = styled.input`
    outline: 0;
    font-size: 15px;
    width: 150px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #97979770;
    &:hover {
        border: 1px solid #1677ff;
    }
`

const ButtonSearch = styled.button`
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #1677ff;  
    border: 1px solid #97979770;  
    color: #FFFFFF;
    #icon-search {
        font-size: 20px;
        color: #FFFFFF;
    }
    &:hover {
        border: 1px solid #97979770;
        cursor: pointer;
    }
`

const ActionsArea = styled.div`
    display: flex;
    justify-content: space-between;
    height: 25px; 
`

const ButtonClear = styled.button`
    width: 65px;
    border-radius: 6px;
    border: 1px solid #97979770;
    &:hover {
        border: 1px solid #1677ff;
        cursor: pointer;
    }
`

export {
    SearchButton,
    DropDown,
    InputSearch,
    ButtonSearch,
    ButtonClear,
    AreaSearch,
    ActionsArea,
}