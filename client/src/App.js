import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {Landing,Register,Error,ProtectedRoute} from './pages'
import {Profile,AllClients,SharedLayout,Stats,AddClient} from './pages/dashboard'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path='/'
       element={
       <ProtectedRoute>
        <SharedLayout />
       </ProtectedRoute>
       } >


       <Route index element={<Stats />}  />
       <Route path='all-clients'  element={<AllClients/>}   />
       <Route  path='add-client'   element={<AddClient/>} />
       <Route path='profile' element={<Profile/>}  />

      </Route>
      <Route path='/register' element={<Register/>}   />
      <Route path='/landing' element={<Landing/>}   />
      <Route path='*' element={<Error/> }   />
     
    </Routes>
   
    </BrowserRouter>
  )
}

export default App