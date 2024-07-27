import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPannel = () => {
  const user=useSelector(state=>state?.user?.user)
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role !==ROLE.ADMIN){
      navigate("/")
    }
  },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow '>
        <div className='h-32 flex justify-center items-center flex-col'>
          <div className='text-4xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ):(
                <FaRegCircleUser />
              )
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p>{user?.role}</p>
        </div>

          {/* navigation */}
        <div>
            <nav className='grid p-4'>
              <Link to={"all-user"} className='px-2 py-1 hover:bg-slate-100'>All user</Link>
              <Link to={"all-product"} className='px-2 py-1  hover:bg-slate-100'>product</Link>
            </nav>
            
        </div>
      </aside>

      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPannel