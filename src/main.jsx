import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Availability from './pages/Availability'
import Booking from './pages/Booking'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/availability" element={<Availability />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  </BrowserRouter>
)