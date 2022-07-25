import React from 'react'
import './style.css'

export default function Button(props) {
    const {text, onClick} = props
  return (
    <button onClick={onClick}>{text}</button>
    
  )
}
