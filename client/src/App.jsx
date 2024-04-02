import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashbord from './pages/Dashbord'
import Signin from './pages/Signin'
import SignUP from './pages/SignUp'

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/dashbord'element={<Dashbord/>}/>
        <Route path='/signin'element={<Signin/>}/>
        <Route path='/signup'element={<SignUP/>}/>
      </Routes>
    </BrowserRouter>
  )
}
