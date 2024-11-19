'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import locationImg from "../../../public/assets/745228.png"
import jobTypeImg from "../../../public/assets/71200.png"
import { toast } from 'react-toastify'
import { Router, useRouter, useSearchParams } from 'next/navigation'

const Page = ({params}) => {
  const [jobData , setJobData] = useState({})
  const [loading , setLoading] = useState(true)
  const searchParams = useSearchParams()
  const  displayParam = searchParams.get('t')
  const router = useRouter()
  useEffect(() => {
    fetch(`http://localhost:4000/user/getonejob/${params.postId}` , {
      credentials : 'include' ,
      cache : "no-cache"
    }).then((res) => {
       res.json().then((data)=>{
        setJobData(data.jobData)
        setLoading(false)
       })
      
    }).catch((err) =>{
      console.error(err)
    })
  }, [])


  const jobApplyHandler = () => {
      fetch(`http://localhost:4000/user/applyjob/${jobData._id}` , {
        credentials : 'include'
      }).then((res) => {
            res.json().then((data) => {
              toast(data.message)
              
            }
            ).catch((err) => console.error(err))
      }).catch((err) => console.error(err))
  }
  return (
    loading === true ? <div className=' h-40 w-full flex justify-center items-center text-2xl font-bold'>Loading Content</div>  : 
    <div className='flex flex-col justify-center items-center py-8 px-2 gap-4 w-full'>
      <h1 className='font-bold text-4xl text-primary'>{jobData.position?.toUpperCase()}</h1>
      <div className="sm:w-6/12 rounded-2xl flex flex-col justify-center items-center gap-8 bg-white pt-6 md:pt-12 pb-6 px-5 md:px-10">
        <div className="flex flex-col justify-center items-center w-full gap-6">
          {/* <div className="w-full flex flex-col justify-center items-start ">
            <h2 className='font-bold text-2xl'>{jobData.position?.toUpperCase()}</h2>
            <p className='font-semibold text-md'>{jobData.companyName?.toUpperCase()}</p>
          </div> */}
          <div className="w-full flex justify-start items-start flex-wrap gap-y-4 ">
            <span className='w-3/6 flex flex-col justify-center items-start gap-1 '>
              <span className='flex justify-start items-center gap-1'>
              {/* <Image 
                src={locationImg}
                width={20}
                height={20}
                alt='icon'
              />  */}
              <b>Location</b> </span>
              <p>{jobData.location}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-start gap-1'>
              <span className='flex justify-start items-center gap-1'>
            {/* <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              />  */}
              <b>Job&nbsp;Type</b> </span>
            <p>{jobData.jobType}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-start gap-1'>
              <span className='flex justify-start items-center gap-1'>
            {/* <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              />  */}
              <b>Vacancies</b> </span>
            <p className=''>{jobData.vacancies}</p>
            </span>
            <span className='w-3/6 flex flex-col justify-center items-start gap-1'>
              <span className='flex justify-start items-center gap-1'>
            {/* <Image 
                src={jobTypeImg}
                width={20}
                height={20}
                alt='icon'
              />  */}
              <b>Applications</b> </span>
            <p className=''>{jobData.applications ? jobData.applications.length : 0  }</p>
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
                  return <li key={req} className='py-1 bg-secondary text-white px-6 rounded-2xl'>{req}</li>
                })}
                </ul>
              </div>
            </div>
            <div className="felx flex-col justify-center items-start gap-4 bg-accent py-4 px-6 rounded-2xl">
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
      <></> : <button className='bg-primary rounded-full px-12 py-2  text-white font-semibold' onClick={() => {jobApplyHandler()}}>Apply</button>}
      </div>
    </div>
  )
}

export default Page
