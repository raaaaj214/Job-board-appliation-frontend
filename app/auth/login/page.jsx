import Form from '@/app/_components/Form/Form'
import React from 'react'

export const metadata = {
    title : "Login",
    description : "Login to proceed"
}
const page = () => {
  return (
    <div className='w-full max-h-svh pt-10 flex flex-col justify-center items-center'>
      <Form/>
    </div>
  )
}

export default page
