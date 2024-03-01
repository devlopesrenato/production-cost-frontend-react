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

const SLoading = styled.div<{ loading: boolean }>`
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

const SLoadingContent = styled.div<{ loading: boolean }>`
  position: relative;
  transition: opacity 0.3s;
  clear: ${({ loading }) => loading ? 'both' : ''};
  opacity: ${({ loading }) => loading ? 0.5 : ''};
  user-select: ${({ loading }) => loading ? 'none' : ''};
  pointer-events: ${({ loading }) => loading ? 'none' : ''};
`

export {
  SLoading,
  SLoadingSpinner,
  SLoadingContent,
}