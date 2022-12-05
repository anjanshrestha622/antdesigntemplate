import { Button, Tooltip, Tag } from 'antd';
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';

const tableListDataSource = [];

for (let i = 0; i < 5; i += 1) {
  const totalMarks = Math.floor(Math.random() * 100);
  const passingMarks = Math.floor(totalMarks * 0.4);
  const timeAllocated = Math.floor((totalMarks / 100) * 180);

  tableListDataSource.push({
    key: i,
    name: 'Question set ' + i,
    slug: '/question-set-' + i,
    timeAllocated,
    totalMarks,
    passingMarks,
    createdAt: new Date(Math.random() * new Date().getTime()),
  });
}

const columns = [
  {
    title: 'QuestionSet Name',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: 'slug',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => <Tag>{record.slug}</Tag>,
  },
  {
    title: 'Time Allocated',
    width: 120,
    dataIndex: 'timeAllocated',
    align: 'center',
    sorter: (a, b) => a.timeAllocated - b.timeAllocated,
  },

  {
    title: 'Total Marks',
    width: 120,
    dataIndex: 'totalMarks',
    align: 'center',
  },
  {
    title: (
      <>
        Created at
        <Tooltip placement="top">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: 'Operations',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="1">Edit</a>,
      <a key="2">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

// record: ValueType, index: number, indent: number, expanded: boolean
const expandedRowRender = (record) => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      question: `Question ${i} in ${record.name}`,
      answers: [1, 2, 3, 4].map((x) => `Option ${x} for Question ${i}`),
      correctAnswer: `Option ${Math.floor(Math.random() * 4 + 1)} for Question ${i}`,
      marks: 1,
    });
  }
  return (
    <ProTable
      columns={[
        { title: 'Question', dataIndex: 'question', key: 'question' },
        {
          title: 'Answers',
          dataIndex: 'answers',
          key: 'answers',
          render: (dom, entity) => {
            return dom.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item}</div>
                  <br />
                </div>
              );
            });
          },
        },

        { title: 'Correct Answer', dataIndex: 'correctAnswer', key: 'correctAnswer' },
        { title: 'Marks', dataIndex: 'marks', key: 'marks' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Edit">Edit</a>, <a key="Remove">Remove</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default function NestedTableList({ title }) {
  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle={title}
      options={false}
      toolBarRender={() => [
        <Button key="show">View logs</Button>,
        <Button key="out">
          Export Data
          <DownOutlined />
        </Button>,
        <Button key="primary" type="primary">
          Add
        </Button>,
      ]}
    />
  );
}
