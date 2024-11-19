'use client'
import {  useEffect, useState } from 'react';
import PostContainer from './_components/PostContainer/PostContainer';
import { getMyDetails } from './_utils';
  import {  useRouter } from 'next/navigation';
import { useAuth } from './_hooks/authContext';


export  default function Home() {
  const [search , setSearch] = useState("")
  const [loading , setLoading] = useState(true)
  const {isLoggedIn , setIsLoggedIn , user , setUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn === false)
      {
        setLoading(false)
        router.push("/auth/login")
      }
      else if(isLoggedIn == true)
        setLoading(false)
        
  }, [isLoggedIn])
  return (
    loading === true ? <div className=' h-40 w-full flex justify-center items-center text-2xl font-bold'>Loading Content</div> :
      <div className='w-full  flex flex-col justify-center items-center gap-8 '>
        <div className="h-40 w-full flex px-8 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-2" >
          <div className='border border-solid border-gray-500/40 shadow-md px-2 py-2 rounded-full bg-white'>
            <input
            className='w-11/12 sm:w-[50rem] px-4 focus:outline-none rounded-md text-black'
              type="text"
              name='title'
              id='search-bar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Job Title , Location'
            />
            <button className='bg-tertiary text-fourth py-4 px-4 rounded-full md:px-12'>Search</button>
            </div>
        </div>
        <PostContainer search={search} />
      </div>
  );
  
  
}

