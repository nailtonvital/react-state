import React from 'react'
import './style.css'

export default function TextInput({searchValue, handleChange}) {
  return (
      <input
      placeholder='Search something'
          type="search"
          onChange={handleChange}
          value={searchValue}
      />
  )
}
