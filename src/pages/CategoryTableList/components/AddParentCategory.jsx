import { useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import { TertiaryCategorySelect } from './CategorySelect';
import Text from 'antd/lib/typography/Text';
import { message } from 'antd';

export default function AddParentCategory({ createParentModalVisible, handleParentModalVisible }) {
  const [tertiaryCategory, setTertiaryCategory] = useState(undefined);
  const intl = useIntl();

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.parentCategory',
        defaultMessage: 'Parent category',
      })}
      width="400px"
      visible={createParentModalVisible}
      onVisibleChange={handleParentModalVisible}
      // onChange={console.log}
      onFinish={async (value) => {
        fetch('/api/v1/category/parentCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...value, tertiaryCategory }),
        })
          .then((res) => res.json())
          .then((res) => {
            message.success(res.name + ' added successfully');
            handleParentModalVisible(false);
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
      <TertiaryCategorySelect
        tertiaryCategory={tertiaryCategory}
        setTertiaryCategory={setTertiaryCategory}
      />
    </ModalForm>
  );
}
