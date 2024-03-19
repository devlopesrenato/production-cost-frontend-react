import React, { useRef, useState } from "react";
import { SInput, SSpan, SSpanInactive } from "./styled";
import { Loading } from "../../../Loading";

interface CellProps {
    value: string | number;
    editable?: boolean;
    type?: "text" | "number" | "email" | "customRegex"
    customRegex?: RegExp;
    onSave?: (value: string) => Promise<void> | void;
}

const Cell: React.FC<CellProps> = ({ value, editable, type = "text", customRegex, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cellValue, setCellValue] = useState<string>(String(value));

    const inputRef = useRef<HTMLInputElement>(null)

    function handleEdit() {
        if (editable) {
            setEditing(true);
            inputRef.current?.focus();
        }
    }

    async function handleSave(key: string) {
        if (key === 'Enter') {
            try {
                if (String(cellValue) !== String(value)) {
                    setSaving(true)
                    onSave && await onSave(cellValue);
                } else {
                    setCellValue(String(value))
                }
            } catch (error) {
                console.log('Error saving cell value: ', error)
            } finally {
                setEditing(false)
                setSaving(false)
            }
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        const isValidValue = validateType(newValue, type);
        if (isValidValue) {
            setCellValue(newValue);
        }
    }

    function validateType(value: string, type: string): boolean {
        switch (type) {
            case "text":
                return true;
            case "number":
                return !isNaN(Number(value));
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            case "customRegex":
                return customRegex ? customRegex.test(value) : false

            default:
                return true;
        }
    }

    return (
        editable && saving
            ? <Loading size={20} loading><SSpanInactive>{cellValue}</SSpanInactive></Loading>
            : editable && editing
                ? <SInput
                    autoFocus
                    ref={inputRef}
                    value={cellValue}
                    onChange={handleChange}
                    onKeyDown={(e) => handleSave(e.key)}
                    onBlur={() => handleSave('Enter')}
                />
                : <SSpan
                    onClick={handleEdit}
                    $editable={String(editable)}
                >
                    {value}
                </SSpan>
    )
}

export default Cell;