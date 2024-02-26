type ColumnsType = {
    title: string;
    dataIndex: string;
    key: string | number;
    sort?: boolean;
    align?: "left" | "right" | 'center',
    fixed?: "left" | "right";
    width?: string | number;
    render?: (record?: any, value?: any) => JSX.Element | string | number | boolean;
}