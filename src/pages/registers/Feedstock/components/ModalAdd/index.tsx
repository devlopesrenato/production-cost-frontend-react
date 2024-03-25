import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, InputNumber } from "antd";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { createFeedstock, getCustomMeasurements } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import Button from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";
import Modal from "../../../../../components/Modal";

interface ModalProps {
  refresh: () => void;
}

export const ModalAdd: React.FC<ModalProps> = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState<
  CustomMeasurementType[]
>([]);
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name, quantity, customMeasurementId, price }) => {
        if (name.trim() !== "") {
          const result = await createFeedstock({
            name: name.trim(),
            quantity,
            customMeasurementId,
            price,
          });
          if (result.status === 201) {
            refresh();
            setOpen(false);
            return;
          }
          dispatch(
            openNotification({
              title: "Error adding feedstock",
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

  const loadCustomMeasurements = async () => {
    try {
      const result = await getCustomMeasurements();
      if (result.status === 200) {
        setCustomMeasurements(result.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    formRef.current?.resetFields();
    loadCustomMeasurements();
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
        title="Add feedstock"
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
            label="Custom Measurement"
            name="customMeasurementId"
            rules={[{ required: true, message: "Enter a custom measurement" }]}
          >
            <Select
              data={customMeasurements.map((item) => ({
                key: item.uuid,
                label: item.name,
              }))}
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
