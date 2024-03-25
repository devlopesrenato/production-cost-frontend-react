import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "./service";
import columns from "./configs/columns";
import Table from "../../../components/Table";
import { ModalAdd } from "./components/ModalAdd";
import { Global } from "./styled";
import { ModalUpdate } from "./components/ModalUpdate";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { openNotification } from "../../../redux/notification/actions";
import ModalConfirm from "../../../components/ModalConfirm";

const Categories = () => {
  const [data, setData] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataEditing, setDateEditing] = useState<CategoryType>(
    {} as CategoryType
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.currentUser);

  async function loadData() {
    setLoading(true);
    try {
      const result = await getCategories();
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
    const result = await deleteCategory(data.uuid);
    if (result.status === 200) {
      loadData();
      return;
    }
    dispatch(
      openNotification({
        title: "Error deleting category",
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
        <ModalConfirm
          type="warn"
          title="Are you sure you want to delete this category?"
          message={data.name}
          onOk={() => deleteItem(data)}
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

export default Categories;
