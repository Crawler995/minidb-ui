import { Badge, Button, Table } from 'antd';
import React, { useEffect, useRef } from 'react'

interface IHistory {
  isSuccess: boolean;
  message: string;
  totalTime: string;
  time: string;
}

interface IProps {
  histories: IHistory[];
  onClearHistory: () => void;
}

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    render: (isSuccess: boolean) => {
      return isSuccess ? '✔' : '❌';
    }
  },
  {
    title: 'Message',
    dataIndex: 'message'
  },
  {
    title: 'Total time',
    dataIndex: 'totalTime'
  },
  {
    title: 'time',
    dataIndex: 'time'
  },
]

export default function OpHistory(props: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableBody = tableRef.current?.getElementsByClassName('ant-table-body')[0];

    if(tableBody) {
      tableBody.scrollTop = 10000;
    }
  }, [props.histories]);

  return (
    <Badge.Ribbon text="Operation History">
      <div style={{ margin: '10px 0' }}>
        <Button 
          type="default" 
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => props.onClearHistory()}
        >Clear History</Button>
      </div>
      
      <div ref={tableRef}>
        <Table
          className="op-history"
          size="small"
          pagination={false}
          columns={columns}
          dataSource={props.histories}
          scroll={{ y: 'calc(25vh - 28px)' }}
        />
      </div>
    </Badge.Ribbon>
  )
}
