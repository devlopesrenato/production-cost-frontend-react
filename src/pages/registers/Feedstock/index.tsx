import { useEffect, useState } from "react";
import { deleteFeedstock, getFeedstocks } from "./service";
import columns from "./configs/columns";
import Table from "../../../components/Table";
import { ModalAdd } from "./components/ModalAdd";
import { Global, ActionArea, ButtonEdit, ButtonDelete } from "./styled";
import { ModalUpdate } from "./components/ModalUpdate";
import { useAppDispatch } from "../../../redux/hooks";
import { openNotification } from "../../../redux/notification/actions";
import Confirm from "../../../components/Confirm";

const Feedstock = () => {
  const [data, setData] = useState<FeedstockType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataEditing, setDateEditing] = useState<FeedstockType>(
    {} as FeedstockType
  );
  const dispatch = useAppDispatch();

  async function loadData() {
    setLoading(true);
    try {
      const result = await getFeedstocks();
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
    const result = await deleteFeedstock(data.uuid);
    if (result.status === 200) {
      loadData();
      return;
    }
    dispatch(
      openNotification({
        title: "Error deleting feedstock",
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
        <ButtonEdit
          onClick={() => {
            setDateEditing(data);
            setOpenModalUpdate(true);
          }}
        >
          Edit
        </ButtonEdit>
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
          title="Are you sure you want to delete this feedstock?"
          message={data.name}
          ok={() => deleteItem(data)}
          children={<ButtonDelete>Delete</ButtonDelete>}
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
      <ActionArea>
        <ModalAdd refresh={loadData} />
      </ActionArea>
      <Table dataSource={data} columns={_columns} loading={loading} />
    </Global.Page>
  );
};

export default Feedstock;
