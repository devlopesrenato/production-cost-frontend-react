import React, { useEffect, useState } from "react";
import {
  STBody,
  STHead,
  STRow,
  STableContainer,
  STable,
  STCell,
  STHeadRow,
  STHeaderCellContent,
  STHeaderCell,
  NoData,
} from "./styled";
import ArrowSort from "./components/arrowSort";
import { Loading } from "../Loading";
import { RiArchive2Line } from "react-icons/ri";
interface TableProps {
  columns: ColumnsType[];
  dataSource: any[];
  loading?: boolean;
}

interface Ordination {
  column: string;
  order: "ASC" | "DESC" | "";
}

const Table: React.FC<TableProps> = ({ columns, dataSource, loading }) => {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [ordination, setOrdination] = useState<Ordination>({
    column: "",
    order: "ASC",
  });

  function processData() {
    if (ordination.column !== "") {
      const dataSort = [...dataSource];
      return dataSort.sort((a, b) => {
        if (ordination.order === "ASC") {
          return String(a[ordination.column]).localeCompare(
            String(b[ordination.column]),
            undefined,
            { numeric: true }
          );
        }
        return String(b[ordination.column]).localeCompare(
          String(a[ordination.column]),
          undefined,
          { numeric: true }
        );
      });
    } else {
      return dataSource;
    }
  }

  function columnOrdering(columnName: string) {
    switch (ordination.order + ordination.column) {
      case "ASC" + columnName:
        setOrdination({ column: columnName, order: "DESC" });
        break;
      case "DESC" + columnName:
        setOrdination({ column: "", order: "" });
        break;
      default:
        setOrdination({ column: columnName, order: "ASC" });
        break;
    }
  }

  useEffect(() => {
    setProcessedData(processData());
  }, [dataSource, ordination]);

  function cellStyles(colStyle: ColumnsType, index: number) {
    const width = colStyle.width || 100;

    const isLast = index === columns.length - 1;
    const after = columns[index + 1];
    const fixedEnd = isLast ? -1 : after?.fixed ? Number(width) - 2 : undefined;

    const isFirst = index === 0;
    const before = columns[index - 1];
    const fixedStart = isFirst
      ? -1
      : before?.fixed
      ? Number(width) - 2
      : undefined;
    return {
      width,
      position: colStyle.fixed ? "sticky" : undefined,
      right: colStyle.fixed === "right" ? fixedEnd : undefined,
      left: colStyle.fixed === "left" ? fixedStart : undefined,
    } as React.CSSProperties;
  }

  const minWidth = columns.reduce(
    (acc, act) => (acc += Number(act.width) || 100),
    0
  );
  return (
    <Loading loading={loading}>
      <STableContainer>
        <STable $overflowY="auto" $overflowX="auto">
          <STHead $width={minWidth}>
            <STHeadRow>
              {columns.map((column, index) => (
                <STHeaderCell
                  $hover={column.sort ? "true" : "false"}
                  key={column.key}
                  style={{ ...cellStyles(column, index), minHeight: 41 }}
                  onClick={() =>
                    column.sort && !loading && columnOrdering(column.dataIndex)
                  }
                >
                  <STHeaderCellContent $align={column.align}>
                    {column.title}
                  </STHeaderCellContent>
                  {column.sort ? (
                    <ArrowSort
                      ordination={ordination}
                      column={column.dataIndex}
                      key={column.key}
                    />
                  ) : (
                    <></>
                  )}
                </STHeaderCell>
              ))}
            </STHeadRow>
          </STHead>
          <STBody
            $hasData={!!dataSource.length ? "true" : "false"}
            $width={minWidth}
          >
            {processedData.length ? (
              processedData.map((data, index) => (
                <STRow key={index}>
                  {columns.map((column, index) => {
                    const fnRender = column.render;
                    return (
                      <STCell
                        key={index}
                        style={cellStyles(column, index)}
                        $align={column.align}
                      >
                        {fnRender
                          ? fnRender(data, data[column.dataIndex])
                          : data[column.dataIndex]}
                      </STCell>
                    );
                  })}
                </STRow>
              ))
            ) : (
              <tr>
                <NoData>
                  <RiArchive2Line />
                  No data
                </NoData>
              </tr>
            )}
          </STBody>
        </STable>
      </STableContainer>
    </Loading>
  );
};

export default Table;
