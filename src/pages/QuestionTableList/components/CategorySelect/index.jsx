import { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { getCategories } from '../../service';

const { TreeNode } = TreeSelect;

export default function CategorySelect({ category, setCategory }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setOptions(data);
    });
  }, []);

  const onChange = (newValue) => {
    setCategory(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={category}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select a category"
      allowClear
      onChange={onChange}
    >
      {options.map((category) => (
        <TreeNode key={category} value={category} title={category} />
      ))}
    </TreeSelect>
  );
}
