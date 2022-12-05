import { Drawer } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';

export default function DetailDrawer({
  showDetail,
  setCurrentRow,
  setShowDetail,
  currentRow,
  columns,
}) {
  return (
    <Drawer
      width={600}
      visible={showDetail}
      onClose={() => {
        setCurrentRow(undefined);
        setShowDetail(false);
      }}
      closable={false}
    >
      {currentRow?.name && (
        <ProDescriptions
          column={2}
          title={currentRow?.name}
          request={async () => ({
            data: currentRow || {},
          })}
          params={{
            id: currentRow?.name,
          }}
          columns={columns}
        />
      )}
    </Drawer>
  );
}
