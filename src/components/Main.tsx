import React, { useEffect, useState } from 'react'

import { Row, Col, message } from 'antd';

import PageLayout from './PageLayout';
import SQLEditor from './SQLEditor';
import OpHistory from './OpHistory';
import ResultTable from './ResultTable';
import StatusBar from './StatusBar';

import { getCurDatabase, runSQL } from '../data-center/network';
import { Ace } from 'ace-builds';

interface ITableColumn {
  title: string;
  dataIndex: string;
}

export default function Main() {
  const [histories, setHistories] = useState<any[]>([]);
  const [resultColumns, setResultColumns] = useState<ITableColumn[]>([]);
  const [resultData, setResultData] = useState<any[]>([]);
  const [pageHeight, setPageHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [curDatabase, setCurDatabase] = useState('(loading...)');
  const [defaultCode, setDefaultCode] = useState('');
  const [annotations, setAnnotations] = useState([] as Ace.Annotation[]);

  useEffect(() => {
    getCurDatabase()
    .then(res => {
      const { data } = res;
      if(data.status) {
        setCurDatabase(data.res);
      } else {
        setCurDatabase('(No database found!)');
      }
    })
    .catch(err => console.log(err));
    setResultColumns(['No result.'].map(column => ({
      title: column,
      dataIndex: column
    })));

    setPageHeight(window.innerHeight);
  }, []);

  const runCode = (code: string) => {
    setLoading(true);
    console.log(code);
    runSQL(code)
    .then(res => {
      setLoading(false);

      res.data.forEach((item) => {
        const {
          data,
          columns,
          status,
          message,
          totalTime,
          time,
          curDatabase
        } = item;
  
        setCurDatabase(curDatabase);
        setResultData(data);
        setResultColumns((columns.length === 0 ? ['No result.'] : columns).map(column => ({
          title: column,
          dataIndex: column
        })));
        setHistories(histories => [...histories, {
          key: histories.length,
          status,
          message,
          totalTime: totalTime + "ms",
          time,
          code
        }]);
        setDefaultCode(code);
      });

      const errors = res.data.map(item => item.error).filter(item => item !== null) as Required<Ace.Annotation>[];
      if(errors.length) {
        setAnnotations(errors.map(error => ({
          ...error,
          row: error.row - 1,
        })));
      } else {
        setAnnotations([]);
      }
    })
    .catch(err => console.log(err));
  }

  const runSelectedCode = (selectedCode: string, startRow: number, code: string) => {
    setLoading(true);
    console.log(selectedCode)
    runSQL(selectedCode)
    .then(res => {
      setLoading(false);

      res.data.forEach((item) => {
        const {
          data,
          columns,
          status,
          message,
          totalTime,
          time,
          curDatabase
        } = item;
  
        setCurDatabase(curDatabase);
        setResultData(data);
        setResultColumns((columns.length === 0 ? ['No result.'] : columns).map(column => ({
          title: column,
          dataIndex: column
        })));
        setHistories(histories => [...histories, {
          key: histories.length,
          status,
          message,
          totalTime: totalTime + "ms",
          time,
          code
        }]);
        setDefaultCode(code);
      })

      const errors = res.data.map(item => item.error).filter(item => item !== null) as Required<Ace.Annotation>[];
      if(errors.length) {
        setAnnotations(errors.map(error => ({
          ...error,
          row: error.row - 1 + startRow,
        })));
      } else {
        setAnnotations([]);
      }
    })
    .catch(err => console.log(err));
  }

  const recoverHistory = (historyIndex: number) => {
    window.getSelection()?.removeAllRanges();

    const history = histories.find(history => history.key === historyIndex);
    setDefaultCode(history.code);

    message.success(`Recovered to history code in ${history.time}!`);
  }

  return (
    <PageLayout
      header={
        <StatusBar
          curDatabase={curDatabase}
        />
      }
      content={
        <>
          <Row gutter={[60, 36]}>
            <Col span={12}>
              <SQLEditor
                annotations={annotations}
                defaultCode={defaultCode}
                isCodeRunning={loading}
                onRunCode={(code) => runCode(code)}
                onRunSelectedCode={(selectedCode, startRow, code) => runSelectedCode(selectedCode, startRow, code)}
              />
            </Col>

            <Col span={12}>
              <OpHistory
                onClearHistory={() => setHistories([])}
                onRecoverHistory={recoverHistory}
                histories={histories}
              />
            </Col>
          </Row>

          <Row gutter={[60, 36]}>
            <Col span={24}>
              <ResultTable
                columns={resultColumns}
                dataSource={resultData}
                loading={loading}
                scroll={{ y: pageHeight * 0.7 - 190, x: 'calc(100vw - 60px)' }}
              />
            </Col>
          </Row>
        </>
      }
    />
  )
}
