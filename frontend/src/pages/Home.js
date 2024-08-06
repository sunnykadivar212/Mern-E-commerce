import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <HorizontalCardProduct category={"speakers"} heading={"Speakers"}/>


      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"processor"} heading={"Processor"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
    </div>
  )
}

export default Home;