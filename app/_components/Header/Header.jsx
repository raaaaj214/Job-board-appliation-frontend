'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/assets/logoipsum-288 (1).svg'
import navlogo from '../../../public/assets/icons8-menu.svg'
import Navbar from '../Navbar/Navbar'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getMyDetails } from '@/app/_utils'
import { useAuth } from '@/app/_hooks/authContext'
import Link from 'next/link'

const   Header = () => {
  const [disabled , setDisabled] = useState(null)
  const [navActive , setNavActive] = useState('closed')
  const router = useRouter();
  const {isLoggedIn , setIsLoggedIn , user , setUser} = useAuth();

  const logOut = async () => {
    setDisabled(true)
    const res = await fetch("http://localhost:4000/common/logout" , {
      credentials : 'include'
    })
    const data = await res.json()
    toast(data.message)
    if(data.success == true)
    {
      router.push("/auth/login")
      setIsLoggedIn(false)
    }
    setDisabled(false)
  }
  
  const viewProfile = () => {
    router.push("/me")
  }
  return isLoggedIn === true && (<header className={`flex flex-row justify-between items-center w-[100%] gap-0 py-6 px-6 lg:px-10  bg-white shadow-lg`}>
  <div className='flex flex-row justify-center items-center '>
     <h1 className='font-black text-2xl text-primary'>Onboard</h1>
  </div >
   <Navbar/>

  <div className="hidden md:flex flex-row justify-center items-center gap-6 lg:gap-10">
  <button className='text-black text-lg' onClick={() => {viewProfile()}}>Profile</button>
    <button className='text-secondary text-lg ' onClick={logOut} disabled={disabled}>Logout</button> 
    
  </div>
    <div className='w=20 md:hidden'>
      <Image 
          src = {navlogo}
          width={25}
          height={25}
          alt="Logo" 
          onClick={() => {
            setNavActive('active');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden'
          }}
          />
      </div>
  
      <div className={`w-dvw bg-gray-300 h-dvh gap-28 p-4 absolute top-0 left-0 ${navActive} flex-col justify-start items-center`}>
        <button className='self-end mr-4 text-3xl' onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'}} >x</button>
        <nav className='flex flex-col justify-center items-start gap-6 text-xl weight font-bold '> 
        <Link href="/" onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'}}>Find Job</Link>
        <Link href="/company" onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'}}>Companies</Link>
        <Link href="/upload" onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'}}>Upload Job</Link>
        {/* <Link href="/about"onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'}} >About Us</Link> */}
        <button  onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto'; viewProfile()}}>Profile</button>
      <button onClick={() => {setNavActive("closed"); document.getElementsByTagName('html')[0].style.overflow = 'auto' ; logOut()}} disabled={disabled}>Logout</button> 
      </nav> 
      </div>
</header>)
}

export default Header
