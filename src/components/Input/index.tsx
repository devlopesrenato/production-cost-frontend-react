import React, { MutableRefObject, useState } from "react"
import { SInput, SInputPassword, SInputInternal, SInputNumber, SButton } from "./styled"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = ({ ...rest }) => {
    return <SInput
        {...rest}
    />
}

interface InputPasswordProps extends InputProps { }

export const InputPassword: React.FC<InputPasswordProps> = ({ ...rest }) => {
    const [visible, setVisible] = useState(false)

    return (
        <SInputPassword>
            <SInputInternal
                {...rest}
                type={visible ? 'text' : 'password'}
            />
            {visible
                ? <FaRegEye onClick={() => setVisible(false)} />
                : <FaRegEyeSlash onClick={() => setVisible(true)} />
            }
        </SInputPassword>
    )
}

interface InputNumberProps extends InputProps {
    min?: number;
    max?: number;
    onchange?: (value: number) => void;
    value?: number;
    style?: React.CSSProperties;
    ref?: MutableRefObject<any>
}

export const InputNumber: React.FC<InputNumberProps> = ({ min, max, onchange, style, ref, ...rest }) => {
    const [value, setValue] = useState('')

    function handleChangeValue(inputValue: string | number) {
        const newValue = String(inputValue).replace(',', '.').replace(/[^0-9.-]/g, '');
        if (min !== undefined && Number(newValue) < min) {
            setValue(String(min))
            onchange && onchange(min)
            return;
        }
        if (max !== undefined && Number(newValue) > max) {
            setValue(String(max))
            onchange && onchange(max)
            return;
        }
        onchange && onchange(Number(newValue))
        setValue(newValue)
    }

    function handleUpValue(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        handleChangeValue(Number(value) - 1);
    }

    function handleDownValue(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        handleChangeValue(Number(value) + 1);
    }

    return (
        <SInputNumber style={style}>
            <SInputInternal
                {...rest}
                ref={ref}
                value={value}
                type="text"
                onChange={({ target }) => handleChangeValue(target.value)}
            />
            <SButton
                disabled={min !== undefined ? Number(value) === min : false}
                onClick={handleUpValue}
            >
                <FaArrowDown />
            </SButton>
            <SButton
                disabled={max !== undefined ? Number(value) === max : false}
                onClick={handleDownValue}
            >
                <FaArrowUp />
            </SButton>
        </SInputNumber>
    )
}