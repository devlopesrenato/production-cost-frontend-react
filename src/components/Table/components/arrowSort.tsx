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
    order: "ASC" | "DESC";
  };
  column: string;
  onclick?: (column: string, ordination: "ASC" | "DESC") => void;
}

const ArrowSort: React.FC<ArrowSortProps> = ({
  ordination,
  column,
  onclick,
}) => {
  return (
    <ArrowButton>
      {ordination.column === column ? (
        ordination.order === "ASC" ? (
          <FaLongArrowAltDown
            onClick={() => onclick && onclick(column, "DESC")}
            color="#6298fc"
          />
        ) : (
          <FaLongArrowAltUp
            onClick={() => onclick && onclick("", "ASC")}
            color="#6298fc"
          />
        )
      ) : (
        <FaArrowsAltV onClick={() => onclick && onclick(column, "ASC")} />
      )}
    </ArrowButton>
  );
};
export default ArrowSort;
