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
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textColor};
    }
`
export default globalStyles;

export const Page = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;    
    padding: 10px;    
`
