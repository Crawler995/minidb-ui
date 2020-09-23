import React, { useEffect, useState } from 'react'

import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-sql";
import "../utils/ace-minidb-sql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Badge, Button } from 'antd';
import { Ace } from 'ace-builds';

interface IProps {
  defaultCode: string;
  isCodeRunning: boolean;
  annotations: Ace.Annotation[];
  onRunCode: (code: string) => void;
  onRunSelectedCode: (selectedCode: string, startRow: number, code: string) => void;
}


export default function SQLEditor(props: IProps) {
  const [code, setCode] = useState(props.defaultCode);
  const [selectedCode, setSelectedCode] = useState('');
  const [startRow, setStartRow] = useState(0);

  useEffect(() => {
    setCode(props.defaultCode);
  }, [props.defaultCode, props.annotations]);

  const getSelectedCode = (value: any) => {
    if(code === '') {
      return '';
    }
    
    value = JSON.parse(JSON.stringify(value));
    const { start, end } = value;
    setStartRow(start.row);

    if(start.row === end.row && start.column === end.column) {
      return '';
    }

    const codeRows = code.split('\n');
    let res = [];

    for(let i = start.row; i <= end.row; i++) {
      if(i >= codeRows.length) {
        break;
      }
      
      if(i === start.row) {
        if(i === end.row) {
          res.push(codeRows[i].substring(start.column, end.column));
          continue;
        }
        res.push(codeRows[i].substring(start.column));
        continue;
      }
      if(i === end.row) {
        res.push(codeRows[i].substring(0, end.column));
        continue;
      }
      res.push(codeRows[i]);
    }
    
    return res.join('\n') + '\n';
  }

  return (
    <Badge.Ribbon text="SQL Editor">
      <div style={{ margin: '10px 0' }}>
        <Button
          danger
          disabled={props.isCodeRunning}
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => props.onRunCode(code)}
        >Run SQL</Button>
        <Button 
          disabled={props.isCodeRunning}
          type="default" 
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => props.onRunSelectedCode(selectedCode, startRow, code)}
        >Run selected SQL</Button>

        <Button 
          type="default" 
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => setCode('')}
        >Clear SQL</Button>
      </div>

      <AceEditor
        width="100%"
        height="25vh"
        style={{
          border: '1px solid #f0f0f0'
        }}
        fontSize="16px"
        mode="sql"
        theme="github"

        value={code}
        onChange={(value) => setCode(value)}
        onSelectionChange={(value) => setSelectedCode(getSelectedCode(value))}

        annotations={props.annotations}

        showPrintMargin={false}
        editorProps={{
          $blockScrolling: true
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
      />
    </Badge.Ribbon>
  )
}
