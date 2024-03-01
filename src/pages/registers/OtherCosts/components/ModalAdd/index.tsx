import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { createOtherCost } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import Button from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";

interface ModalProps {
  refresh: () => void;
}

export const ModalAdd: React.FC<ModalProps> = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name, quantity, type, price }) => {
        if (name.trim() !== "") {
          const result = await createOtherCost({
            name: name.trim(),
            quantity,
            type,
            price,
          });
          if (result.status === 201) {
            refresh();
            setOpen(false);
            return;
          }
          dispatch(
            openNotification({
              title: "Error adding cost",
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
  }, [open]);

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
        zIndex={1002}
        title="Add OtherCost"
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
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter a quantity" }]}
          >
            <InputNumber min={0} decimalSeparator="," />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Select a type" }]}
          >
            <Select
              data={[
                { key: "distributed", label: "Distributed" },
                { key: "manual", label: "Manual" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter a price" }]}
          >
            <InputNumber min={0} decimalSeparator="," />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
