import { MobileOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';

export default function PhoneNumberInput() {
  const intl = useIntl();

  return (
    <ProFormText
      fieldProps={{
        size: 'large',
        prefix: <MobileOutlined className={styles.prefixIcon} />,
      }}
      name="phone"
      placeholder={intl.formatMessage({
        id: 'pages.login.phoneNumber.placeholder',
        defaultMessage: 'Phone Number: xxxxxxxxx',
      })}
      rules={[
        {
          required: true,
          message: (
            <FormattedMessage
              id="pages.login.phoneNumber.required"
              defaultMessage="Please input your phone number!"
            />
          ),
        },
        {
          pattern: /^\d{10}$/,
          message: (
            <FormattedMessage
              id="pages.login.phoneNumber.invalid"
              defaultMessage="Phone number is invalid!"
            />
          ),
        },
      ]}
    />
  );
}
