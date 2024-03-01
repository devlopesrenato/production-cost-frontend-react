import dayjs from "dayjs";

const columns: ColumnsType[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 250,
    sort: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 110,
    sort: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    width: 150,
    sort: true,
    render: (_, value) => (value === "manuel" ? "Manual" : "Distributed"),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "center",
    width: 110,
    sort: true,
  },
  {
    title: "Created by",
    dataIndex: "createBy",
    key: "createBy",
    align: "center",
    width: 150,
    sort: true,
  },
  {
    title: "Created at",
    dataIndex: "createDate",
    align: "center",
    key: "createDate",
    sort: true,
    width: 150,
    render: (_, value) =>
      dayjs(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("YYYY-MM-DD"),
  },
];

export default columns;
