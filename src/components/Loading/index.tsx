import React from "react";
import { SLoading, SLoadingSpinner, SLoadingContent } from "./styled";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {
  backColor?: string;
  color?: string;
  children?: React.ReactNode;
  loading?: boolean;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  backColor,
  color,
  children,
  loading = true,
  size = 35,
}) => {
  return (
    <SLoading style={{ backgroundColor: backColor }}>
      {loading ? (
        <div style={{ width: size }}>
          <SLoadingSpinner $size={size}>
            <AiOutlineLoading id="svg-loading" fill={color} />
          </SLoadingSpinner>
        </div>
      ) : (
        <></>
      )}
      <SLoadingContent $loading={loading ? "true" : "false"}>
        {children}
      </SLoadingContent>
    </SLoading>
  );
};
