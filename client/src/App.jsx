import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashbord'
import SignIn from './pages/Signin'
import SignUP from './pages/SignUp'
import Header from './components/Header'
import FooterCom from './components/FooterCom'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (

    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/about'element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard'element={<Dashboard/>}/>
        </Route>
        <Route path='/signin'element={<SignIn/>}/>
        <Route path='/signup'element={<SignUP/>}/>
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}
