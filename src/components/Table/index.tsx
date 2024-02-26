import React, { useEffect, useState } from "react";
import {
  STBody,
  STHead,
  STRow,
  STable,
  STCell,
  STHeadRow,
  Refresh,
  STCellContent,
} from "./styled";
import { LuRefreshCw } from "react-icons/lu";
import ArrowSort from "./components/arrowSort";

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

  return (
    <STable>
      <STHead>
        <STHeadRow style={{ borderRadius: "10px 10px 0 0" }}>
          {columns.map((column) => (
            <STCell key={column.key} style={{ width: column.width || 100 }}>
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
            </STCell>
          ))}
        </STHeadRow>
      </STHead>
      <STBody>
        {loading ? (
          <Refresh>
            <LuRefreshCw />
          </Refresh>
        ) : (
          processedData.map((data) => (
            <STRow>
              {columns.map((column) => {
                const fnRender = column.render;
                return (
                  <STCell
                    style={{
                      width: column.width || 100,
                      justifyContent: column.align,
                    }}
                  >
                    {fnRender
                      ? fnRender(data, data[column.dataIndex])
                      : data[column.dataIndex]}
                  </STCell>
                );
              })}
            </STRow>
          ))
        )}
      </STBody>
    </STable>
  );
};

export default Table;
