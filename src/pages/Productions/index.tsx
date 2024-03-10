import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Global from "../../styles/globalStyles";
import { openNotification } from "../../redux/notification/actions";
import Table from "../../components/Table";
import Confirm from "../../components/Confirm";
import columns from "./configs/columns";
import { ModalAdd } from "./components/ModalAdd";
import { ModalUpdate } from "./components/ModalUpdate";
import {
  deleteProduction,
  duplicateProduction,
  getProductions,
} from "./services";

const Productions = () => {
  const [data, setData] = useState<ProductionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataEditing, setDateEditing] = useState<ProductionType>(
    {} as ProductionType
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.currentUser);

  async function loadData() {
    setLoading(true);
    try {
      const result = await getProductions();
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
  }, [user]);

  async function deleteItem(data: CategoryType) {
    const result = await deleteProduction(data.uuid);
    if (result.status === 200) {
      loadData();
      return;
    }
    dispatch(
      openNotification({
        title: "Error deleting production",
        message: result.data.error,
        type: "warning",
      })
    );
  }

  const _columns: ColumnsType[] = [
    ...columns,
    {
      title: "",
      dataIndex: "duplicate",
      key: "duplicate",
      align: "center",
      fixed: "right",
      width: 80,
      render: (data) => (
        <Global.ButtonEdit
          onClick={async () => {
            setLoading(true);
            await duplicateProduction(data.uuid);
            await loadData();
            setLoading(false);
          }}
        >
          Duplicate
        </Global.ButtonEdit>
      ),
    },
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
          title="Are you sure you want to delete this production?"
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
export default Productions;
