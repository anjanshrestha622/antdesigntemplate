import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';
import AddParentCategory from './components/AddParentCategory';
import AddTertiaryCategory from './components/AddTertiaryCategory';
import { category, handleUpdate, handleRemove } from './service';

const CategoryTableList = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createParentModalVisible, handleParentModalVisible] = useState(false);
  const [createTertiaryModalVisible, handleTertiaryModalVisible] = useState(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.categoryTable.updateForm.categoryName.nameLabel"
          defaultMessage="Category name"
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
      title: <FormattedMessage id="pages.categoryTable.titleSlug" defaultMessage="Slug" />,
      dataIndex: 'slug',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.categoryTable.titleParentCategory"
          defaultMessage="Parent Category"
        />
      ),
      dataIndex: 'parentCategory',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.categoryTable.titleTertiaryCategory"
    //       defaultMessage="Tertiary Category"
    //     />
    //   ),
    //   dataIndex: 'tertiaryCategory',
    //   sorter: true,
    //   hideInForm: true,
    //   hideInSearch: true,
    // },
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
          id: 'pages.categoryTable.title',
          defaultMessage: 'Categories',
        })}
        actionRef={actionRef}
        rowKey="slug"
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
          <Button
            type="secondary"
            key="secondary"
            onClick={() => {
              handleParentModalVisible(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage
              id="pages.categoryTable.addParentCategory"
              defaultMessage="Add Parent Category"
            />
          </Button>,
          <Button
            type="secondary"
            key="secondary"
            onClick={() => {
              handleTertiaryModalVisible(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage
              id="pages.categoryTable.addTertiaryCategory"
              defaultMessage="Add Tertiary Category"
            />
          </Button>,
        ]}
        request={category}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={
          {
            // showSizeChanger: false,
            // hideOnSinglePage: true,
            // pageSize: 10,
          }
        }
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
      <AddForm
        createModalVisible={createModalVisible}
        handleModalVisible={handleModalVisible}
        actionRef={actionRef}
      />
      <AddParentCategory
        createParentModalVisible={createParentModalVisible}
        handleParentModalVisible={handleParentModalVisible}
      />
      <AddTertiaryCategory
        createTertiaryModalVisible={createTertiaryModalVisible}
        handleTertiaryModalVisible={handleTertiaryModalVisible}
      />
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

export default CategoryTableList;
