import { useIntl, FormattedMessage } from 'umi';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import PhoneNumberInput from '@/components/Inputs/PhoneNumber';
import Text from 'antd/lib/typography/Text';
import { addStaff } from '../service';

export default function AddForm({ createModalVisible, handleModalVisible, actionRef }) {
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
      // onChange={console.log}
      onFinish={async (value) => {
        const result = await addStaff({
          ...value,
          phone: '+977' + value.phone,
          password: '123456',
        });
        if (result.success) {
          handleModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <Text>Phone Number</Text>
      <PhoneNumberInput />
      <ProFormText
        label="Staff Name"
        placeholder={intl.formatMessage({
          id: 'pages.staffTable.staffName',
          defaultMessage: 'Staff Name',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.staffTable.staffNameRequired"
                defaultMessage="Staff Name is required"
              />
            ),
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormSelect
        name="role"
        label="Role"
        valueEnum={{
          staff: 'Staff',
          admin: 'Admin',
        }}
        placeholder="Please select a role"
        rules={[{ required: true, message: 'Please select a role!' }]}
      />
      .
    </ModalForm>
  );
}
