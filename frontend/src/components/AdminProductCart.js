import React, { useState } from 'react'
import {MdModeEditOutline} from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayInrCurrency from '../helpers/displayCurrency'

const AdminProductCart = ({
    data,
    fetchdata
}) => {
    const[editProduct,setEditProduct]=useState(false)
  return (
    <div className='bg-white p-4 rounded '>
        <div className='w-40 '>
            <div className='w-32 h-32 flex justify-center items-center'> 
            <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>


            <div>

                <div>
                    <p className='font-semibold'>
                    {
                        displayInrCurrency(data.selling)
                    }
                    </p>
                    
                </div>
            <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                <MdModeEditOutline />
            </div>
            </div>

           
        </div>
        {
            editProduct &&(
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>            
            )
        }

       
    </div>
  )
}

export default AdminProductCart