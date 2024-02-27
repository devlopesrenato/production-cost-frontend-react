import { LuRefreshCw } from "react-icons/lu";
import { Background, Overlay } from "./styled";
import React, { useEffect, useRef, useState } from "react";

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
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setOverlaySize({ width: offsetWidth || 100, height: offsetHeight || 100 });
    }
  }, [children, loading]);

  return (
    <Background style={{ backgroundColor: backColor }} ref={ref}>
      {children}
      {loading && (
        <Overlay
          loading={loading}
          width={overlaySize.width}
          height={overlaySize.height}
        >
          <LuRefreshCw />
        </Overlay>
      )}
    </Background>
  );
};
