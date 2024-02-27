import styled from "styled-components";

const SButton = styled.div`
    background-color: ${({ theme }) => theme.colors.button};
    padding: 0.3rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border-radius: 8px;
    gap: 0.3rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
        cursor: pointer; 
    }
`

export { SButton}