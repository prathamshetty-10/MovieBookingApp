

import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from "./Pages/HomePage"
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signuppage'
import Login from './Pages/login'
import Denied from './Pages/Denied'
import RequireAuth from './components/RequireAuth'

import Profile from './Pages/User/Profile'




function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/signup" element ={<Signup/>}></Route>
      <Route path="/login" element ={<Login/>}></Route>
      <Route path="/denied" element ={<Denied/>}></Route>
      <Route element ={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
            <Route path="/user/profile" element ={<Profile/>}/>
      

      </Route>

      <Route path="*" element ={<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
