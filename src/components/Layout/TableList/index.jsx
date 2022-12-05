import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';
import { handleUpdate, handleRemove } from './service';

const TableList = ({ title, keyName, columns: columnsProp, request }) => {
  const [createModalVisible, handleModalVisible] = useState(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const columns = [
    {
      title: keyName,
      dataIndex: keyName.toLowerCase(),
      tip: `The ${keyName} is the unique key`,
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
    ...columnsProp,
    {
      title: <FormattedMessage id="pages.categoryTable.titleOption" defaultMessage="Operation" />,
      valueType: 'option',
      hideInSearch: true,
      render: (text, record, _, action) => [
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
        headerTitle={title}
        actionRef={actionRef}
        rowKey={keyName.toLowerCase()}
        search={{
          labelWidth: 120,
          // filterType: 'light',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={request}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{}}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch Deletion" />
          </Button>
          {/* <Button type="primary">
            <FormattedMessage id="pages.batchApproval" defaultMessage="Batch Approval" />
          </Button> */}
        </FooterToolbar>
      )}
      <AddForm createModalVisible={createModalVisible} handleModalVisible={handleModalVisible} />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);

          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <DetailDrawer
        showDetail={showDetail}
        setCurrentRow={setCurrentRow}
        setShowDetail={setShowDetail}
        currentRow={currentRow}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
