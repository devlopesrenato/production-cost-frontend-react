import styled, { keyframes } from 'styled-components'


const PopoverContent = styled.div`
  position: absolute;
  z-index: 99999;
`;

const Main = styled.div`        
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.bgModal};
    color: ${({ theme }) => theme.colors.textColor};
    border: 1px solid #a1a1a1;
    min-width: 180px;    
    padding: 12px;
    border-radius: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-size: 14px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const Icon = styled.div`
    svg {
        font-size: 18px;
    }
`

const Content = styled.div`
`

const Title = styled.div`
    display: flex;
    font-weight: 600;
`

const Message = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 250px;
`

const Footer = styled.div`
    display: flex;
    justify-content: end;
    padding-top: 12px;
    gap: 10px;
`

const Button = styled.button<{ $bgcolor?: string }>`
    display: flex;
    gap: 5px;
    padding:  3px 8px;
    border-radius: 5px;
    border: 1px solid #a1a1a1;
    background-color: ${({ $bgcolor }) => $bgcolor || '#FFFF'};
    color: ${({ $bgcolor }) => $bgcolor ? "#FFFF" : "#000"};
    &:hover {
        cursor: pointer;
        border: 1px solid blue;
    }
`

const Arrow = styled.div`
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`  
    display: flex;
    svg {
        font-size: 12px;
        color: '#FFF';
        animation: ${rotate} 0.9s linear infinite;    
    }
`

export {
    PopoverContent,
    Main,
    Top,
    Icon,
    Title,
    Message,
    Content,
    Footer,
    Button,
    Arrow,
    LoadingSpinner
}