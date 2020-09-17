import React from 'react';

import { Layout } from 'antd';

interface IProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const { Content } = Layout;

export default function PageLayout(props: React.PropsWithChildren<IProps>) {
  const headerHeight = 40;
  const bgColor = '#fff';

  return (
    <Layout style={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>
      <div style={{ 
        position: 'fixed', 
        zIndex: 1, 
        display: 'flex',
        alignItems: 'center',
        width: '100%', 
        height: headerHeight,
        padding: '0 20px',
        backgroundColor: bgColor,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)'
      }}>
        { props.header }
      </div>

      <Content style={{ padding: 20, marginTop: headerHeight, backgroundColor: bgColor }}>
        { props.content }
      </Content>
    </Layout>
  )
}
