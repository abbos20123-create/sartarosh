import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './home/HomePage'
import Recept from './home/Recept'
import AdminFace from './admin/AdminFace'
import BarberControl from './admin/BarberControl'
import ReceptsCon from './admin/ReceptsCon'
import AcceptedRecepts from './admin/AcceptedRecepts'
import Register from './home/Register'
import Login from './home/Login'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/recept' element={<Recept/>} />
      <Route path='register' element={<Register/>} />
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/admin/' element={<AdminFace/>} >
        <Route path='barbercontrol' element={<BarberControl/>} />
        <Route path='receptcontrol' element={<ReceptsCon/>} />
        <Route path='acceptedrecepts' element={<AcceptedRecepts/>} />
      </Route>
     </Routes>
    </>
  )
}

export default App