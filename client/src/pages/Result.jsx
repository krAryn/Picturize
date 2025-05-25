import { useState } from 'react'
import { assets } from '../assets/assets'
import {BarLoader} from 'react-spinners'
import { useAppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()
  const {motion, generateImage} = useAppContext()

  const submitHandler = async (e) => {
    e.preventDefault()
    
    if (input) {
      setLoading(true)
      const image = await generateImage(input)
      if(image) {
        setImage(image)
      }
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col min-h-[90vh] items-center justify-center'>
      <motion.div
      initial={{
        y: 100,
        opacity: 0
      }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: {duration: 0.8}
      }}
      viewport={{once: true}}
      >
        <div className='relative max-sm:w-[250px]'>
          {/* this group will be enabled after image has loaded */}
          {
            !loading && (
              <div className='absolute top-[-10px] right-[10px] h-[20px] text-4xl text-white cursor-pointer group'>
                <p className='relative w-[25px]'>...</p>
                {/* download button */}
                <a href={image} download className='text-sm top-12 absolute right-0 bg-white text-black h-0 overflow-hidden px-4 group-hover:py-2 group-hover:h-[40px] rounded-md shadow-md cursor-pointer transition-[all]'>Download</a>
              </div>
            )
          }
          <img src={image} alt="" className='max-w-sm max-sm:w-[250px] rounded' />
          {loading && <BarLoader width={"100%"} color="#2a74ff" />}
        </div>
      </motion.div>
      <motion.div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'
      initial={{
        y: 50,
        opacity: 0
      }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: {duration: 0.8, delay: 0.4}
      }}
      >
        <input type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 font-[300]' onChange={(e) => setInput(e.currentTarget.value)} value={input} />

        {
          !loading ? (
            <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer'>Generate</button> 
          ) : (
            <button className='bg-zinc-900/60 text-white/60 px-10 sm:px-16 py-3 rounded-full' disabled>Generating</button> 
          )
        }
      </motion.div>
    </form>
  )
}

export default Result
