import {useState, useEffect, useContext, createContext} from 'react'
import { useNavigate } from 'react-router'
import { motion } from "motion/react"
import axios from "axios"
import { toast } from 'react-toastify'

const AppContext = createContext()

const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [credit, setCredit] = useState()

    const navigate = useNavigate()

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const fetchUser = async () => {
      const {data} = await axios.get("/api/user/is-auth")

      if (data.success) {
        setUser(data.user)
      }
    }

    const loadCreditsData = async () => {
      try {
        const {data} = await axios.get("/api/user/credits")

        if (data.success) {
          setCredit(data.credits)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const generateImage = async (prompt) => {
      try {
          const {data} = await axios.post("/api/image/generate", {prompt})

          if (data.success) {
            loadCreditsData()
            return data.resultImage
          } else {
            toast.error(data.message)
            loadCreditsData()
            if (data.creditBalance === 0) {
              navigate("/buy-credit")
            }
          }
      } catch (error) {
          toast.error(error.message)
      }
    }

    useEffect(() => {
      fetchUser()
      loadCreditsData()
    }, [])

  return (
    <AppContext.Provider value={{
        user, setUser, navigate, showLogin, setShowLogin, motion, axios, credit, setCredit, loadCreditsData, generateImage
    }} >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
