import React from 'react';
import './App.css';

import { Row, Col } from 'antd';

import PageWrapper from './components/PageWrapper';
import PageLayout from './components/PageLayout';
import SQLEditor from './components/SQLEditor';

function App() {
  return (
    <div className="App">
      <PageWrapper>
        <PageLayout
          header={<div>fasdf</div>}
          content={
            <Row gutter={12}>
              <Col span={12}>
                <SQLEditor />
              </Col>

              <Col span={12}>

              </Col>
            </Row>
          }
        />
      </PageWrapper>
    </div>
  );
}

export default App;
