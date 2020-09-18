import { Row, Col } from 'antd'
import React from 'react'

interface IProps {
  curDatabase: string;
}

export default function StatusBar(props: IProps) {
  return (
    <Row style={{ height: '40px', lineHeight: '40px' }}>
      <Col span={8}>
        Current Database:
        <span style={{ marginLeft: 20, color: '#1890ff', fontWeight: 'bold' }}>
          { props.curDatabase }
        </span>
      </Col>
    </Row>
  )
}
