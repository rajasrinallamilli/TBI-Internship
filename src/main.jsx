import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import About from './pages/About'
import Availability from './pages/Availability'
import Booking from './pages/Booking'
import ComponentDemo from './pages/ComponentDemo'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <Toaster position="top-right" />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/availability" element={<Availability />} />
      <Route path="/booking" element={<Booking />} />

      <Route
        path="/components"
        element={<ComponentDemo />}
      />

    </Routes>

  </BrowserRouter>
)