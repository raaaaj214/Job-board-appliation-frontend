import React from 'react'

const Tile = ({company}) => {
  return (
    <div className='bg-white p-6 flex flex-col justify-center items-start gap-4 w-full rounded-3xl shadow'>
      <div className="flex flex-row justify-center items-center gap-4">
        <img src={company.logo} alt="company logo" className='rounded-[50%] w-16 h-16' />
        <h2 className='text-2xl font-semibold'>{company.name}</h2>
      </div>
      <div className="company-desc">
        <p className='text-md font-normal '>{company.description}</p>
      </div>
    </div>
  )
}

export default Tile
