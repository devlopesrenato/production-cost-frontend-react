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
  STableTitle,
} from "./styled";
import ArrowSort from "./components/ArrowSort";
import Search from "./components/Search";
import { Loading } from "../Loading";
import { RiArchive2Line } from "react-icons/ri";

interface TableProps {
  columns: ColumnsType[];
  dataSource: any[];
  loading?: boolean;
  title?: JSX.Element | string | number;
}

interface Ordination {
  column: string;
  order: "ASC" | "DESC" | "";
}

type Search = {
  column: string;
  value: string;
}[];

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  loading,
  title,
}) => {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [ordination, setOrdination] = useState<Ordination>({
    column: "",
    order: "ASC",
  });
  const [searching, setSearching] = useState<Search>([]);

  function processData() {
    const searchingData = searchData(dataSource);
    const orderingData = ordinationData(searchingData);
    return orderingData;
  }

  function searchData(data: any[]) {
    if (searching.length) {
      let filteredData = data;
      for (const item of searching) {
        filteredData = filteredData.filter((row) => {
          const hasRender = columns.find(({ key }) => key === item.column);
          const value = hasRender?.render
            ? hasRender.render(row, row[item.column])
            : row[item.column];
          const valueCompare = item.value;
          return String(value)
            ?.toLowerCase()
            .trim()
            .includes(String(valueCompare)?.toLowerCase().trim());
        });
      }
      return filteredData;
    }
    return data;
  }

  function ordinationData(data: any[]) {
    if (ordination.column !== "") {
      return data.sort((a, b) => {
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
    }
    return data;
  }

  function handleOrdination(columnName: string) {
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

  function handleSearching(data: { column: string; value: string }) {
    setSearching((prev) => {
      const curColumn = data.value !== "" ? [data] : [];
      const newData = prev.filter(({ column }) => column !== data.column);
      return [...newData, ...curColumn];
    });
  }

  useEffect(() => {
    setProcessedData(processData());
  }, [dataSource, ordination, searching]);

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
        <STableTitle>{title}</STableTitle>
        <STable
          $overflowY="auto"
          $overflowX="auto"
          $hasData={!!processedData.length ? "true" : "false"}
        >
          <STHead $width={minWidth}>
            <STHeadRow>
              {columns.map((column, index) => {
                const sort =
                  column.sort && !loading
                    ? () => handleOrdination(column.dataIndex)
                    : () => {};
                return (
                  <STHeaderCell
                    $hover={column.sort ? "true" : "false"}
                    key={column.key}
                    style={{ ...cellStyles(column, index), minHeight: 41 }}
                  >
                    <STHeaderCellContent $align={column.align} onClick={sort}>
                      {column.title}
                    </STHeaderCellContent>
                    {column.search ? (
                      <Search
                        column={column.dataIndex}
                        search={searching}
                        click={handleSearching}
                        clearall={() => setSearching([])}
                      />
                    ) : (
                      <></>
                    )}
                    {column.sort ? (
                      <ArrowSort
                        click={sort}
                        ordination={ordination}
                        column={column.dataIndex}
                        key={column.key}
                      />
                    ) : (
                      <></>
                    )}
                  </STHeaderCell>
                );
              })}
            </STHeadRow>
          </STHead>
          <STBody
            $hasData={!!processedData.length ? "true" : "false"}
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
                {loading ? (
                  <></>
                ) : (
                  <NoData>
                    <RiArchive2Line />
                    No data
                  </NoData>
                )}
              </tr>
            )}
          </STBody>
        </STable>
      </STableContainer>
    </Loading>
  );
};

export default Table;
