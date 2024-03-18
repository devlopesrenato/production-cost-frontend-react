import styled from "styled-components";

const STabs = styled.div`
    margin: 10px 0 10px 0;
`

const STabsArea = styled.div`
    margin-bottom: 16px;
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    &::before {
        bottom: 0;
        position: absolute;
        right: 0;
        left: 0;
        border-bottom: ${({ theme }) => '1px solid ' + theme.colors.backgroundGray};
        content: ' ';
    }
`
const STabsAreaList = styled.div`
    position: relative;
    display: flex;
    flex: auto;
    align-self: stretch;
    white-space: nowrap;
    transform: translate(0);
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 5px;
    }    
    &::-webkit-scrollbar-thumb {
        background: grey; 
        border-radius: 10px;        
    }
`

const SButton = styled.button<{ $active?: string }>`
    outline: 0;
    padding: 10px 15px;
    border-radius: 10px 10px 0 0;
    border: ${({ theme }) => '1px solid ' + theme.colors.backgroundGray};
    border-bottom-color: ${({ $active, theme }) =>
        $active === "true"
            ? theme.colors.bgModal
            : 'none'
    };
    color: ${({ theme, $active }) =>
        $active === "true"
            ? '#1677ff'
            : theme.colors.textColorOpaque
    };
    background-color: ${({ theme, $active }) =>
        $active === "true"
            ? 'transparent'
            : theme.colors.backgroundGray
    };
    &:hover {
        cursor: pointer;
    }
`

export {
    STabs,
    STabsArea,
    STabsAreaList,
    SButton
}