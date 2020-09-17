import React from 'react';

interface IProps {}

export default function PageWrapper(props: React.PropsWithChildren<IProps>) {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      { props.children }
    </div>
  )
}
