import React from 'react'
import { stepsData } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Steps = () => {

    const {motion} = useAppContext()

    return (
        <motion.div className='my-32 flex flex-col items-center justify-center'
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
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works</h1>
            <p className='text-lg text-gray-600 mb-8'>Transform Words into Vivid Visuals</p>
            <div className='space-y-4 w-full max-w-3xl text-sm'>
                {stepsData.map((step, index) => (
                    <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white shadow-md border border-gray-300 rounded-lg cursor-pointer hover:scale-[1.02] transition'>
                        <img width={40} src={step.icon} alt="" />
                        <div>
                            <h2 className='text-xl font-medium'>{step.title}</h2>
                            <p className='text-gray-500'>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Steps
