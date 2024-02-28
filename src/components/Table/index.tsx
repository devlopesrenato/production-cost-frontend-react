import React, { useEffect, useState } from "react";
import {
  STBody,
  STHead,
  STRow,
  STable,
  STCell,
  STHeadRow,
  STCellContent,
  STHeaderCell,
} from "./styled";
import ArrowSort from "./components/arrowSort";
import { Loading } from "../Loading";

interface TableProps {
  columns: ColumnsType[];
  dataSource: any[];
  loading?: boolean;
}

interface Ordination {
  column: string;
  order: "ASC" | "DESC";
}

const Table: React.FC<TableProps> = ({ columns, dataSource, loading }) => {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [ordination, setOrdination] = useState<Ordination>({
    column: "",
    order: "ASC",
  });

  function processData() {
    if (ordination.column) {
      return dataSource.sort((a, b) => {
        if (ordination.order === "ASC") {
          return b[ordination.column].localeCompare(a[ordination.column]);
        }
        return a[ordination.column].localeCompare(b[ordination.column]);
      });
    } else {
      return dataSource;
    }
  }

  useEffect(() => {
    setProcessedData(processData());
  }, [dataSource, ordination]);

  function cellStyles(colStyle: ColumnsType, index: number) {
    const width = colStyle.width || 100;

    const isLast = index === columns.length - 1;
    const after = columns[index + 1];
    const fixedEnd = isLast ? 0 : after?.fixed ? Number(width) : undefined;

    const isFirst = index === 0;
    const before = columns[index - 1];
    const fixedStart = isFirst ? 0 : before?.fixed ? Number(width) : undefined;
    return {
      width,
      justifyContent: colStyle.align,
      display: "flex",
      position: colStyle.fixed ? "sticky" : undefined,
      right: colStyle.fixed === "right" ? fixedEnd : undefined,
      left: colStyle.fixed === "left" ? fixedStart : undefined,
    } as React.CSSProperties;
  }

  return (
    <STable>
      <Loading loading={loading}>
      <STHead
        style={{
          width: columns.reduce(
            (acc, act) => (acc += Number(act.width) || 100),
            0
          ),
        }}
      >
        <STHeadRow>
          {columns.map((column, index) => (
            <STHeaderCell
              key={column.key}
              style={{ ...cellStyles(column, index), minHeight: 41 }}
            >
              <STCellContent style={{ justifyContent: column.align }}>
                <strong>{column.title}</strong>
              </STCellContent>
              {column.sort && !loading ? (
                <ArrowSort
                  onclick={(column, ordination) =>
                    setOrdination({ column, order: ordination })
                  }
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
        style={{
          width: columns.reduce(
            (acc, act) => (acc += Number(act.width) || 100),
            0
          ),
        }}
      >
        {processedData.map((data) => (
          <STRow>
            {columns.map((column, index) => {
              const fnRender = column.render;
              return (
                <STCell style={cellStyles(column, index)}>
                  {fnRender
                    ? fnRender(data, data[column.dataIndex])
                    : data[column.dataIndex]}
                </STCell>
              );
            })}
          </STRow>
        ))}
      </STBody>
      </Loading>
    </STable>
  );
};

export default Table;
