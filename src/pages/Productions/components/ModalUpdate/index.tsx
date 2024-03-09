import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { getCategories, updateProduction } from "../../services";
import { openNotification } from "../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../redux/hooks";
import { Select } from "../../../../components/Select";

interface ModalProps {
  refresh: () => void;
  data: CategoryType;
  open: boolean;
  close: () => void;
}

export const ModalUpdate: React.FC<ModalProps> = ({
  refresh,
  data,
  open,
  close,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name, categoryId, price, quantity }) => {
        if (name.trim() !== data.name.trim() && name.trim() !== "") {
          const result = await updateProduction(data.uuid, {
            name: name.trim(),
            categoryId,
            price,
            quantity,
          });
          if (result.status === 200) {
            refresh();
            close && close();
            return;
          }
          dispatch(
            openNotification({
              title: "Error updating production",
              message: result.data.error,
              type: "warning",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setConfirmLoading(false));
  };

  useEffect(() => {
    open && loadCategories();
  }, [open]);

  async function loadCategories() {
    try {
      const result = await getCategories();
      if (result.status === 200) {
        setCategories(result.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        zIndex={1002}
        title={`Edit ${data.name}`}
        open={open}
        onOk={handleOk}
        onCancel={close}
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <Form
          name="Edit"
          ref={formRef}
          initialValues={data}
          onFinish={handleOk}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Description"
            name="name"
            rules={[{ required: true, message: "Enter a description" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Enter a category" }]}
          >
            <Select
              data={categories.map((item) => ({
                key: item.uuid,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Quantity per production"
            name="quantity"
            rules={[
              { required: true, message: "Enter a quantity per production" },
            ]}
          >
            <InputNumber min={0} decimalSeparator="," />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter a price" }]}
          >
            <InputNumber min={0} decimalSeparator="," prefix={"$"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
