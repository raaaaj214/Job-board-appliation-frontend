'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import locationImg from "../../../public/assets/745228.png"
import jobTypeImg from "../../../public/assets/71200.png"
import { toast } from 'react-toastify'
import { Router, useRouter, useSearchParams } from 'next/navigation'

const page = ({params}) => {
  const [jobData , setJobData] = useState({})
  const [loading , setLoading] = useState(true)
  const searchParams = useSearchParams()
  const  displayParam = searchParams.get('t')
  console.log(typeof(displayParam))
  const router = useRouter()
  useEffect(() => {
    fetch(`http://localhost:4000/user/getonejob/${params.postId}` , {
      credentials : 'include' ,
      cache : "no-cache"
    }).then((res) => {
       res.json().then((data)=>{
        console.log(data.jobData)
        setJobData(data.jobData)
        setLoading(false)
       })
      
    }).catch((err) =>{
      console.log(err)
    })
  }, [])


  const jobApplyHandler = () => {
      fetch(`http://localhost:4000/user/applyjob/${jobData._id}` , {
        credentials : 'include'
      }).then((res) => {
            res.json().then((data) => {
              toast(data.message)
              
            }
            ).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
  }
  return (
    loading === true ? <div>Loading</div> : 
    <div className='flex flex-col justify-center items-center py-8 px-2 gap-4'>
      <h1 className='font-bold text-2xl '>{jobData.position?.toUpperCase()}</h1>
      <div className=" rounded-lg flex flex-col justify-center items-center gap-8 bg-gray-300 p-4">
        <div className="flex flex-col justify-center items-center w-full gap-6">
          <div className="w-full flex flex-col justify-center items-start ">
            <h2 className='font-bold text-lg'>{jobData.position?.toUpperCase()}</h2>
            <p className='font-semibold text-md'>{jobData.companyName?.toUpperCase()}</p>
          </div>
          <div className="w-full flex justify-start items-start flex-wrap gap-y-4 ">
            <span className='w-3/6 flex flex-col justify-center items-center gap-1 '>
              <span className='flex justify-start items-center gap-1'>
              <Image 
                src={locationImg}
                width={20}
                height={20}
                alt='icon'
              /> <b>Location</b> </span>
              <p>{jobData.location}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-center gap-1'>
              <span className='flex justify-start items-center gap-1'>
            <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              /> <b>Job&nbsp;Type</b> </span>
            <p>{jobData.jobType}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-center gap-1'>
              <span className='flex justify-start items-center gap-1'>
            <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              /> <b>Vacancies</b> </span>
            <p className='self-center'>{jobData.vacancies}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-center gap-1'>
              <span className='flex justify-start items-center gap-1'>
            <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              /> <b>Applications</b> </span>
            <p className='self-center'>{jobData.applications ? jobData.applications.length : 0  }</p>
            </span>
            </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-start w-full">
              <div className="felx flex-col justify-center items-start gap-2">
                <h3 className='font-semibold text-lg'>Description</h3>
                <p className=''>{jobData.description}</p>
              </div>
              <div className="flex flex-col  justify-center items-start gap-2">
                <h3 className='font-semibold text-lg'>Requirements</h3>
                <ul className='flex  justify-start flex-wrap items-start gap-2'>
                {jobData.requirements?.map((req) => {
                  return <li className='px-2 py-1 bg-gray-500 rounded-2xl'>{req}</li>
                })}
                </ul>
              </div>
            </div>
            <div className="felx flex-col justify-center items-start gap-4">
        <div className="w-full flex justify-start items-cente gap-4">
          <img src={jobData.companyId?.logo} alt="" className='w-10 h-10 rounded-[50%]'/>
          <h3>{jobData.companyId?.name}</h3>
        </div>
          <div className="company-desc">
            <h3>About the company</h3>
            <p>{jobData.companyId?.description}</p>
          </div>
      </div>
      {displayParam == 'true' ?
      <></> : <button onClick={() => {jobApplyHandler()}}>Apply</button>}
      </div>
    </div>
  )
}

export default page
