import React from 'react'

const Button = ({buttonTitle,className,style,onClickFunc}) => {

  return (

    <div>
      <button onClick={onClickFunc} style={style} className={className}>{buttonTitle}</button>
    </div>
  )
}

export default Button
