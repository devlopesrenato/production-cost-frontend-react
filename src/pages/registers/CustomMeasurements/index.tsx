import { useEffect, useState } from "react";
import { deleteCustomMeasurement, getCustomMeasurements } from "./service";
import columns from "./configs/columns";
import Table from "../../../components/Table";
import { ModalAdd } from "./components/ModalAdd";
import { Global } from "./styled";
import { ModalUpdate } from "./components/ModalUpdate";
import { useAppDispatch } from "../../../redux/hooks";
import { openNotification } from "../../../redux/notification/actions";
import Confirm from "../../../components/Confirm";

const CustomMeasurements = () => {
  const [data, setData] = useState<CustomMeasurementType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataEditing, setDateEditing] = useState<CustomMeasurementType>(
    {} as CustomMeasurementType
  );
  const dispatch = useAppDispatch();

  async function loadData() {
    setLoading(true);
    try {
      const result = await getCustomMeasurements();
      if (result.status === 200) {
        setData(result.data);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function deleteItem(data: CustomMeasurementType) {
    const result = await deleteCustomMeasurement(data.uuid);
    if (result.status === 200) {
      loadData();
      return;
    }
    dispatch(
      openNotification({
        title: "Error deleting custom measurement",
        message: result.data.error,
        type: "warning",
      })
    );
  }

  const _columns: ColumnsType[] = [
    ...columns,
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      fixed: "right",
      width: 80,
      render: (data) => (
        <Global.ButtonEdit
          onClick={() => {
            setDateEditing(data);
            setOpenModalUpdate(true);
          }}
        >
          Edit
        </Global.ButtonEdit>
      ),
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      fixed: "right",
      width: 80,
      render: (data) => (
        <Confirm
          title="Are you sure you want to delete this custom measurement?"
          message={data.name}
          ok={() => deleteItem(data)}
          children={<Global.ButtonDelete>Delete</Global.ButtonDelete>}
        />
      ),
    },
  ];

  return (
    <Global.Page>
      <ModalUpdate
        open={openModalUpdate}
        data={dataEditing}
        close={() => setOpenModalUpdate(false)}
        refresh={loadData}
      />
      <Table
        title={
          <Global.ActionArea>
            <ModalAdd refresh={loadData} />
          </Global.ActionArea>
        }
        dataSource={data}
        columns={_columns}
        loading={loading}
      />
    </Global.Page>
  );
};

export default CustomMeasurements;
