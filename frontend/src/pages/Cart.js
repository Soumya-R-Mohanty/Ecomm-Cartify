import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import displayInrCurrency from '../helpers/displayCurrency'
import {MdDelete} from "react-icons/md"
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const context=useContext(Context)
    const loadingcart=new Array(context.cartProductCount).fill(null)

    const fetchData=async()=>{
        const response=await fetch(summaryApi.addToCartViewProduct.url,{
            method:summaryApi.addToCartViewProduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            
        })
        

        const responseData=await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    const handleLoading=async()=>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty=async(id,qty)=>{
        const response=await fetch(summaryApi.updateCartProduct.url,{
            method:summaryApi.updateCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    _id:id,
                quantity: qty + 1
                }
            )
        }) 
        const responseData=await response.json()


        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty=async(id,qty)=>{
        if(qty>=2){
            const response=await fetch(summaryApi.updateCartProduct.url,{
                method:summaryApi.updateCartProduct.method,
                credentials:'include',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(
                    {
                        _id:id,
                        quantity: qty - 1
                    }
                )
            }) 
            const responseData=await response.json()
    
    
            if(responseData.success){
                fetchData()
               
            }

        }
    }

    const deleteCartProduct=async(id)=>{
        const response=await fetch(summaryApi.deleteCartProduct.url,{
            method:summaryApi.deleteCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    _id:id,
                }
            )
        }) 
        const responseData=await response.json()


        if(responseData.success){
            fetchData()
            context.fetchUserAddTocart()
        }
    }

    const handlePayment=async()=>{

        const stripePromise=await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

        const response=await fetch(summaryApi.payment.url,{
            method:summaryApi.payment.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    cartItems:data
                }
            )
        })
        const responseData=await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId:responseData.id})
        }

        console.log("payment response",responseData);
    }

    const totalQty=data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity,0)
    const totalPrice=data.reduce((prev,curr)=>prev+(curr?.quantity * curr?.productId?.selling),0)

  return (
    <div className='container mx-auto'>
        <div className='text-center  text-lg my-3'> 
        {
            data.length===0 && !loading && (
                <p className='bg-white py-5'>No Data</p>
            )
        }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingcart.map((el,index)=>{
                            return(
                                <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 mx-5 my-2 border border-slate-300 animate-pulse rounded'></div>

                            )
                        })
                    ):(
                        data.map((product,index)=>{
                            return(
                                <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 mx-5 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/* delete product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 '>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayInrCurrency(product?.productId?.selling)}</p>
                                            <p className='text-slate-600 font-semibod text-lg'>{displayInrCurrency(product?.productId?.selling * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className=' border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className=' border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    )
                }
            </div>

            {/* summary  */}
            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>total</div>
                        ):(
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity:</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price:</p>
                                    <p>{displayInrCurrency(totalPrice)}</p>
                                </div>
                                <button className='bg-blue-600 p-2 text-white w-full' onClick={handlePayment}>Payment</button>
                            </div>

                        )
                    }

                    </div>
                )
            }
                
        </div>
    </div>
  )
}

export default Cart