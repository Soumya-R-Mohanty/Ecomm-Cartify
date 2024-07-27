import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common/index.js';
import { toast } from 'react-toastify';
import { setUserdetails } from '../store/userSlice.js';
import ROLE from '../common/role.js';
import Context from '../context/index.js';
import logo from "../assest/logooo.jpg"

const Header = () => {
    const user=useSelector(state=>state?.user?.user)
    const dispatch=useDispatch()
    const[menuDisplay,setMenuDisplay]=useState(false)
    const context=useContext(Context)
    const navigate=useNavigate()
    const searchInput=useLocation()
    const URLsearch=new URLSearchParams(searchInput?.search)
    const searchquery=URLsearch.getAll("q")
    const [search,setSearch]=useState(searchquery)



    const handleLogout=async()=>{
        const fetchData=await fetch(summaryApi.logout_user.url,{
            method:summaryApi.logout_user.method,
            credentials:'include'
        })

        const data=await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserdetails(null))
            navigate("/")
        }

        if(data.error){
            toast.error(data.message)
        }
    }

    const handleSearch=(e)=>{
        const {value}=e.target
        setSearch(value)

        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate("/search")
        }
    }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center justify-between px-16'>
            <div className=''>
                <Link to="/">
                <img src={logo} width={100} />
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
                <input type='text' placeholder='search product Here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-green-300 flex items-center justify-center rounded-r-full'><GrSearch /></div>
            </div>

            <div className='flex items-center gap-7'>

                <div className='relative flex justify-center'>
                    {
                        user?._id && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev=>!prev)}>
                            {
                                user?.profilePic ?(
                                    <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ):(
                                    <FaRegCircleUser />
                                )
                            }
                        </div>
                        )
                    }
               
                {
                    menuDisplay &&(
                        <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
                    <nav>
                        {
                            user?.role===ROLE.ADMIN &&(
                                <Link to={'/admin-pannel/all-product'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Admin Pannel</Link>
                            )
                        }
                        <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Order</Link>
                    </nav>
                    
                </div>
                    )
                }
                </div>

                {
                    user?._id && (
                        <Link to={"/Cart"} className='text-2xl relative'>
                            <span><FaShoppingCart /></span>

                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-xs'>{context.cartProductCount}</p>
                            </div>
                        </Link>
                    )
                }

            <div>
                {
                    user?._id ? (
                        <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' >Logout</button>
                    ):(
                        <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 '>Login</Link>
                    )
                }
                
            </div>
            
            </div>
        </div>
    </header>
  )
}

export default Header
