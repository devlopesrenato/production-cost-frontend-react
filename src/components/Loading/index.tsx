import React from "react";
import { LuRefreshCw } from "react-icons/lu";
import { SLoading, SLoadingSpinner, SLoadingContent } from "./styled";

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
            <LuRefreshCw id="svg-loading" />
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
