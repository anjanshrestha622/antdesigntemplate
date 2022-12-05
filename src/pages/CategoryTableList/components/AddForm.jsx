import { useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import { ParentCategorySelect } from './CategorySelect';
import Text from 'antd/lib/typography/Text';
import { message } from 'antd';

export default function AddForm({ createModalVisible, handleModalVisible, actionRef }) {
  const [parentCategory, setParentCategory] = useState(undefined);
  const intl = useIntl();

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.newCategory',
        defaultMessage: 'New category ',
      })}
      width="400px"
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      onFinish={async (value) => {
        // console.log({ ...value, parentCategory });
        fetch('/api/v1/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...value, parentCategory }),
        })
          .then((res) => res.json())
          .then((res) => {
            message.success(res.name + ' added successfully');
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          })
          .catch(console.error);
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
    </ModalForm>
  );
}
