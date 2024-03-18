import styled from "styled-components";

const SInput = styled.input`
    outline: 0;
    width: 100%;
`

const SSpan = styled.span<{ $editable?: string }>`
    &:hover{
        cursor: ${({ $editable }) => $editable === 'true' ? 'pointer' : undefined};
        color: ${({ $editable }) => $editable === 'true' ? '#1677ff' : undefined};
    }
`

const SSpanInactive = styled.span`
    color: ${({ theme }) => theme.colors.textColorOpaque};
`
export {
    SInput,
    SSpan,
    SSpanInactive,
}