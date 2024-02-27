import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "./service";
import columns from "./configs/columns";
import Table from "../../../components/Table";
import { ModalAdd } from "./components/ModalAdd";
import { Global, ActionArea, ButtonEdit, ButtonDelete } from "./styled";
import { ModalUpdate } from "./components/ModalUpdate";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { openNotification } from "../../../redux/notification/actions";

const { confirm } = Modal;

const Categories = () => {
  const [data, setData] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataEditing, setDateEditing] = useState<CategoryType>(
    {} as CategoryType
  );
  const dispatch = useAppDispatch();

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
  }, []);

  const showDeleteConfirm = (data: CategoryType) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      icon: <ExclamationCircleFilled />,
      content: data.name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
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
      },
    });
  };

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
        <ButtonDelete onClick={() => showDeleteConfirm(data)}>
          Delete
        </ButtonDelete>
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
      {/* <Table       
        tableLayout="auto"        
        dataSource={data}
        columns={_columns}
        scroll={{ x: true }}        
        style={{ 
          width: "900px",
          backgroundColor: '#494949'
        }}
        rowClassName="darkMode"        
      /> */}
      {/* <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.uuid}>
            <List.Item.Meta title={item.name} />
            <List.Item
              actions={[
                <Actions key={item.uuid} data={item} refresh={loadData} />,
              ]}
            />
          </List.Item>
        )}
      /> */}
    </Global.Page>
  );
};

export default Categories;
