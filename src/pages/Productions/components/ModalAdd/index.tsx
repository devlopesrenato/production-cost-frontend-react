import React, { useEffect, useState } from "react";
import { Form, FormInstance } from "antd";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { createProduction, getCategories } from "../../services";
import { openNotification } from "../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../redux/hooks";
import Button from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import Modal from "../../../../components/Modal";
import { Input, InputNumber } from "../../../../components/Input";

interface ModalProps {
  refresh: () => void;
}

export const ModalAdd: React.FC<ModalProps> = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async (values) => {
        if (values.name.trim() !== "") {
          const { name, categoryId, price, quantity } = values;
          const result = await createProduction({
            name: name.trim(),
            categoryId,
            price,
            quantity,
          });
          if (result.status === 201) {
            refresh();
            setOpen(false);
            return;
          }
          dispatch(
            openNotification({
              title: "Error adding production",
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

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    formRef.current?.resetFields();
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
      <Button
        title="New"
        icon={
          <VscGitPullRequestNewChanges
            color="#5ec58a"
            fontSize="18px"
            key="btn-add"
          />
        }
        onClick={showModal}
      />
      <Modal
        title="Add Production"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Form
          name="Add"
          ref={formRef}
          initialValues={{ name: "" }}
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
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter a price" }]}
          >
            <InputNumber min={0} prefix={"$"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
