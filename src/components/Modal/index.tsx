import React, { ReactElement, useState } from "react";
import { IoClose } from "react-icons/io5";
import Spinner from "../Spinner";
import {
    SModalBackMask,
    SModal,
    SModalContent,
    SModalCloseButton,
    SModalTitle,
    SModalFooter,
    SModalButton
} from './styled'

interface ModalProps {
    children?: ReactElement;
    buttonOpen?: ReactElement;
    open?: boolean;
    title?: string;
    onOk?: () => (Promise<any> | any);
    onCancel?: () => (Promise<any> | any);
    width?: number | string;
    top?: number | string;
}

const Modal: React.FC<ModalProps> = ({ children, open, top, width, title = '', buttonOpen, onOk, onCancel }) => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async () => {
        !loading && (
            onCancel &&
            await onCancel()
            || setOpenModal(false)
        );
    };

    const handleOk = async () => {
        setLoading(true)
        try {
            !loading && onOk && await onOk();
            setOpenModal(false);
        } catch (error) {
            console.error(error)
        } finally {
            !loading && setLoading(false)
        }
    }

    function propSizeConvert(value: string | number | undefined) {
        switch (typeof value) {
            case 'number':
                return value + 'px'

            case 'string':
                return value

            default:
                return undefined;
        }
    }
    return <>
        {
            buttonOpen
                ? React.cloneElement(buttonOpen, { onClick: handleOpenModal })
                : <></>
        }
        <SModalBackMask
            onClick={handleCloseModal}
            $show={String(open || openModal)}
        />
        <SModal
            $show={String(open || openModal)}
            $top={propSizeConvert(top)}
            $width={propSizeConvert(width)}
        >
            <SModalCloseButton
                disabled={loading}
                onClick={handleCloseModal}
            >
                <IoClose />
            </SModalCloseButton>
            <SModalTitle>{title}</SModalTitle>
            <SModalContent>
                {children}
            </SModalContent>
            <SModalFooter>
                <SModalButton
                    disabled={loading}
                    onClick={handleCloseModal}
                >
                    Cancel
                </SModalButton>
                <SModalButton
                    disabled={loading}
                    onClick={handleOk}
                    $type="primary"
                >
                    {loading ? <Spinner size={18} /> : <></>}
                    OK
                </SModalButton>
            </SModalFooter>
        </SModal>
    </>
}

export default Modal;