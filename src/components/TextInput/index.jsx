import React from 'react'
import './style.css'

export default function TextInput({searchValue, handleChange}) {
  return (
      <input
          type="search"
          onChange={handleChange}
          value={searchValue}
      />
  )
}
