import { useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Text from 'antd/lib/typography/Text';

import CategorySelect from './CategorySelect';
import OptionsInput from './OptionsInput';

export default function AddQuestionForm({ createModalVisible, handleModalVisible, actionRef }) {
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState(undefined);
  const [category, setCategory] = useState(undefined);
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
        id: 'pages.newCategory',
        defaultMessage: 'New category',
      })}
      width="400px"
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      onFinish={async (value) => {
        console.log({ ...value, options, answer, category });

        // fetch('/api/v1/questions', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     ...value,
        //     image,
        //     answers: options,
        //     correctAnswer: answer,
        //     category,
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     message.success('A Question added successfully');
        //     handleModalVisible(false);
        //     if (actionRef.current) {
        //       actionRef.current.reload();
        //     }
        //   })
        //   .catch(console.error);
      }}
    >
      <ProFormText
        label="Question"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.questionTable.question.required"
                defaultMessage="Question is required"
              />
            ),
          },
        ]}
        width="md"
        name="question"
      />
      <Text>Image:</Text>
      <br />
      <Upload name="image" action="/api/v1/questions/image" onChange={handleImage}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <OptionsInput
        options={options}
        setOptions={setOptions}
        answer={answer}
        setAnswer={setAnswer}
      />
      <ProFormTextArea label="Explanation" name="explanation" />
      <Text>Category</Text>
      <CategorySelect category={category} setCategory={setCategory} />
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
