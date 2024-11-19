import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Upload = () => {
    const [disabled , setDisabled] = useState(false)

    const {reset,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = async(data) => {
        setDisabled(true)
        const arrayOfRequirements = data.requirements.split(",").map((str) => {return str.trim()})
        data.requirements = arrayOfRequirements
        const res = await fetch("http://localhost:4000/company/newjobpost" , {
            headers :  {
                'Content-Type': 'application/json'
            },
            method : "POST",
            credentials : 'include' ,
            body : JSON.stringify(data)
        })
        const resData = await res.json()

        toast(resData.message)
        setDisabled(false)
        reset()
      }
return (
    <form className='flex flex-col justify-center items-center bg-white gap-8 px-4 py-4 rounded-lg w-full md:w-2/3 xl:w-6/12' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="position" className='w-full  gap-2 flex flex-col'>Position &nbsp;
            <input type="text" className='w-full py-2 px-4 border-2  rounded-lg' id="position" {...register('position' , {required : true})} placeholder='Position' />
                {errors.position?.type === "required" && (
                    <p className="text-red-500 font-semibold">Position is required.</p>
                )}
                </label>
                <label htmlFor="location" className='w-full  gap-2 flex flex-col'>Location  &nbsp;
            <input type="text" id="location" className='w-full p-2 border-2  rounded-lg' {...register('location', {required : true})} placeholder='Location'/>
            {errors.location?.type === "required" && (
                    <p className="text-red-500 font-semibold">location is required.</p>
                )}
                </label>
                <label htmlFor="description" className=' w-full  gap-2 flex flex-col'>Description  &nbsp;
            <input type="text" id="description" className='w-full p-2 border-2  rounded-lg' {...register('description', {required : true})} placeholder='Description'/>
            {errors.description?.type === "required" && (
                    <p className="text-red-500 font-semibold">description is required.</p>
                )}
                </label>
                
                    <div className='flex flex-col justify-center items-start w-full'>
                        <label htmlFor="jobType-full-time" className='text-lg ' >
                        <input type="radio" className='w-4 h-4' {...register("jobType" , {
                            required : true
                        })} value="Full-time" />&nbsp;Full-time</label>  &nbsp;  &nbsp;
                        <label htmlFor="jobType-part-time" className='text-lg'>
                        <input type="radio" className='w-4 h-4'  {...register("jobType", {
                            required : true
                        })} value="Part-time" />&nbsp;Part-time</label> &nbsp; &nbsp;
                        <label htmlFor="jobType-intern" className='text-lg'>
                        <input type="radio" className='w-4 h-4'  {...register("jobType", {
                            required : true
                        })} value="Intern" />&nbsp;Internship</label>
                    </div>
            {errors.jobType?.type === "validate" && (
                    <p className="text-red-500 font-semibold">{errors.jobType.message}</p>
                )}
                <label htmlFor="requirements" className=' w-full  gap-2 flex flex-col'>Requirements (comma-seperated)  &nbsp;
            <input type="text" id="requirements" className='w-full p-2 border-2  rounded-lg' {...register('requirements', {required : true})}  placeholder='Requirements'/>
            {errors.requirements?.type === "required" && (
                    <p className="text-red-500 font-semibold">requirements is required.</p>
                )}
                </label>
                <label htmlFor="vacancies" className=' w-full  gap-2 flex flex-col'>Vacancies  &nbsp;
            <input type="number" id="vacancies" className='w-full p-2 border-2  rounded-lg' {...register('vacancies', {required : true})} placeholder='Vacancies'/>
            {errors.vacancies?.type === "required" && (
                    <p className="text-red-500 font-semibold">vacancies is required.</p>
                )}
                </label>
        <button type='submit' className='px-10 py-2 bg-blue-600 text-white font-medium rounded-2xl' disabled={disabled} >Post Job</button>
    </form>
  )
}

export default Upload
