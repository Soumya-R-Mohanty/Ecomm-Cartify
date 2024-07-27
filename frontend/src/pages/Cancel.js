import React from 'react'
import { Link } from 'react-router-dom'
import CANCELIMAGE from "../assest/cancel.gif"

const Cancel = () => {
  return (
    <div className='bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-1'>
        <img src={CANCELIMAGE} width={150} height={150} className='mix-blend-multiply'/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default Cancel