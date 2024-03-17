import React from "react";
import { SLoading, SLoadingSpinner, SLoadingContent } from "./styled";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {
  backColor?: string;
  children?: React.ReactNode;
  loading?: boolean;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  backColor,
  children,
  loading = true,
  size = 35,
}) => {
  return (
    <SLoading style={{ backgroundColor: backColor }}>
      {loading ? (
        <div>
          <SLoadingSpinner $size={size}>
            <AiOutlineLoading id="svg-loading" />
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
