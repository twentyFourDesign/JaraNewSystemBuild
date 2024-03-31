import React from 'react'

const Input = ({placeholder,className,style,type,name,onChangeFun}) => {
  return (
    <div>
      <input 
        style={style} 
        placeholder={placeholder} 
        className={className}
        type={type}
        name={name}
        onChange={(e)=>{onChangeFun(e)}} 
      />
    </div>
  )
}

export default Input
