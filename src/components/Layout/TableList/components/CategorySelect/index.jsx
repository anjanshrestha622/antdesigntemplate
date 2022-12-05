import { useState } from 'react';
import { TreeSelect } from 'antd';
import { getSubCategories } from '../../service';

const { TreeNode } = TreeSelect;

export default function CategorySelect() {
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   getSubCategories().then((data) => {
  //     setOptions(data);
  //   });
  // }, []);

  const [value, setValue] = useState(undefined);
  const onChange = (newValue) => {
    setValue(newValue);
  };

  const categoryObj = {
    A: {
      B: ['x', 'y'],
      C: ['t', 'z'],
    },
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select a category"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      {Object.entries(categoryObj).map(([tertiaryCategory, subCategoryObj]) => (
        <TreeNode key={tertiaryCategory} value={tertiaryCategory} title={tertiaryCategory}>
          {Object.entries(subCategoryObj).map(([parentCategory, categories]) => (
            <TreeNode key={parentCategory} value={parentCategory} title={parentCategory}>
              {categories.map((category) => (
                <TreeNode key={category} value={category} title={category} />
              ))}
            </TreeNode>
          ))}
        </TreeNode>
      ))}
    </TreeSelect>
  );
}

import ParentCategorySelect from './ParentCategorySelect';
export { ParentCategorySelect };
