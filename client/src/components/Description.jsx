import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


const Description = () => {

  const {motion} = useAppContext()

  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{
      y: 100,
      opacity: 0.2
    }}
    whileInView={{
      y: 0,
      opacity: 1,
      transition: {duration: 0.8}
    }}
    viewport={{once: true}}
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Generate Images using AI</h1>
      <p className='text-gray-500 mb-8'>Turn your Imagination into Images</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} className='max-w-80 xl:w-96 rounded-lg' alt="" />
        <div className='min-w-[300px]'>
            <h2 className='text-3xl font-medium max-w-lg mb-4 max-md:text-center'>Introducing AI powered Words to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Bring your imagination to life—one word at a time. Our AI-powered application turns your text into eye-catching, detailed images instantly.</p>
            <p className='text-gray-600 mb-4'>From wild fantasies to pixel-perfect details—if you can say it, you can see it. Start creating your visual universe today. </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
