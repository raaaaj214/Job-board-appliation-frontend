'use client'
import React , { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Actor } from 'next/font/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Job = ({job , fetchJobs}) => {
  
  const [active , setActive] = useState(false)
  const [disabled , setDisabled] = useState(false)


    const router = useRouter()
    const viewPostHandler = (postId) => {
          router.push(`/post/${postId}?t=true`) 
      }

      const postDeleteHandler = async() =>{
        if(confirm("Do you want to delete this post ?"))
        {

          setDisabled(true)
          const res = await fetch('http://localhost:4000/company/deletejobpost/' + job?._id , {
            method : 'DELETE',
            credentials : 'include',
            
          })
          const data = await res.json();
                toast(data.message)
                if(data.success == true)
                  fetchJobs()
        }
      }
  return (
    <div className='w-72 flex  flex-col justify-center items-center p-6 rounded-xl bg-fourth' >
      <div className=" top flex flex-col justify-start items-start gap-4 w-full border-b-[1px] pb-6 border-black" >
    <div className="flex flex-col justify-center items-start gap-4 ">
        <span  onClick={(e) => {
        if(e.target.classList.contains('omit'))
        {
          return;
        }
        else{
          viewPostHandler(job._id)
        }
        }}>
      <h3 className='text-2xl font-semibold'>{job.position}</h3>
      <p className='text-base font-medium mt-2'>{job.jobType}</p>
    </span>
      <button className='omit bg-red-600 px-6 py-2 rounded-full text-xs font-medium text-white' onClick={() => {postDeleteHandler()} } disabled={disabled}  >Delete Job Post</button>
    </div>
    <div className="w-full  flex flex-col justify-center items-start gap-1">
      <span >
        <p className='text-lg font-medium '>Location :  &nbsp;
        {job.location}</p>
      </span>
      <span>
      <p className='text-lg font-medium '> Vacancies : &nbsp;
      {job.vacancies}</p>
      </span>
      <span>
      <p className='text-lg font-medium '> Applications : &nbsp;
      {job.applications?.length}</p>
      </span>
    </div>
    </div>
    { job.applications.length != 0 ?
    <Dialog>
      <DialogTrigger asChild>
      <div className="w-full flex flex-col justify-start items-end pt-4 gap-8 cursor-pointer" onClick={(e) => {
      setActive(!active)
    }}>
      <button className='bg-primary text-white px-6 py-2 rounded-xl text-xl font-medium w-full' >Applicants list</button>
      
    </div>
      </DialogTrigger>
      <DialogContent  className="bg-accent h-3/4 overflow-x-hidden">
      <DialogHeader className="flex flex-col gap-4 justify-start items-start">
        <DialogTitle className="text-2xl">Applicants List</DialogTitle>
        <DialogDescription className="w-full flex flex-col justify-start items-start gap-4 ">
        {job.applications?.map(person => 
         {
          return (<div key={person._id} className='bg-white rounded-md p-2 w-full'>
            <h4 className='text-lg text-primary font-semibold'>{person.firstName} {person.lastName}</h4>
            <p className='text-sm text-primary font-normal'>{person.email}</p>
          </div>)
         }
          )}
         
        </DialogDescription>
      </DialogHeader>
      </DialogContent>
    </Dialog>
     :
    <div className="flex flex-col justify-start items-end w-full py-4 gap-8">
    <h3 className='text-xl font-medium cursor-default'>No Applicants</h3>
    </div>
    }
  </div>
  )
}

export default Job
