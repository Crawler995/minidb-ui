import React from 'react';
import './App.css';
import Main from './components/Main';
import PageWrapper from './components/PageWrapper';

function App() {
  return (
    <div className="App">
      <PageWrapper>
        <Main />
      </PageWrapper>
    </div>
  );
}

export default App;
