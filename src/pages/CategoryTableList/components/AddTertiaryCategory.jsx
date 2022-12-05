import { useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

// import { handleAdd, getSubCategories } from '../service';
import Text from 'antd/lib/typography/Text';

export default function AddTertiaryCategory({
  createTertiaryModalVisible,
  handleTertiaryModalVisible,
}) {
  const intl = useIntl();

  const [image, setImage] = useState(undefined);

  const handleImage = (info) => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.filename);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.TertiaryCategory',
        defaultMessage: 'Tertiary category',
      })}
      width="400px"
      visible={createTertiaryModalVisible}
      onVisibleChange={handleTertiaryModalVisible}
      onFinish={async (value) => {
        // console.log({ ...value, image });

        fetch('/api/v1/category/tertiaryCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...value, image }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('Tertiary category added successfully', res);
            message.success(res.name + ' added successfully');
            handleTertiaryModalVisible(false);
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
      <Text>Category Image:</Text>
      <br />
      <Upload name="image" action="/api/v1/category/image" onChange={handleImage}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </ModalForm>
  );
}
