import React, { useState } from "react";
import { Form, FormInstance } from "antd";
import Modal from "../../../../../components/Modal";
import { updateCategory } from "../../service";
import { openNotification } from "../../../../../redux/notification/actions";
import { useAppDispatch } from "../../../../../redux/hooks";
import { Input } from "../../../../../components/Input";

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
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setConfirmLoading(true);
    formRef.current
      ?.validateFields()
      .then(async ({ name }) => {
        if (name.trim() !== data.name.trim() && name.trim() !== "") {
          const result = await updateCategory(data.uuid, {
            name: name.trim(),
          });
          if (result.status === 200) {
            refresh();
            close && close();
            return;
          }
          dispatch(
            openNotification({
              title: "Error updating category",
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
          initialValues={{ name: data.name }}
          onFinish={handleOk}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Descrição"
            name="name"
            rules={[{ required: true, message: "Insira a descrição" }]}
          >
            <Input autoFocus />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
