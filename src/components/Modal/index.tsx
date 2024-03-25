import React, { ReactElement, useState } from "react";
import { IoClose } from "react-icons/io5";
import Spinner from "../Spinner";
import {
    SModalBackMask,
    SModalMain,
    SModalContent,
    SModalCloseButton,
    SModalTitle,
    SModalFooter,
    SModalButton,
    SModal
} from './styled'
import ReactDOM from "react-dom";

interface ModalProps {
    children?: ReactElement;
    buttonOpen?: ReactElement;
    open?: boolean;
    confirmLoading?: boolean;
    title?: string;
    onOk?: () => (Promise<any> | any);
    onCancel?: () => (Promise<any> | any);
    width?: number | string;
    top?: number | string | boolean;
    maskClose?: boolean;
    showIconClose?: boolean;
    okText?: string;
    cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
    children,
    open,
    confirmLoading,
    top,
    width,
    title,
    buttonOpen,
    maskClose = true,
    showIconClose = true,
    onOk,
    onCancel,
    okText,
    cancelText,
}) => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async () => {
        (!loading || !confirmLoading) && (
            onCancel &&
            await onCancel()
            || setOpenModal(false)
        );
    };

    const handleOk = async () => {
        setLoading(true)
        try {
            (!loading || !confirmLoading) && onOk && await onOk();
            setOpenModal(false);
        } catch (error) {
            console.error(error)
        } finally {
            (!loading || !confirmLoading) && setLoading(false)
        }
    }

    function propSizeConvert(value: string | number | boolean | undefined) {
        switch (typeof value) {
            case 'number':
                return value + 'px'

            case 'string':
                return value

            case 'boolean':
                return value === false
                    ? 'none'
                    : '100px'

            default:
                return undefined;
        }
    }

    const handleModalClick = () => {
        maskClose && handleCloseModal();
    };

    const handleMainClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };


    return <>
        {
            buttonOpen
                ? React.cloneElement(
                    buttonOpen,
                    {
                        onClick: handleOpenModal,
                        style: {
                            cursor: "pointer",
                        },
                    })
                : <></>
        }
        {(open || openModal) &&
            ReactDOM.createPortal(
                <>
                    <SModalBackMask
                        $show={String(open || openModal)}
                    />
                    <SModal
                        onClick={handleModalClick}
                        $show={String(open || openModal)}
                    >
                        <SModalMain
                            onClick={handleMainClick}
                            $show={String(open || openModal)}
                            $top={propSizeConvert(top)}
                            $width={propSizeConvert(width)}
                        >
                            {showIconClose &&
                                <SModalCloseButton
                                    disabled={loading || confirmLoading}
                                    onClick={handleCloseModal}
                                >
                                    <IoClose />
                                </SModalCloseButton>
                            }
                            {title ? <SModalTitle>{title}</SModalTitle> : <></>}
                            <SModalContent>
                                {children}
                            </SModalContent>
                            <SModalFooter>
                                <SModalButton
                                    disabled={loading || confirmLoading}
                                    onClick={handleCloseModal}
                                >
                                    {cancelText || 'Cancel'}
                                </SModalButton>
                                <SModalButton
                                    disabled={loading || confirmLoading}
                                    onClick={handleOk}
                                    $type="primary"
                                >
                                    {(loading || confirmLoading) ? <Spinner size={18} /> : <></>}
                                    {okText || 'OK'}
                                </SModalButton>
                            </SModalFooter>
                        </SModalMain>
                    </SModal>
                </>,
                document.body)
        }
    </>
}

export default Modal;