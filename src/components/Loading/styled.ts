import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
`;

const SLoading = styled.div`
  position: relative;
  animation: ${fadeIn} 0.3s ease-in;
`

const SLoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 400px;
  #svg-loading {
    position: absolute;
    top: 50%;
    inset-inline-start: 50%;
    margin: -10px; 
    font-size: 35px;
    color: ${({ theme }) => theme.colors.textColor};
    animation: ${rotate} 0.9s linear infinite;    
  }
`

const SLoadingContent = styled.div<{ $loading: "true" | "false" }>`
  position: relative;
  transition: opacity 0.3s;
  clear: ${({ $loading }) => $loading === "true" ? 'both' : ''};
  opacity: ${({ $loading }) => $loading === "true" ? 0.5 : ''};
  user-select: ${({ $loading }) => $loading === "true" ? 'none' : ''};
  pointer-events: ${({ $loading }) => $loading === "true" ? 'none' : ''};
`

export {
  SLoading,
  SLoadingSpinner,
  SLoadingContent,
}