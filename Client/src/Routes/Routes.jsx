import React from 'react'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import { LandingPage } from '../Page';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/l' element={LandingPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
