import { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { getTertiaryCategories } from '../../service';

const { TreeNode } = TreeSelect;

export default function TertiaryCategorySelect({ tertiaryCategory, setTertiaryCategory }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTertiaryCategories().then((data) => {
      setOptions(data);
    });
  }, []);

  const onChange = (newValue) => {
    setTertiaryCategory(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={tertiaryCategory}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select a category"
      allowClear
      // treeDefaultExpandAll
      onChange={onChange}
    >
      {options.map((tertiaryCategory) => (
        <TreeNode key={tertiaryCategory} value={tertiaryCategory} title={tertiaryCategory} />
      ))}
    </TreeSelect>
  );
}
