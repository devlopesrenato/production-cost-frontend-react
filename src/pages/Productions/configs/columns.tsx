import dayjs from "dayjs";

function statusMarginColor(params: {
  value: number | string;
  margin: number | string;
}) {
  const { value, margin } = params;
  if (Number(value) >= Number(margin)) {
    return "#52BE80";
  } else if (Number(value) >= Number(margin) - 10) {
    return "#D4AC0D";
  } else {
    return "#E74C3C";
  }
}

const columns = (margin: number): ColumnsType[] => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      sort: true,
      search: true,
      render: (record) => `${record.name} (${record.quantity}/production)`,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      align: "center",
      width: 100,
      sort: true,
      search: true,
      render: (record) => `$${record.cost.toFixed(2)}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 100,
      sort: true,
      search: true,
      render: (record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      align: "center",
      width: 120,
      sort: true,
      search: true,
      render: (record) => `$${record.profit.toFixed(2)}`,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      align: "center",
      width: 120,
      sort: true,
      search: true,
      render: ({ percent }) => (
        <p
          style={{
            color: statusMarginColor({ margin, value: percent }),
          }}
        >
          {percent.toFixed(2)}%
        </p>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      width: 150,
      sort: true,
      search: true,
      searchType: "select",
    },
    {
      title: "Created by",
      dataIndex: "createBy",
      key: "createBy",
      align: "center",
      width: 150,
      sort: true,
      search: true,
      searchType: "select",
    },
    {
      title: "Created at",
      dataIndex: "createDate",
      align: "center",
      key: "createDate",
      sort: true,
      search: true,
      width: 150,
      render: (_, value) =>
        dayjs(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("YYYY-MM-DD"),
    },
  ];
};

export default columns;
