'use client'
import { useRouter, useSearchParams, } from 'next/navigation';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '@/app/_hooks/authContext';


    const Form = () => {
        const {isLoggedIn , setIsLoggedIn , user , setUser} = useAuth();
        const [type , setType] = useState("employee");
        const [email, setemail] = useState('')
        const [password, setpassword] = useState('')
        const [disabled , setDisabled] = useState(false)
        const router = useRouter();
        const searchParams = useSearchParams()
        const paramType = searchParams.get('type')
        useEffect(() => {
            if(paramType == "employee")
                setType("employee")
            else if(paramType == "company")
                setType("company")
            
        } , [])

        
        useEffect(() => {
            router.push(`?type=${type}`)
        } , [type])

        const clickHandler = (val) => {
            setType(val)
        }

        const  formHandler = async (e) => {
            setDisabled(true)
            let url = '';
            e.preventDefault();

            if(type === 'employee')
             url = "http://localhost:4000/user/login"
            else
            url = "http://localhost:4000/company/login"
            const res = await fetch( url ,{
                method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials : 'include'
        ,
        body: JSON.stringify({
            email : email,
            password : password
        }),
            })


            const data = await res.json();
            toast(data.message)
            if(data.success === 'true')
            {
                setIsLoggedIn(true)
                router.replace("http://localhost:3000/")
            }
            setDisabled(false)
        }
    return (
        <div className='bg-white justify-center items-center px-6 py-6 shadow-lg flex flex-col sm:m-w-80 rounded-xl'>
            <div className='flex justify-center items-center gap-8'>
            <button className='p-2 text-white text-sm rounded-md' onClick={( )=> {clickHandler("employee")}} style={type == 'employee' ? {background : "#2196f3"} : {color : "grey"}}>Employee</button>
            <button className='p-2 text-white text-sm rounded-md' onClick={() => {clickHandler("company")}} style={type == 'company' ? {background : "#2196f3"} : {color : "grey"}} >Company</button>
            </div>
            <form onSubmit={formHandler} className='w-full flex flex-col justify-evenly gap-8 items-center  py-8'>
                <label htmlFor="email">
                Email<br/> <input className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' type="email" name='email' value={email} onChange={(e) => {setemail(e.target.value)}}/> </label>
                <label htmlFor="pass">Password <br/> <input  className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' type="password" name="pass" value={password} onChange={(e) => {setpassword(e.target.value)}}/></label>
                <button type='submit' className='w-40  p-2 text-white text-sm rounded-md bg-tertiary' disabled={disabled} >Login</button>
            </form>
            <Link href={"/auth/register/?type=" + type} className='text-secondary active:text-violet-900 font-semibold'>Register Account</Link>
        </div>
    )
    }

    export default Form
