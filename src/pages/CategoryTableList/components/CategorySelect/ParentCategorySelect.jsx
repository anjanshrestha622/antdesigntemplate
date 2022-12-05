import { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { getParentCategories } from '../../service';

const { TreeNode } = TreeSelect;

export default function ParentCategorySelect({ parentCategory, setParentCategory }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getParentCategories().then((data) => {
      setOptions(data);
    });
  }, []);

  const onChange = (newValue) => {
    setParentCategory(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={parentCategory}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select a category"
      allowClear
      // treeDefaultExpandAll
      onChange={onChange}
    >
      {options.map((category) => (
        <TreeNode key={category} value={category} title={category} />
      ))}
    </TreeSelect>
  );
}
