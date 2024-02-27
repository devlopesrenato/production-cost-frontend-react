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

const Background = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;    
    background-color: ${({ theme }) => theme.colors.backgroundRowTable};
    svg {
        font-size: 35px;
        color: ${({ theme }) => theme.colors.textColor};
        animation: ${rotate} 0.9s linear infinite;
    }
`

const Overlay = styled.div<{ loading: boolean; width: number; height: number }>`
  display: ${({ loading }) => (loading ? "flex" : "none")};
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in;
`;

export {
    Background,
    Overlay
}