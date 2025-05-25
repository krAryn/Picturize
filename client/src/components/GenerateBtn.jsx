import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const GenerateBtn = () => {

  const { motion, user, navigate, setShowLogin } = useAppContext()

  return (
    <motion.div className='pb-16 text-center'
      initial={{
        y: 100,
        opacity: 0.2
      }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.8 }
      }}
      viewport={{ once: true }}
    >
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try Now</h1>
      <button className='cursor-pointer inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 active:scale-100 transition' onClick={() => {
        if (user) {
          navigate("/result")
        } else {
          setShowLogin(true)
        }
      }}>Generate Image
        <img src={assets.star_group} className="h-6" alt="" />
      </button>
    </motion.div>
  )
}

export default GenerateBtn
