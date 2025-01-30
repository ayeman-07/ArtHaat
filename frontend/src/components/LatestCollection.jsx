import React, { useEffect } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';
const LatestCollection = () => {

    // Getting products from ShopContext as it is a global state saved in ShopContext
    const  {products} = useContext(ShopContext);

    // Using useState to set the latest 10 products
    const [latestProducts, setLatestProducts]=useState([]);

    // Using useEffect to set the latest 10 products when the component mounts by using slice method to get the first 10 products
    useEffect(() => {
      setLatestProducts(products.slice(0,10))
    },[products])
    
  return (
    <div className='my-10'>

      {/* Displaying the heading Latest Collections and using a different component for the title as it will be used at many other places */}
      <div className="text-center py-8 text-3xl">

        <Title text1 = {'LATEST'} text2 = {'COLLECTIONS'}/>
        <p className="w-3/4 m-auto text-xs sm:text-base text-gray-600 ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium quisquam quas accusamus.
        </p>
      </div>

      {/* Displaying the  latest 10 products */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key = {index} id = {item._id} image = {item.image} name = {item.name} price = {item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
