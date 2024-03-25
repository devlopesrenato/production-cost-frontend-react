import { AiOutlineLoading } from "react-icons/ai"
import { LoadingSpinner } from "./styled"
import React from "react";

interface SpinnerProps {
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
    return (
        <LoadingSpinner $size={size}>
            <AiOutlineLoading />
        </LoadingSpinner>
    )
}

export default Spinner;