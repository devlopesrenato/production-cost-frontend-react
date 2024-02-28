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

const Background = styled.div<{ loading: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;        
  min-height: ${({ loading }) => loading ? '150px' : undefined};
  background-color: ${({ theme }) => theme.colors.backgroundRowTable};
  #svg-load {
    font-size: 35px;
    color: ${({ theme }) => theme.colors.textColor};
    animation: ${rotate} 0.9s linear infinite;
  }
`

const Overlay = styled.div<{ loading: boolean; width: number; height: number }>`
  display: ${({ loading }) => (loading ? "flex" : "none")};
  position: absolute;
  min-height: 50px;
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