import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { getCustomMeasurements, updateFeedstock } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import { Select } from "../../../../../components/Select";

interface ModalProps {
  refresh: () => void;
  data: FeedstockType;
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
  const [customMeasurements, setCustomMeasurements] = useState<
    CustomMeasurementType[]
  >([]);
  const dispatch = useAppDispatch();

  function hasChanges(values: FeedstockType) {
    Object.keys(values).find((key) => {
      const keyName = key as keyof FeedstockType;
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
      .then(async ({ name, quantity, customMeasurementId, price }) => {
        if (
          !hasChanges({
            name,
            quantity,
            customMeasurementId,
            price,
          } as FeedstockType)
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
        const result = await updateFeedstock(data.uuid, {
          name: name.trim(),
          quantity,
          customMeasurementId,
          price,
        });
        if (result.status === 200) {
          refresh();
          close && close();
          return;
        }
        dispatch(
          openNotification({
            title: "Error updating feedstock",
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
    loadCustomMeasurements();
  }, []);

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
            label="Descrição"
            name="name"
            rules={[{ required: true, message: "Insira a descrição" }]}
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
            label="price"
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
