import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div<{ $size?: number }>`  
    display: flex;
    svg {
        font-size: ${({ $size }) => $size || 12}px;
        color: '#FFF';
        animation: ${rotate} 0.9s linear infinite;    
    }
`

export {
    LoadingSpinner
}