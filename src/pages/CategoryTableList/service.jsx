import { message } from 'antd';
import {
  category,
  addCategory,
  updateCategory,
  removeCategory,
} from '@/services/ant-design-pro/api';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addCategory({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');

  try {
    await updateCategory({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeCategory({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const getSubCategories = async () => {
  const result = await category();
  // console.log(result);

  const secondaryCategories = result.data.reduce(function (acc, curr) {
    if (curr.parentCategory && !acc.includes(curr.parentCategory)) acc.push(curr.parentCategory);
    return acc;
  }, []);

  return secondaryCategories;
};

const getTertiaryCategories = async () => {
  const result = await (await fetch('/api/v1/category/tertiaryCategory')).json();

  return result.map((item) => item.name);
};

const getParentCategories = async () => {
  const result = await (await fetch('/api/v1/category/parentCategory')).json();

  return result.map((item) => item.name);
};

export {
  category,
  handleAdd,
  handleUpdate,
  handleRemove,
  getSubCategories,
  getTertiaryCategories,
  getParentCategories,
};
