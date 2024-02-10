'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Post from '../_components/Post/Post'
import Job from '../_components/Job/Job'
import { useAuth } from '../_hooks/authContext'

const page = () => {
  const [myData , setMyData] = useState({})
  const [jobs , setJobs] = useState([])
  const {isLoggedIn , setIsLoggedIn , user , setUser} = useAuth();
  const [isLoading , setIsLoading] = useState(true);

  const fetchJobs = () => {
    fetch("http://localhost:4000/company/getalljobposts" , {
      credentials : 'include',
      cache : 'no-cache'
    }).then((res) => {
       res.json().then((data) => {
        if(data.status == false){
          toast(data.message)
        }
        setJobs(data.jobs)
        console.log(data)
       })
    }).finally(() => setIsLoading(false))
  }
  useEffect( () => {
    console.log(isLoggedIn)
    if(isLoggedIn == true)
    {
      fetchJobs()
      console.log("logged in")
    }
  } , [isLoggedIn])
  return (
    isLoading == true ? <div className='flex  text-3xl justify-center items-center h-80'><h1>Loading</h1></div> :
    <div className='w-full flex flex-col justify-center items-center  pt-8 px-2 gap-8 md:px-20' >
      <div className=" w-full flex  bg-gray-200 flex-col rounded-md justify-center items-start gap-4 p-3">
      {/* <h1>Hello World</h1> */}
        <img src={user?.profilePicture || user?.logo} alt="profile picture"  className='w-20 h-20 rounded-[50%] ' id='pp'/>
      <div className="flex flex-col justify-center items-start">
          <h2 className='font-semibold text-2xl'>{user?.firstName || user?.name}&nbsp;{user?.lastName}</h2>
          <p className='font-normal text-md'>{user?.email}</p>
      <button className='mt-10 border-blue-400 border-2 px-8 py-1 rounded-md text-blue-400'>Edit Profile</button>
      </div>
      <p>{user?.description}</p>
      </div>
        {jobs && 
      <div className='w-full flex flex-col justify-center items-center gap-8 p-2'>
        {jobs.length == 0 ? <h1 className='text-2xl font-semibold'>No job posts yet</h1> : 
        <>
        <h1 className='text-3xl font-medium'>Your Jobs</h1>
        <div className='w-full  flex flex-col justify-center items-center gap-8 sm:flex-row sm:items-start sm:flex-wrap '>
        {jobs?.map((post) => {
          return <Job job={post} fetchJobs={fetchJobs}/>
        })}
        </div>
        </>
        }
      </div>
}
    </div>
  )
}

export default page
