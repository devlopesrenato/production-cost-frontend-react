import styled from "styled-components";

const STableContainer = styled.div`
    max-width: 95vw;
    min-width: 250px;
`

const STableExtra = styled.div`
    width: 100%;
`

const STable = styled.table<{ $hasData?: "true" | "false", $overflowY?: "auto" | "hidden", $overflowX?: "auto" | "hidden", $maxHeight?: number }>`
    table-layout: fixed;
    text-align: start;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: ${({ $maxHeight }) => $maxHeight ? $maxHeight + 'px' : 'calc(100vh - 180px)'};
    min-height: ${({ $hasData }) => $hasData === "true" ? '300px' : '100px'};
    overflow-y: ${({ $overflowY }) => $overflowY};
    overflow-x: ${({ $overflowX }) => $overflowX};
`

const STHead = styled.thead<{ $width: number }>`
    min-width: ${({ $width }) => $width}px;
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    position: sticky;
    top: 0;
    z-index: 1000;
`

const STHeadRow = styled.tr`
    display: flex;    
    position: sticky;
    border-radius: 10px 10px 0 0;
`

const STHeaderCell = styled.th<{ $hover: "true" | "false" }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    &:hover {
        background-color: ${({ theme, $hover }) => $hover === "true" ? theme.colors.backgroundHoverHeadTable : ''};
        cursor:  ${({ $hover }) => $hover === "true" ? 'pointer' : ''} ;
    }
`

const STHeaderCellContent = styled.div<{ $align: string | undefined }>`
    width: 100%;
    display: flex;
    justify-content: ${({ $align }) => $align};
    font-weight: bold;
`

const STBody = styled.tbody<{ $hasData?: "true" | "false", $width: number }>`
    background-color: ${({ theme }) => theme.colors.backgroundHeadTable};
    min-height: ${({ $hasData }) => $hasData === "true" ? '10px' : '100px'};
    min-width: ${({ $width }) => $width}px;
`

const STRow = styled.tr`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderTable};
    &:hover {
        td {
            background-color:  ${({ theme }) => theme.colors.backgroundHoverRowTable};
        }
        background-color:  ${({ theme }) => theme.colors.backgroundHoverRowTable};
    }
`

const STCell = styled.td<{ $align: string | undefined }>`
    display: flex;
    justify-content: ${({ $align }) => $align};    
    align-items: center;
    text-align: ${({ $align }) => $align};
    padding: 10px;
    color: ${({ theme }) => theme.colors.textColor};   
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
`

const NoData = styled.td`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 70%;
    left: 50%; 
    margin: -28.5px;
    svg {
        font-size: 30px;
    }
`

export {
    STableContainer,
    STable,
    STableExtra,
    STHead,
    STBody,
    STRow,
    STCell,
    STHeaderCell,
    STHeaderCellContent,
    STHeadRow,
    NoData,
}