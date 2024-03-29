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
  STableExtra,
} from "./styled";
import ArrowSort from "./components/ArrowSort";
import Search from "./components/Search";
import { Loading } from "../Loading";
import { RiArchive2Line } from "react-icons/ri";
import SearchSelect from "./components/SearchSelect";
import Cell from "./components/Cell";

interface TableProps {
  columns: ColumnsType[];
  dataSource: any[];
  loading?: boolean;
  title?: JSX.Element | string | number;
  footer?: JSX.Element | string | number;
  maxHeight?: number
}

interface Ordination {
  column: string;
  order: "ASC" | "DESC" | "";
}

type SearchProps = {
  column: string;
  value: string;
  exactly?: boolean;
}[];

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  loading = false,
  title,
  footer,
  maxHeight
}) => {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [ordination, setOrdination] = useState<Ordination>({
    column: "",
    order: "ASC",
  });
  const [searching, setSearching] = useState<SearchProps>([]);

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
          if (item.exactly) {
            return String(value) === String(valueCompare);
          }
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

  function handleSearching(data: {
    column: string;
    value: string;
    exactly?: boolean;
  }) {
    setSearching((prev) => {
      const currentColumn = data.value !== "" ? [data] : [];
      const otherColumns = prev.filter(({ column }) => column !== data.column);
      return [...otherColumns, ...currentColumn];
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
      width: '100%',
      minWidth: width,
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
        <STableExtra>{title}</STableExtra>
        <STable
          $overflowY="auto"
          $overflowX="auto"
          $hasData={!!processedData.length ? "true" : "false"}
          $maxHeight={maxHeight}
        >
          <STHead $width={minWidth}>
            <STHeadRow>
              {columns.map((column, index) => {
                const sort =
                  column.sort && !loading
                    ? () => handleOrdination(column.dataIndex)
                    : () => { };
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
                      column.searchType === "select" ? (
                        <SearchSelect
                          column={column.dataIndex}
                          search={searching}
                          click={handleSearching}
                          clearall={() => setSearching([])}
                          datasource={dataSource}
                        />
                      ) : (
                        <Search
                          column={column.dataIndex}
                          search={searching}
                          click={handleSearching}
                          clearall={() => setSearching([])}
                        />
                      )
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
                    const cellEditable = typeof column.editable === 'function'
                      ? column.editable(data, data[column.dataIndex])
                      : column.editable
                    return (
                      <STCell
                        key={index}
                        style={cellStyles(column, index)}
                        $align={column.align}
                      >
                        <Cell
                          value={
                            fnRender
                              ? fnRender(data, data[column.dataIndex])
                              : data[column.dataIndex]
                          }
                          editable={cellEditable}
                          type={column.type}
                          customRegex={column.cellValidateCustomRegex}
                          onSave={(newValue) => column.savingEdit && column.savingEdit(data, newValue)}
                        />
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
        <STableExtra>{footer}</STableExtra>
      </STableContainer>
    </Loading>
  );
};

export default Table;
