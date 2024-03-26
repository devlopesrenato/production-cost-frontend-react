import React from "react";
import { SButton } from "./styled";
import Spinner from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  title?: string;
  styleType?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({ icon, title, styleType, style, disabled, loading, onClick, ...rest }) => {
  return (
    <SButton
      {...rest}
      $type={styleType}
      style={style}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {loading ? <Spinner size={18} /> : <></>}
      {title ? title : ""}
      {icon ? icon : <></>}
    </SButton>
  );
};

export default Button;
