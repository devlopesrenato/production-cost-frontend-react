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
    position: sticky;
`

const STBody = styled.tbody`
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
    overflow-y: auto;
    max-height: calc(100vh - 180px);
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
    position: sticky;
    border-radius: 10px 10px 0 0;
`

const STCell = styled.tr<{ align: string | undefined }>`
    display: flex;
    justify-content: ${({ align }) => align};
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
`

const STHeaderCellContent = styled.div<{ align: string | undefined }>`
    width: 100%;
    display: flex;
    justify-content: ${({ align }) => align};
    font-weight: bold;
    `

const STHeaderCell = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundHoverHeadTable};
        cursor: pointer;
    }
`

export {
    STable,
    STHead,
    STBody,
    STRow,
    STCell,
    STHeaderCell,
    STHeaderCellContent,
    STHeadRow,
}