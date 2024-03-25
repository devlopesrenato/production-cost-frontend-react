import styled from "styled-components";

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

export {
    Top,
    Content,
    Icon,
    Message,
    Title
}
