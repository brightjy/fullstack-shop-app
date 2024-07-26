import React from 'react'

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <input 
      className='p-2 border border-gray-30 rounded-md'
      type='text'
      onChange={onSearch}
      value={searchTerm}
      placeholder='검색하세요.'
    />
  )
}

export default SearchInput