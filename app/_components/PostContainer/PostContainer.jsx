"use client"
import React  , {useEffect, useState} from 'react'
import { getMyDetails } from '@/app/_utils'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Post from '../Post/Post'

const PostContainer = ({search}) => {
    const [posts , setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
      const func = async () => {
        const url = `http://localhost:4000/user/getjobs?search=${search.trim()}`
        const res = await fetch( url, {
            credentials : 'include',
            cache : "no-cache"
        }) 
        const postData = await res.json();
        if(postData){
            setPosts(postData.jobs)
        }
      }      
      func();


    }, [search])
    
  return (
    <div className='w-full flex flex-col py-4 justify-center items-center gap-6 sm:flex-row flex-wrap sm:px-4 lg:px-16 xl:px-40'>

      { posts?.length > 0  ? ( posts?.map((post) => (
        
        <Post  key={post._id} post={post}/>
      ))
       || (
        <div><h1 className='text-2xl font-semibold'>Company Account</h1></div>) ) : (
        <div><h1 className='text-2xl font-semibold'>No Posts Found</h1></div>
        )
      }

    </div>
  )
}

export default PostContainer
