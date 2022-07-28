import React from 'react'
import './style.css'

export default function Button(props) {
    const {text, onClick, disabled} = props
  return (
    <button
      className='button'
      onClick={onClick}
      disabled={disabled}
      >{text}</button>
    
  )
}
