import React from 'react'

const RegisterPage = () => {
  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center text-black'>
          회원가입
        </h1>
        <form className='mt-6'>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-black'>
              email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'/>
          </div>
          <div className='mb-2'>
            <label
              htmlFor='Name'
              className='text-sm font-semibold text-black'>
              name
            </label>
            <input
              type='text'
              id='name'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'/>
          </div>
          <div className='mb-2'>
            <label
              htmlFor='password'
              className='text-sm font-semibold text-black'>
              password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'/>
          </div>
          <div className='mt-6'>
            <button type='submit' className='w-full px-4 py-2 rounded-md hover:bg-gray-700 duration-200'>
              회원가입
            </button>
          </div>
          <p className='mt-8 text-xs font-light text-center text-black'>
            아이디가 있다면?{" "}
            <a href='/login' className='font-medium hover:underline'>
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage