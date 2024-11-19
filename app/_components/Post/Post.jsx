'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import locationImg from "../../../public/assets/745228.png"
import jobTypeImg from "../../../public/assets/71200.png"
import { useRouter } from 'next/navigation'

const Post = ({post}) => {
  const router = useRouter()
  const viewPostHandler = (postId) => {
      router.push(`/post/${postId}`) 
  }
  return (
    <div className='w-11/12 shadow-gray-400 shadow-md px-4 py-4 flex flex-col justify-center items-start rounded-2xl max-w-80 bg-white'>
      <div className="flex flex-col justify-center items-start pb-6 ">
        <h3 className='text-2xl font-semibold'>{post.position}</h3>
        <p className='text-base font-medium' >{post.companyName}</p>
      </div>
      <div className=" flex justify-around items-center w-full border-b border-gray-300 pb-8 ">
        <span className='flex flex-col justify-center items-center gap-0'>
          <Image 
            src={locationImg}
            width={20}
            height={20}
            alt='icon'
          />
          <p>{post.location}</p>
        </span>
        <span className='flex flex-col justify-center items-center gap-0'>
        <Image 
            src={jobTypeImg}
            width={20}
            height={20}
            alt='icon'
          />
        <p>{post.jobType}</p>
        </span>
      
      </div>
      <button className=' pt-8  self-end text-md text-blue-800 font-medium flex justify-center items-center'  onClick={() => {viewPostHandler(post._id)}}>
        View details 
        <img src="/assets/view.svg" className='w-7' alt="" />
      </button>
    </div>
  )
}

export default Post
