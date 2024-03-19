type ColumnsType = {
    title: string;
    dataIndex: string;
    key: string | number;
    sort?: boolean;
    align?: "left" | "right" | 'center',
    fixed?: "left" | "right";
    width?: string | number;
    search?: boolean;
    searchType?: "select" | "text"
    editable?: boolean | ((record?: any, value?: any) => boolean);
    type?: "text" | "number" | "email" | "customRegex"
    cellValidateCustomRegex?: RegExp;
    savingEdit?: (record: any, value: string) => Promise<any> | any
    render?: (record?: any, value?: any) => JSX.Element | string | number | boolean;
}