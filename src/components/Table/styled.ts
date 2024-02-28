import styled from "styled-components";

const STable = styled.table`
    table-layout: auto;
    text-align: start;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    max-width: 95%;
    min-width: 350px;
`

const STHead = styled.thead`
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
`

const STBody = styled.tbody`
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
`

const STRow = styled.tr`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderTable};
    &:hover {
        tr {
            background-color:  ${({ theme }) => theme.colors.backgroundHoverRowTable};
        }
        background-color:  ${({ theme }) => theme.colors.backgroundHoverRowTable};
    }
`

const STHeadRow = styled.tr`
    display: flex;    
    border-radius: 10px 10px 0 0;
`

const STCell = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
`

const STCellContent = styled.div`
    width: 100%;
    display: flex;
`

const STHeaderCell = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
`

export {
    STable,
    STHead,
    STBody,
    STRow,
    STCell,
    STHeaderCell,
    STCellContent,
    STHeadRow,
}