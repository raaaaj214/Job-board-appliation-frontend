'use client'
import {  useEffect, useState } from 'react';
import PostContainer from './_components/PostContainer/PostContainer';
import { getMyDetails } from './_utils';
  import {  useRouter } from 'next/navigation';
import { useAuth } from './_hooks/authContext';


export  default function Home() {
  const [search , setSearch] = useState(" ")
  const [loading , setLoading] = useState(true)
  const {isLoggedIn , setIsLoggedIn , user , setUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn === false)
      {
        console.log(user)
        console.log("going to login")
        router.push("/auth/login")
      }
      else if(isLoggedIn == true)
        setLoading(false)
        
  }, [isLoggedIn])
  return (
    loading === true ? <div>Wait</div> :
      <div className='w-full  flex flex-col justify-center items-center gap-8'>
        <div className="h-40 w-full bg-primary/45 flex px-8 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-2" >
            <input
            className='w-9/12 sm:w-[50rem] py-1 px-1 focus:border-none focus:outline-none'
              type="text"
              name='title'
              id='search-bar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            />
            <button className='bg-white py-1 px-2 rounded-md md:px-6'>Search</button>
        </div>
        <PostContainer search={search} />
      </div>
  );
  
  
}

