import React, { ReactElement } from "react";
import Modal from "../Modal";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import {
    Top,
    Content,
    Icon,
    Message,
    Title
} from './styled'

interface ModalConfirmProps {
    title: string;
    message: string;
    children: ReactElement;
    icon?: JSX.Element;
    onOk?: () => (Promise<any> | any);
    onCancel?: () => (Promise<any> | any);
    width?: number | string;
    type?: "success" | "info" | "warn" | "error";
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
    title = '',
    message,
    type,
    icon,
    width,
    children,
    onOk,
    onCancel
}) => {

    const IconShow =
        type === "error" ? (
            <IoCloseCircle color="red" />
        ) : type === "info" ? (
            <IoMdInformationCircle color="#1677ff" />
        ) : type === "warn" ? (
            <IoMdInformationCircle color="#faad14" />
        ) : (
            <MdCheckCircle color="green" />
        );

    return <>
        <Modal
            buttonOpen={children}
            onOk={onOk}
            onCancel={onCancel}
            width={width || 300}
            top={false}
            maskClose={false}
            showIconClose={false}
            okText="Yes"
            cancelText="No"
        >
            <Top>
                <Icon> {icon ? icon : IconShow}</Icon>
                <Content>
                    <Title> {title}</Title>
                    <Message>{message}</Message>
                </Content>
            </Top>
        </Modal>
    </>
}

export default ModalConfirm;