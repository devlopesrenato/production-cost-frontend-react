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

    :where(.css-dev-only-do-not-override-1k979oh).ant-form-item .ant-form-item-label >label {
        color: ${({ theme }) => theme.colors.textColor};
    }

    :where(.css-dev-only-do-not-override-1k979oh).ant-input-outlined.ant-input-disabled, :where(.css-dev-only-do-not-override-1k979oh).ant-input-outlined[disabled],
    :where(.css-dev-only-do-not-override-1k979oh).ant-btn-default:disabled, :where(.css-dev-only-do-not-override-1k979oh).ant-btn-default.ant-btn-disabled {
        background-color: ${({ theme }) => theme.colors.backgroundGray};
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
