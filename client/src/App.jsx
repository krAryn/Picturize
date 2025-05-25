import React from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-linear-to-b from-teal-50 to-orange-50">
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Login />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
