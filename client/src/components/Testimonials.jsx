import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Testimonials = () => {

    const {motion} = useAppContext()

    return (
        <motion.div className='flex flex-col items-center justify-center my-20 py-12'
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
            <h1 className='text-3xl sm:text-4xl font-semibold mb-1'>"In Their Own Words" </h1>
            <p className='text-gray-500 mb-12'>What our Users have to say</p>

            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((test, index) => (
                    <div key={index}
                        className='bg-white p-12 rounded-lg shadow-md border border-gray-300 w-80 m-auto cursor-pointer hover:scale-[1.02] transition'>
                        <div className='flex flex-col items-center'>
                            <img src={test.image} className='rounded-full w-14' alt="" />
                            <h2 className='text-xl font-semibold mt-3'>{test.name}</h2>
                            <p className='text-gray-500 mb-4'>{test.role}</p>
                            <div className='flex mb-4'>
                                {Array(test.stars).fill().map((item, index) => (
                                    <img key={index} src={assets.rating_star} alt="" />
                                ))}
                            </div>
                            <p className='text-center text-sm text-gray-600'>{test.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonials
