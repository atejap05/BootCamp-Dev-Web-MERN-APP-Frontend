import React from "react";
import { Select } from "antd";

// TODO: Options Array props is an array of [{value: String, label: String}]
// https://ant.design/components/select
const AntdSelect = ({ optionsArray, style, onSelectChange, placeholder, defaultValue }) => {
  const onChangeHandler = value => {
    onSelectChange(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  return (
    <Select
      labelInValue
      style={style}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      placeholder={placeholder}
      onChange={onChangeHandler}
      options={optionsArray}
      defaultValue={defaultValue}
    />
  );
};
export default AntdSelect;
