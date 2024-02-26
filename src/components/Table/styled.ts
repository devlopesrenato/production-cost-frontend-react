import styled, { keyframes } from "styled-components";

const STable = styled.table`
    table-layout: auto;
    text-align: start;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`

const STHead = styled.thead`
    
`

const STBody = styled.tbody`
    
`

const STRow = styled.tr`
    display: flex;
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderTable};
    &:hover {
        background-color:  ${({ theme }) => theme.colors.backgroundHoverRowTable};
    }
`

const STHeadRow = styled.tr`
    display: flex;
    background-color: ${({ theme }) => theme.colors.backgroundHoverHeadTable};
`

const STCell = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
`

const STCellContent = styled.div`
    width: 100%;
    display: flex;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Refresh = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 50px;
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
    svg {
        font-size: 35px;
        color: ${({ theme }) => theme.colors.textColor};
        animation: ${rotate} 0.9s linear infinite;
    }
`

export {
    STable,
    STHead,
    STBody,
    STRow,
    STCell,
    STCellContent,
    STHeadRow,
    Refresh
}