import { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

import { handleAdd, getSubCategories } from '../service';
import { ParentCategorySelect } from './CategorySelect';
import Text from 'antd/lib/typography/Text';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AddForm({ createModalVisible, handleModalVisible }) {
  const [options, setOptions] = useState([]);
  const [parentCategory, setParentCategory] = useState(undefined);
  const intl = useIntl();

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.newCategory',
        defaultMessage: 'New category',
      })}
      width="400px"
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      // onChange={console.log}
      onFinish={async (value) => {
        console.log({ ...value, parentCategory });
        // const success = await handleAdd(value);
        // if (success) {
        //   handleModalVisible(false);
        //   if (actionRef.current) {
        //     actionRef.current.reload();
        //   }
        // }
      }}
    >
      <ProFormText
        label="Category Name"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.categoryTable.categoryName"
                defaultMessage="Category name is required"
              />
            ),
          },
        ]}
        width="md"
        name="name"
      />
      <Text>Parent Category</Text>
      <ParentCategorySelect parentCategory={parentCategory} setParentCategory={setParentCategory} />
      {/* <ProFormSelect.SearchSelect
        name="categoryQuery"
        label="Parent Category"
        fieldProps={{
          // labelInValue: true,
          style: {
            minWidth: 140,
          },
        }}
        debounceTime={300}
        request={async ({ keyWords = '' }) => {
          const result = options.filter(({ value, label }) => {
            return value.includes(keyWords) || label.includes(keyWords);
          });

          // console.log(result);
          return result;
        }}
        placeholder="Please select a category"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.categoryTable.parentCategory"
                defaultMessage="Parent category is required"
              />
            ),
          },
          {
            validator: (rule, value) => {
              if (value && value.length > 1) {
                return Promise.reject('Multiple parent category is not allowed');
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      /> */}
    </ModalForm>
  );
}
