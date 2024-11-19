import Form from '@/app/_components/Form/Form'
import React from 'react'

export const metadata = {
    title : "Login",
    description : "Login to proceed"
}
const Page = () => {
  return (
    <div className='w-full min-h-dvh pt-10 flex flex-wrap justify-center items-center bg-accent md:gap-12 lg:gap-40'>
      <div className=' flex flex-col justify-center items-center'>
        <h1 className='text-primary font-black text-4xl md:text-6xl lg:text-7xl '>Onboard</h1>
        <p className='md:text-lg lg:text-2xl  '>We believe in connections</p>
      </div>
      <Form/>
    </div>
  )
}

export default Page
