import styled from "styled-components";

const STableContainer = styled.div`
    overflow: hidden;
    max-width: 95vw;
`

const STable = styled.table<{ overflowY?: boolean, overflowX?: boolean }>`
    table-layout: fixed;
    text-align: start;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height : 50px;
    max-height: calc(100vh - 180px);
    overflow-y: ${({ overflowY }) => overflowY ? 'auto' : 'hidden'};
    overflow-x: ${({ overflowX }) => overflowX ? 'auto' : 'hidden'};
`

const STHead = styled.thead<{ width: number }>`
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    position: sticky;
    top: 0;
    z-index: 1000;
`

const STBody = styled.tbody`
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
    min-height: 100px;
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

const STHeaderCell = styled.tr<{ hover?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    &:hover {
        background-color: ${({ theme, hover }) => hover ? theme.colors.backgroundHoverHeadTable : ''};
        cursor:  ${({ hover }) => hover ? 'pointer' : ''} ;
    }
`

export {
    STableContainer,
    STable,
    STHead,
    STBody,
    STRow,
    STCell,
    STHeaderCell,
    STHeaderCellContent,
    STHeadRow,
}