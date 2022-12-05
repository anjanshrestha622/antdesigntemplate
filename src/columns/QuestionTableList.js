const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    tip: `The Question is the unique key`,
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
    title: 'Image',
    dataIndex: 'image',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Answers',
    dataIndex: 'answers',
    valueType: 'textarea',
    hideInSearch: true,
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
  {
    title: 'Correct Answer',
    dataIndex: 'correctAnswer',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Explanation',
    dataIndex: 'explanation',
    hideInSearch: true,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    hideInSearch: true,
  },
  {
    title: 'Added By',
    dataIndex: 'addedBy',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: 'Operation',
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
        Edit
      </a>,
    ],
  },
];

export default columns;
