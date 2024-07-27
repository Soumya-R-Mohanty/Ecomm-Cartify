import React, { useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[data,setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        profilePic:"",
    })

    const navigate=useNavigate()

    const handleOnChange=(e)=>{
        const{name,value}=e.target


        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })

    }

    const handleUploadPic=async(e)=>{
        const file=e.target.files[0]

        const imagePic=await imageTobase64(file)
        console.log("imagePic",imagePic);
        setData((prev)=>{
            return{
                ...prev,
                profilePic:imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (data.password === data.confirmPassword) {
            try {
                const dataResponse = await fetch(summaryApi.signUp.url, {
                    method: summaryApi.signUp.method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
    
                const dataApi = await dataResponse.json();
    
                if (dataApi.success) {
                    toast.success(dataApi.message);
                    navigate("/login")
                } if(dataApi.error){
                    toast.error(dataApi.message);
                } 
            } catch (error) {
                toast.error("Failed to submit the form. Please try again.");
            }
        } else {
            toast.error("Password and confirm password do not match");
        }
    };
    
    console.log("data login",data);

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 py-5  w-full max-w-sm mx-auto ' >
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt="login Icons" />
                    </div>
                   <form >
                    <label>
                    <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer py-4 text-center absolute bottom-0 w-full'>
                        Upload Photo
                    </div>
                    <input type="file" className='hidden' onChange={handleUploadPic} />
                    </label>
                   </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <label htmlFor="">Name:</label>
                        <div className='bg-slate-200 p-2'>
                        <input type="text" 
                        placeholder='Enter Your Name'
                        name='name'
                        value={data.name}
                        onChange={handleOnChange} 
                        className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

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
                        placeholder='Enter Password'
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
                        
                    </div>

                    <div>
                        <label htmlFor="">Confirm Password:</label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showConfirmPassword ?"text":"password"} 
                        placeholder='Enter Confirm Password'
                        value={data.confirmPassword}
                        name='confirmPassword'
                        onChange={handleOnChange} 
                        className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>

                            
                            <span>
                                {
                                    showConfirmPassword ?(
                                        <FaEyeSlash />
                                    ):(
                                        <FaEye />
                                    )
                                }
                            </span>
                        </div>
                        </div>
                        
                    </div>

                    <button className='bg-red-600 hover:bg-red-800 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Signup</button>
                </form>
                <p className='my-5'>Already have an account ? <Link to={"/login"} className=' hover:text-red-700 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Signup