import React, { useState } from 'react'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import IconButton from './IconButton';
import { Button } from 'antd';


export default function SQLEditor() {
  const [code, setCode] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  const getSelectedCode = (value: any) => {
    if(code === '') {
      return '';
    }
    
    value = JSON.parse(JSON.stringify(value));
    const { start, end } = value;

    if(start.row === end.row && start.column === end.column) {
      return '';
    }

    const codeRows = code.split('\n');
    let res = [];

    for(let i = start.row; i <= end.row; i++) {
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
    <div>
      <div style={{ margin: '10px 0' }}>
        <Button
          type="primary" 
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => console.log('run code: ' + code)}
        >Run SQL</Button>
        <Button 
          type="default" 
          size="small" 
          style={{ margin: '0 4px' }}
          onClick={() => console.log('run selected code: ' + selectedCode)}
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
        height="45vh"
        fontSize="16px"
        mode="sql"
        theme="github"

        value={code}
        onChange={(value) => setCode(value)}
        onSelectionChange={(value) => setSelectedCode(getSelectedCode(value))}

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
    </div>
  )
}
