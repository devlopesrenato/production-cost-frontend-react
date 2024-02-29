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
    title: "Custom Measurement",
    dataIndex: "customMeasurement",
    key: "customMeasurement",
    align: "center",
    width: 200,
    sort: true,
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
