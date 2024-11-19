import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <nav className='hidden flex-row justify-evenly items-center gap-6 w-[50%] md:flex  lg:gap-10 text-black text-lg'> 
      <Link href="/">Find Job</Link>
      <Link href="/company">Companies</Link>
      <Link href="/upload">Upload Job</Link>
      {/* <Link href="/about">About Us</Link> */}
    </nav>
  )
}

export default Navbar
