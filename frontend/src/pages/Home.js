import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProdut from '../components/BannerProdut'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProdut />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"popular's watches"} />
      
      <VerticalCardProduct category={"mobiles"} heading={"popular's mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"Top's Mouses"} />
      <VerticalCardProduct category={"televisions"} heading={"Popuar TV"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & PhotoGraphy"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluethooth Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  )
}

export default Home