import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common/index.js';
import Context from './context/index.js';
import { useDispatch } from 'react-redux';
import { setUserdetails } from './store/userSlice.js';
function App() {
  const dispatch=useDispatch()
  const[cartProductCount,setCartProductCount]=useState(0)

  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.current_user.url,{
      method:summaryApi.current_user.method,
      credentials:"include"
    })

    const dataApi=await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserdetails(dataApi.data))
    }
  }

  const fetchUserAddTocart=async()=>{
    const dataResponse=await fetch(summaryApi.addToCartProductCount.url,{
      method:summaryApi.addToCartProductCount.method,
      credentials:"include"
    })

    const dataApi=await dataResponse.json()


   setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    // user details
    fetchUserDetails()

    // user Details cart Product
    fetchUserAddTocart()
  })
  return (
    <>
    <Context.Provider value={{
      fetchUserDetails,  //user details fetch
      cartProductCount, //current User add to cart product count
      fetchUserAddTocart

    }}>
    <ToastContainer position='top-center' />
    <Header />
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet />
    </main>
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
