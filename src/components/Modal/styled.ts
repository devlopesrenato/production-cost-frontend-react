import styled from "styled-components";

const SModalBackMask = styled.div<{ $show: string }>`
    display: ${({ $show }) => $show === 'true' ? 'flex' : 'none'};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1010;
`

const SModal = styled.div<{ $show: string }>`
    display: ${({ $show }) => $show === 'true' ? 'flex' : 'none'};
    position: fixed;
    justify-content: center;
    align-items: center;
    inset: 0;
    z-index: 1010;
`

const SModalMain = styled.div<{ $show: string, $top?: string, $width?: string }>`    
    display: ${({ $show }) => $show === 'true' ? 'flex' : 'none'};    
    background-color: ${({ theme }) => theme.colors.bgModal};
    width: ${({ $width }) => $width || '500px'};
    top: ${({ $top }) => $top || '100px'};
    flex-direction: column;
    position: fixed;
    max-width: calc(100vw - 16px);
    z-index: 1011;
    padding: 20px 24px;
    border-radius: 10px;    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`

const SModalContent = styled.div`
    width: 100%;
`

const SModalCloseButton = styled.button`
    display: flex;
    position: absolute;
    top: 17px;
    inset-inline-end: 17px;
    z-index: 1010;
    color: rgba(0, 0, 0, 0.45);
    background: transparent;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    transition: color 0.2s,background-color 0.2s;
    svg {
        font-size: 20px;
    }
    &:hover {
        background-color: #D66357;        
    }
    &:disabled {
        cursor: not-allowed;
        background: transparent;
    }
`

const SModalTitle = styled.p`
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 500;
`

const SModalFooter = styled.div`
    display: flex;
    margin-top: 12px;
    justify-content: flex-end;
    gap: 5px;
`

const SModalButton = styled.button<{ $type?: string }>`
    display: flex;
    align-items: center;
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

export {
    SModalBackMask,
    SModal,
    SModalMain,
    SModalContent,
    SModalCloseButton,
    SModalTitle,
    SModalFooter,
    SModalButton,
}
