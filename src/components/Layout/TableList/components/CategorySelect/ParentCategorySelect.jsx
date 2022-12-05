import { useState } from 'react';
import { TreeSelect } from 'antd';
import { getSubCategories } from '../../service';

const { TreeNode } = TreeSelect;

export default function ParentCategorySelect({ parentCategory, setParentCategory }) {
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   getSubCategories().then((data) => {
  //     setOptions(data);
  //   });
  // }, []);

  // const [value, setValue] = useState(undefined);
  const onChange = (newValue) => {
    setParentCategory(newValue);
  };

  const categoryObj = {
    a: ['x', 'y'],
    b: ['t', 'z'],
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={parentCategory}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select a category"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      {Object.entries(categoryObj).map(([tertiaryCategory, subCategories]) => (
        <TreeNode key={tertiaryCategory} value={tertiaryCategory} title={tertiaryCategory}>
          {subCategories.map((category) => (
            <TreeNode key={category} value={category} title={category} />
          ))}
        </TreeNode>
      ))}
    </TreeSelect>
  );
}
