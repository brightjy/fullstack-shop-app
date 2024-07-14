import React from 'react'

const continents = [
  { key: 1, value: "Africa"},
  { key: 2, value: "Europe"},
  { key: 3, value: "Asia"},
  { key: 4, value: "North America"},
  { key: 5, value: "South America"},
  { key: 6, value: "Australia"},
  { key: 7, value: "Antarctica"},
]

const UploadProductPage = () => {
  return (
    <section>
      <div className='text-center m-7'>
        <h3>상품 업로드</h3>
      </div>

      <form className='mt-6'>
        <div className='mt-4'>
          <label>이름</label>
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='title'
            id='title'
          />
        </div>

        <div className='mt-4'>
          <label>설명</label>
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='description'
            id='description'
          />
        </div>

        <div className='mt-4'>
          <label>가격</label>
          <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name='price'
            id='price'
            type='number'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='continents'>지역</label>
          <select 
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            name='continents' 
            id='continents'
          >
            {continents.map(item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>

        <div className='mt-8'>
          <button className='w-full px-4 text-white bg-black rounded-md hover:bg-gray-700 py-2'>
            생성하기
          </button>
        </div>

      </form>
    </section>
  )
}

export default UploadProductPage