import React, { useState } from "react";
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


    function handleEdit() {
        if (editable) {
            setEditing(true);
        }
    }

    async function handleSave(key: string) {
        if (key === 'Enter') {
            try {
                setSaving(true)
                onSave && await onSave(cellValue);
                setEditing(false)
            } catch (error) {
                console.log('Error saving cell value: ', error)
            } finally {
                setSaving(false)
            }
        }
    }

    return (
        editable && saving
            ? <Loading size={20} loading><SSpanInactive>{cellValue}</SSpanInactive></Loading>
            : editable && editing
                ? <SInput
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