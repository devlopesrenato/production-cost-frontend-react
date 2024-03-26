import React, { useState } from "react";
import { Form, FormInstance } from "antd";
import { updateOtherCost } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import { Select } from "../../../../../components/Select";
import Modal from "../../../../../components/Modal";
import { Input, InputNumber } from "../../../../../components/Input";

interface ModalProps {
  refresh: () => void;
  data: OtherCostType;
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
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  function hasChanges(values: OtherCostType) {
    Object.keys(values).find((key) => {
      const keyName = key as keyof OtherCostType;
      if (values[keyName] !== data[keyName]) {
        return true;
      }
    });
    return false;
  }

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name, quantity, price, active }) => {
        if (
          !hasChanges({
            name,
            quantity,
            price,
            active,
            type: data.type,
          } as OtherCostType)
        ) {
          dispatch(
            openNotification({
              title: "",
              message: "No fields changed",
              type: "warning",
            })
          );
          close && close();
          return;
        }
        const result = await updateOtherCost(data.uuid, {
          name: name.trim(),
          quantity,
          price,
          active,
        });
        if (result.status === 200) {
          refresh();
          close && close();
          return;
        }
        dispatch(
          openNotification({
            title: "Error updating cost",
            message: result.data.error,
            type: "warning",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setConfirmLoading(false));
  };

  return (
    <>
      <Modal
        title={`Edit ${data.name}`}
        open={open}
        onOk={handleOk}
        onCancel={close}
        confirmLoading={confirmLoading}
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
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter a quantity" }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: false, message: "" }]}
          >
            <Select
              disabled={true}
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
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
