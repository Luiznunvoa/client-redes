import styled from "styled-components";
import { slideDown } from "../../styles/container";

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  animation: ${slideDown} 1s ease-out forwards;
  background-color: transparent;
`;

export const StyledLeftSide = styled.div`
  width: 30%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.alternate};
  border-right: solid 2px ${(props) => props.theme.colors.foreground};

  h1 {
    margin: 2rem;
    color: ${(props) => props.theme.colors.onPrimary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledMobileButtons = styled.div`
  display: none;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;

  h2 {
    font-family: "Jost", sans-serif;
  }
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 1rem;
  text-align: center;
`;
