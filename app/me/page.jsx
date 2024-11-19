'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Post from '../_components/Post/Post'
import Job from '../_components/Job/Job'
import { useAuth } from '../_hooks/authContext'

const Page = () => {
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
       })
    }).finally(() => setIsLoading(false))
  }
  useEffect( () => {
    if(isLoggedIn == true)
    {
      fetchJobs()
    }
  } , [isLoggedIn])
  return (
    isLoading == true ? <div className=' h-40 w-full flex justify-center items-center text-2xl font-bold'>Loading Content</div>  :
    <div className='w-full flex flex-col justify-center items-center  pt-8 px-2 gap-8 md:px-20' >
      <div className="md:w-6/12 w-full flex flex-col  bg-white  rounded-xl justify-normal items-start gap-4 p-4 divide-y-2" >
      <div className="flex flex-col justify-start items-start  ">
        <img src={user?.profilePicture || user?.logo} alt="profile picture"  className='w-20 h-20 rounded-[50%] ' id='pp'/>
          <h2 className='font-semibold text-2xl pt-4'>{user?.firstName || user?.name}&nbsp;{user?.lastName}</h2>
          <p className='font-normal text-left text-md w-full'>{user?.email}</p>
      </div>
      <p className='py-4'>{user?.description}</p>
      </div>
        {jobs && 
      <div className='w-full flex flex-col justify-center items-center gap-8 p-2'>
        {jobs.length == 0 ? <h1 className='text-2xl font-semibold'>You haven't posted any jobs yet</h1> : 
        <>
        <h1 className='text-3xl font-medium'>Your Jobs</h1>
        <div className='w-full  flex flex-col justify-center items-center gap-8 sm:flex-row sm:items-start sm:flex-wrap '>
        {jobs?.map((post) => {
          return <Job key={post._id} job={post} fetchJobs={fetchJobs}/>
        })}
        </div>
        </>
        }
      </div>
}
    </div>
  )
}

export default Page
