import { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState("Login")
    const {showLogin, setShowLogin, axios, setUser} = useAppContext()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitHandler = async (e) => {
        setIsSubmitting(true)
        e.preventDefault()

        try {
            if (state === "Login") {

                // Check for email and password and if empty display a toaster ******************************************************
                const {data} = await axios.post("/api/user/login", {email, password})

                if (data.success) {
                    setUser(data.user)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post("/api/user/register", {name, email, password})

                if (data.success) {
                    setUser(data.user)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {

        if (!showLogin) return
        document.body.style.overflow = "hidden"
        setTimeout(() => {
            document.querySelector(".si-lg-frm").style.transform = "translateY(-10%)"
            document.querySelector(".si-lg-frm").style.opacity = "100%"
        }, 0)

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [showLogin])

    return showLogin && (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
            onClick = {() => setShowLogin(false)}>
            <form onSubmit={submitHandler} className='si-lg-frm relative bg-white p-10 rounded-xl text-slate-500 transition translate-y-10 opacity-0'
                onClick = {(e) => e.stopPropagation()}>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

                {
                    state === "Login" ? (
                        <p className='text-sm'>Welcome back! Please sign in to continue</p>
                    ) : (
                        <p className='text-sm'>Welcome to Picturize! Please sign up to continue</p>
                    )
                }

                {state === "Sign Up" && (
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 justify-between'>
                        <img src={assets.user_icon} className='h-[15px]' alt="" />
                        <input type="text" placeholder='Full Name' className='outline-none text-sm w-full' value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    </div>
                )}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 justify-between'>
                    <img src={assets.email_icon} alt="" />
                    <input type="text" placeholder='Email' className='outline-none text-sm w-full' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>

                <div className='border pl-6 pr-3 py-2 flex items-center gap-2 rounded-full mt-4 justify-between'>
                    <img src={assets.lock_icon} alt="" />
                    <input type={showPassword ? "text": "password"} placeholder='Password' className='outline-none text-sm w-full' value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                    <img src={showPassword ? assets.hide_password: assets.reveal_password} className={`${showPassword ? "h-[17px] relative top-[-1px]" :"h-[12px]"} cursor-pointer`} onClick={() => setShowPassword(prev => !prev)} alt="" />
                </div>

                {state === "Login" && (
                    <p className='text-sm text-primary my-4 cursor-pointer'>Forgot Password?</p>
                )}

                {
                    !isSubmitting
                        ? state === "Login" 
                            ? (
                                <button className='border px-6 py-2 w-full bg-primary hover:bg-primary-dull transition text-white cursor-pointer rounded-full'>Login</button>
                            ) : (
                                <button className='border px-6 py-2 w-full bg-primary hover:bg-primary-dull transition text-white cursor-pointer rounded-full mt-5'>Create Account</button>
                            )
                        : (
                            <button className='border border-gray-300 px-6 py-2 w-full bg-gray-300 transition text-gray-600 rounded-full' disabled>Please Wait</button>
                        )
                
                
                
                }
                {
                    state === "Login" ? (
                        <p className='mt-4 text-center'>Don't have an account? <span className='text-primary cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                    ) : (
                        <p className='mt-4 text-center'>Already have an account? <span className='text-primary cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
                    )
                }


                <img src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" onClick={() => setShowLogin(false)} />
            </form>
        </div>
    )
}

export default Login
