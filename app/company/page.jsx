'use client'
import React, { useEffect, useState } from 'react'
import Tile from '../_components/Tile/Tile'

const page = () => {
    const [data , setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:4000/common/allcompanies" , {
                cache : "no-cache",
                credentials : 'include'
            })
            const data = await res.json();
            setData(data.companies);
            console.log(data.companies)
        }

        fetchData();
    } , [])
  return (
    <div className='flex flex-col py-12 px-2 justify-center items-start gap-8 sm:px-10 md:px-16 lg:px-56 '>
      {data?.map(company => {return (<Tile key={company._id} company={company}/>)})}
    </div>
  )
}

export default page

