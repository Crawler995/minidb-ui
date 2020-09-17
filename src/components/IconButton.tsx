import React from 'react'

interface IProps {
  iconSrc: string;
  onClick: () => void;
  tips: string;
}

export default function IconButton(props: IProps) {
  return (
    <div
      className="icon-button-hover" 
      style={{
        width: '40px',
        height: '40px',
        backgroundImage: `url(${props.iconSrc})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center'
      }}
      onClick={props.onClick}
    >

    </div>
  )
}
