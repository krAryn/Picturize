import { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router'
import { useAppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'

const Navbar = () => {

    const {user, navigate, setShowLogin, motion, axios, setUser, credit, loadCreditsData} = useAppContext()


    const logoutHandler = async () => {
        try {
            const {data} = await axios.get("/api/user/logout")

            if (data.success) {
                toast.success("Logged Out Successfully")
                setUser(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        loadCreditsData()
    }, [user])

    return (
        <motion.div className = "flex items-center justify-between py-4"
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1,
            transition: {duration: 1.2, delay: 0.4}
        }}
        >
            <Link to="/">
                <img src={assets.logo} alt="logo" className='w-28 sm:w-32 lg:w-40' />
            </Link>

            <div>
                {user ? (
                    <div className='flex items-center gap-2 sm: gap-3'>
                        <button className='cursor-pointer flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all' onClick={() => navigate('/buy-credit')}>
                            <img className='w-5 ' src={assets.credit_star} alt="" />
                            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
                        </button>
                        <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {String(user.name).split(" ")[0]}</p>
                        <div className="relative group cursor-pointer">
                            <img src={assets.profile_icon} alt="user" className='w-10 h-10 rounded-full drop-shadow' />
                            <div className="absolute hidden group-hover:block top-10 right-0">
                                <p className='cursor-pointer relative bottom-0.5 text-sm bg-white rounded top-2 px-4 py-2 shadow border border-gray-300' onClick={logoutHandler}>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className = "flex items-center gap-2 sm:gap-5">
                        <p className="cursor-pointer" onClick={() => navigate('/buy-credit')}>Pricing</p>
                        <button className = "cursor-pointer bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full" onClick = {() => setShowLogin(true)}>Login</button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Navbar
