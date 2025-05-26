import React from 'react'
import { assets, plans } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const BuyCredit = () => {

  const {user, motion, setShowLogin, axios, navigate} = useAppContext()

  const handleSubmit = async (item) => {

    try {
      if (!user) {
        setShowLogin(true)
      } else {
        // send req to backend for purchase
        const {data} = await axios.post("/api/user/init-pay", {
          planName: item.id,
          desc: item.desc,
          amount: item.price,
          credits: item.credits
        })
        // get checkout url and navigate
        window.open(data.url, "_self")
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
    initial={{opacity: 0.2, y: 100}}
    whileInView={{opacity: 1, y: 0, transition: {duration: 0.8}}}
    viewport={{once: true}}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose what suits you best and get going</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index}
          className='bg-white shadow border border-gray-300 rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 max-w-[310px]'>
            <img src={assets.logo_icon} className='h-[30px]' alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6 '><span className='text-3xl font-medium'>₹{item.price}</span> / {item.credits} credits</p>
            <button onClick={() => handleSubmit(item)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer'>{user ? "Purchase":"Get Started"}</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
