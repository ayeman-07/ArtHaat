import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 dark:bg-gray-800'>
      {/* Hero left Side */}
      <div className="w-full  sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
      <div className="text-[#414141]">
        <div className="flex items-center gap-2">
            <p className='w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-white'></p>
            <p className='font-medium text-sm md:text-base dark:text-white'>OUR BESTSELLERS</p>
        </div>

        <h1  className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed dark:text-white'>Latest Arrivals</h1> 

        <div className="flex items-center gap-2">
            <p className='font-semibold text-sm md:text-base dark:text-white'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#282727]'></p>
        </div>
      </div>
      </div>

      {/* Hero right side */}

      
      <div className="w-full sm:w-1/2 h-[500px]">
      <img className='w-full h-[500px] object-fit' src={assets.arthaat_hero} alt="" />
      </div>
    </div>
  )
}

export default Hero
