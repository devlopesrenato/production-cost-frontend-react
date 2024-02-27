import React from "react";
import { SButton } from "./styled";

interface ButtonProps {
  icon?: JSX.Element;
  title?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, title, onClick }) => {
  return (
    <SButton onClick={() => onClick && onClick()}>
      {title ? title : ""}
      {icon ? icon : <></>}
    </SButton>
  );
};

export default Button;
