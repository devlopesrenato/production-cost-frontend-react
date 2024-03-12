import React from "react";
import { SLoading, SLoadingSpinner, SLoadingContent } from "./styled";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {
  backColor?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  backColor,
  children,
  loading = true,
}) => {
  return (
    <SLoading style={{ backgroundColor: backColor }}>
      {loading ? (
        <div>
          <SLoadingSpinner>
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
