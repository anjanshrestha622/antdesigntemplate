import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import AddStaffForm from './components/AddStaffForm';
import { getStaffs } from './service';

export default function Staff() {
  const [createModalVisible, handleModalVisible] = useState(false);

  const intl = useIntl();
  const actionRef = useRef();

  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.categoryTable.updateForm.Name.nameLabel"
          defaultMessage="Name"
        />
      ),
      dataIndex: 'name',
      tip: 'The category name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: <FormattedMessage id="pages.categoryTable.titleEmail" defaultMessage="Email" />,
      dataIndex: 'email',
      valueType: 'email',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.categoryTable.titlePhone" defaultMessage="Phone" />,
      dataIndex: 'phone',
      valueType: 'number',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.categoryTable.titlePassword" defaultMessage="Password" />,
      dataIndex: 'password',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.categoryTable.titleRole" defaultMessage="Role" />,
      dataIndex: 'role',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.categoryTable.titleOption" defaultMessage="Option" />,
      // dataIndex: 'option',
      // valueType: 'option',
      hideInSearch: true,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.edit" defaultMessage="Edit" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.staffTable.title',
          defaultMessage: 'Staffs',
        })}
        actionRef={actionRef}
        rowKey="phone"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getStaffs}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{}}
      />

      <AddStaffForm
        createModalVisible={createModalVisible}
        handleModalVisible={handleModalVisible}
        actionRef={actionRef}
      />
    </PageContainer>
  );
}
