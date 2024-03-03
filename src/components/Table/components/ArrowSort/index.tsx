import React from "react";
import {
  FaArrowsAltV,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { ArrowButton } from "./styled";

interface ArrowSortProps {
  ordination: {
    column: string;
    order: "ASC" | "DESC" | "";
  };
  column: string;
  click: () => void;
}

const ArrowSort: React.FC<ArrowSortProps> = ({ ordination, column, click }) => {
  return (
    <ArrowButton onClick={click}>
      {ordination.column === column ? (
        ordination.order === "ASC" ? (
          <FaLongArrowAltDown color="#6298fc" />
        ) : (
          <FaLongArrowAltUp color="#6298fc" />
        )
      ) : (
        <FaArrowsAltV />
      )}
    </ArrowButton>
  );
};
export default ArrowSort;
