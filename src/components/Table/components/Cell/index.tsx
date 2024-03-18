import React, { useEffect, useRef, useState } from "react";
import { SInput, SSpan, SSpanInactive } from "./styled";
import { Loading } from "../../../Loading";

interface CellProps {
    value: string | number;
    editable?: boolean;
    onSave?: (value: string) => Promise<void> | void;
}

const Cell: React.FC<CellProps> = ({ value, editable, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [cellValue, setCellValue] = useState<string>(String(value));

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                handleSave('Enter');
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    function handleEdit() {
        if (editable) {
            setEditing(true);
        }
    }

    async function handleSave(key: string) {
        try {
            if (key === 'Enter' && cellValue != value) {
                setSaving(true)
                onSave && await onSave(cellValue);
            }
        } catch (error) {
            console.log('Error saving cell value: ', error)
        } finally {
            setEditing(false)
            setSaving(false)
        }
    }

    return (
        editable && saving
            ? <Loading size={20} loading><SSpanInactive>{cellValue}</SSpanInactive></Loading>
            : editable && editing
                ? <SInput
                    ref={inputRef}
                    value={cellValue}
                    onChange={(e) => setCellValue(e.target.value)}
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