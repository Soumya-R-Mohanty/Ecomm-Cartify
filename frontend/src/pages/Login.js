import React, { useContext, useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false)
    const[data,setData]=useState({
        email:"",
        password:""
    })

    const navigate=useNavigate()
    const {fetchUserDetails,fetchUserAddTocart}=useContext(Context)


    const handleOnChange=(e)=>{
        const{name,value}=e.target

        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const dataResponse=await fetch(summaryApi.signIn.url,{
            method:summaryApi.signIn.method,
            credentials:"include",
            headers:{
                "content-type":'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataApi=await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddTocart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("data login",data);

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 py-5  w-full max-w-sm mx-auto ' >
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt="login Icons" />
                </div>

                <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label htmlFor="">Email:</label>
                        <div className='bg-slate-200 p-2'>
                        <input type="email" 
                        placeholder='Enter your Email'
                        name='email'
                        value={data.email}
                        onChange={handleOnChange} 
                        className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Password:</label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showPassword ?"text":"password"} 
                        placeholder='Enter your Password'
                        value={data.password}
                        name='password'
                        onChange={handleOnChange} 
                        className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ?(
                                        <FaEyeSlash />
                                    ):(
                                        <FaEye />
                                    )
                                }
                            </span>
                        </div>
                        </div>
                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                        Forgot Password ?
                        </Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-800 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
                </form>
                <p className='my-5'>Don't have an account ? <Link to={"/signup"} className=' hover:text-red-700 hover:underline'>Signup</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login