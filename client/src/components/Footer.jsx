import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <div className='flex gap-4 items-center'>
        <img src={assets.logo} className='w-30' alt="" />
        <div className='w-[1.5px] h-[20px] bg-gray-500 relative bottom-0.5 max-sm:hidden'></div>
        <p className='text-sm text-gray-500 max-sm:hidden relative bottom-0.5'>Copyright @Picturize.dev | All rights reserved.</p>
        </div>
        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} width={35} alt="" />
            <img src={assets.twitter_icon} width={35} alt="" />
            <img src={assets.instagram_icon} width={35} alt="" />
        </div>
    </div>
  )
}

export default Footer
