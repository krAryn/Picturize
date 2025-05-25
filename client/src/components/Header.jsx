import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { delay } from 'motion/react'

const Header = () => {

    const { user, navigate, motion, setShowLogin } = useAppContext()

    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-20'
        initial={{
            opacity:0.2, 
            y:100
        }}
        whileInView={{
            opacity:1, 
            y:0, 
            transition: {duration: 0.8}
        }}
        viewport={{once: true}}
        >
            <motion.div className='text-stone-500 h-fit inline-flex items-center text-center gap-2 bg-white px-10 py-1 rounded-full border border-neutral-500'
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1,
                transition: {duration: 0.8, delay: 0.2}
            }}
            >
                <p className='text-nowrap hidden sm:block'>Transform words into Vivid Visuals</p>
                <p className='text-nowrap sm:hidden'>Words to Vivid Visuals</p>
                <img className='h-[15px]' src={assets.star_icon} alt="" />
            </motion.div>
            <motion.h1 className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center'
            initial={{
                opacity:0,
                y: 10
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.8, delay: 0.4}
            }}
            >Welcome to <span className='text-primary font-bold'>Picturize</span></motion.h1>

            <motion.p className='text-center max-w-xl mx-auto mt-5'
            initial={{
                opacity: 0,
                y: 10
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.8, delay: 0.6}
            }}
            >Unleash your imagination. Type anything, and watch AI bring it to life—turning thoughts, stories, and dreams into stunning images.</motion.p>

            <motion.button className='cursor-pointer sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 active:scale-100 transition'
            onClick = {() => {
                if (user) {
                    navigate("/result")
                } else {
                    setShowLogin(true)
                }
            }}
            initial={{
                opacity: 0,
                y: 10
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.8, delay: 0.8}
            }}
            >
                Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </motion.button>

            <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
            initial={{
                opacity: 0,
                y: 10
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.8, delay: 1}
            }}
            >
                {Array(6).fill("").map((item, index) => (
                    <div key={index}>
                        <img className='rounded hover:scale-105 transition-all cursor-pointer max-sm:w-10' src={index % 2 === 0? assets.sample_img_1: assets.sample_img_2} key={index} width={70} alt="" />
                    </div>
                ))}
            </motion.div>

            <motion.p className='mt-2'>Imaegs Generated from Picturize</motion.p>
        </motion.div>
    )
}

export default Header
