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
        console.log(data)
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
    <form className='flex flex-col justify-center items-center bg-gray-200 gap-8 px-4 py-4 rounded-lg sm:w-6/12' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="position" className='w-full  gap-2 flex flex-col'>Position &nbsp;
            <input type="text" className='w-full p-2 focus:border-none focus:outline-none' id="position" {...register('position' , {required : true})} placeholder='Position' /></label>
                {errors.position?.type === "required" && (
                    <p className="errorMsg">Position is required.</p>
                )}
                <label htmlFor="location" className='w-full  gap-2flex flex-col'>Location  &nbsp;
            <input type="text" id="location" className='w-full p-2 focus:border-none focus:outline-none' {...register('location', {required : true})} placeholder='Location'/></label>
            {errors.location?.type === "required" && (
                    <p className="errorMsg">location is required.</p>
                )}
                <label htmlFor="description" className=' w-full  gap-2 flex flex-col'>Description  &nbsp;
            <input type="text" id="description" className='w-full p-2 focus:border-none focus:outline-none' {...register('description', {required : true})} placeholder='Description'/></label>
            {errors.description?.type === "required" && (
                    <p className="errorMsg">description is required.</p>
                )}
                
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
                    <p className="errorMsg">{errors.jobType.message}</p>
                )}
                <label htmlFor="requirements" className=' w-full  gap-2 flex flex-col'>Requirements (comma-seperated)  &nbsp;
            <input type="text" id="requirements" className='w-full p-2 focus:border-none focus:outline-none' {...register('requirements', {required : true})}  placeholder='Requirements'/></label>
            {errors.requirements?.type === "required" && (
                    <p className="errorMsg">requirements is required.</p>
                )}
                <label htmlFor="vacancies" className=' w-full  gap-2 flex flex-col'>Vacancies  &nbsp;
            <input type="number" id="vacancies" className='w-full p-2 focus:border-none focus:outline-none' {...register('vacancies', {required : true})} placeholder='Vacancies'/></label>
            {errors.vacancies?.type === "required" && (
                    <p className="errorMsg">vacancies is required.</p>
                )}
        <button type='submit' className='px-6 py-1 bg-blue-600 text-white font-medium rounded-2xl' disabled={disabled} >Post Job</button>
    </form>
  )
}

export default Upload
