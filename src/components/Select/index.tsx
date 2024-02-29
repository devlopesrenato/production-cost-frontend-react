import { Select as SelectAnt, SelectProps as SelectPropsAnt } from "antd";
import { useEffect, useState } from "react";
const { Option } = SelectAnt;

type SelectDataType = {
  key: string | number;
  label: string;
};

interface SelectProps {
  data: SelectDataType[];
  onChange?: (value: string) => void;
  value?: string | number;
  props?: SelectPropsAnt;
}

export const Select: React.FC<SelectProps> = (
  { data, onChange, value },
  props
) => {
  const [dataSource, setDataSource] = useState<SelectDataType[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) setDataSource(data);
  }, [data]);

  return (
    <SelectAnt
      {...props}
      defaultValue={value}
      onChange={onChange && onChange}
      showSearch
      filterOption={(input, option) => {
        const optionLabel = (option?.children ?? "") as String;
        return optionLabel.toLowerCase().includes(input.toLowerCase());
      }}
      optionFilterProp="children"
      filterSort={(optionA, optionB) => {
        const labelA = (optionA?.children ?? "") as String;
        const labelB = (optionB?.children ?? "") as String;
        return labelA.toLowerCase().localeCompare(labelB.toLowerCase());
      }}
    >
      {dataSource.map((item: SelectDataType) => (
        <Option key={item.key} value={item.key}>
          {item.label}
        </Option>
      ))}
    </SelectAnt>
  );
};
