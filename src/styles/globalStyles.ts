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

    :where(.css-dev-only-do-not-override-1k979oh).ant-form-item .ant-form-item-label >label,
    :where(.css-dev-only-do-not-override-1k979oh).ant-modal .ant-modal-title {
        color: ${({ theme }) => theme.colors.textColor};
    }

    :where(.css-dev-only-do-not-override-1k979oh).ant-input-outlined.ant-input-disabled, :where(.css-dev-only-do-not-override-1k979oh).ant-input-outlined[disabled],
    :where(.css-dev-only-do-not-override-1k979oh).ant-btn-default:disabled, :where(.css-dev-only-do-not-override-1k979oh).ant-btn-default.ant-btn-disabled {
        background-color: ${({ theme }) => theme.colors.backgroundGray};
    }     

    :where(.css-dev-only-do-not-override-1k979oh).ant-modal .ant-modal-content,
    :where(.css-dev-only-do-not-override-1k979oh).ant-modal .ant-modal-title {
        background-color: ${({ theme }) => theme.colors.background}
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