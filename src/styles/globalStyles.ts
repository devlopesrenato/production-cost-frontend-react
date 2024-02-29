import { styled, createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body, #root {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textColor};
    }
`

export default globalStyles;

export const Page = styled.div`
    width: 100%;
    padding: 60px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

export const Message = styled.span`
    color: #FFF;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`

export const Description = styled.p`
    color: #FFF;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`