

import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from "./Pages/HomePage.jsx"
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/SignupPage.jsx'
import Login from './Pages/Login'
import Denied from './Pages/Denied'
import Location from './Pages/Location'
import RequireAuth from './components/RequireAuth'
import LocationTheatre from './Pages/LocationTheatre.jsx'
import TheatreMovies from './Pages/TheatreMovies.jsx'
import AddMovies from './Pages/AddMovies.jsx'
import Profile from './Pages/User/Profile'
import MovieDesc from './Pages/MovieDesc.jsx'
import Timings from './Pages/Timings.jsx'
import AddShows from './Pages/AddShows.jsx'
import Booking from './Pages/Booking.jsx'
import AddSeat from './Pages/AddSeat.jsx'
import MyBookings from './Pages/MyBookings.jsx'
import AdminDash from './Pages/AdminDash.jsx'
import About from './Pages/About.jsx'
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

      <Route path='/movies' element={<Location/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/location/theatre' element={<LocationTheatre/>}></Route>
      <Route path='/location/theatre/movies' element={<TheatreMovies/>}></Route>
      <Route path='/movie/add' element={<AddMovies/>}></Route>
      <Route path='/show/add' element={<AddShows/>}></Route>
      <Route path='/movie/desc' element={<MovieDesc/>}></Route>
      <Route path='/timings' element={<Timings/>}></Route>
      <Route path='/book/ticket' element={<Booking/>}></Route>
      <Route path='/seat/add' element={<AddSeat/>}></Route>
      <Route path='/my/bookings' element={<MyBookings/>}></Route>
      <Route path='/admin/dashboard' element={<AdminDash/>}></Route>
      <Route path="*" element ={<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
