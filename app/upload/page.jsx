'use client'
import React, { useEffect , useState } from 'react'
import { getMyDetails } from '../_utils'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Upload from '../_components/UploadPost/Upload'

const page = () => {
    const router = useRouter()
    const [loading , setLoading] = useState(true)


    useEffect(() => {
        
        const fetchData = async () => {
            const data = await getMyDetails();

            if(data.type === 'employee' || data.status == false){
                toast("Can only access using company account")
                router.push("/")
                setLoading(false)

            }
            setLoading(false)
        }
        fetchData()
    } , [])
  return (
    loading === true ? <div>Wait</div> : 
    <div className='flex flex-col justify-center items-center gap-16 p-4'>
      <h1 className='text-2xl font-bold'>Upload A New Job Requirement</h1>
      <Upload/>
    </div>
  )
}

export default page
