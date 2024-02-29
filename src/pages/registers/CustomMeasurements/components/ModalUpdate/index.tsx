import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { getUnitOfMeasurements, updateCustomMeasurement } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import { Select } from "../../../../../components/Select";

interface ModalProps {
  refresh: () => void;
  data: CustomMeasurementType;
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
  const [unitOfMeasurements, setUnitOfMeasurements] = useState<
    UnitOfMeasurementType[]
  >([]);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name, quantity, unitsOfMeasurementId }) => {
        if (name.trim() !== data.name.trim() && name.trim() !== "") {
          const result = await updateCustomMeasurement(data.uuid, {
            name: name.trim(),
            quantity,
            unitsOfMeasurementId,
          });
          if (result.status === 200) {
            refresh();
            close && close();
            return;
          }
          dispatch(
            openNotification({
              title: "Error updating custom measurement",
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

  const loadUnitOfMeasurements = async () => {
    try {
      const result = await getUnitOfMeasurements();
      if (result.status === 200) {
        console.log(
          result.data.map((item: UnitOfMeasurementType) => ({
            key: item.uuid,
            label: item.name,
          }))
        );
        setUnitOfMeasurements(result.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUnitOfMeasurements();
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
            label="Unit of Measurement"
            name="unitsOfMeasurementId"
            rules={[{ required: true, message: "Enter a unit of measurement" }]}
          >
            <Select
              data={unitOfMeasurements.map((item) => ({
                key: item.uuid,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
