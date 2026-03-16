import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import AllEvents from './pages/AllEvents' // <-- Add this import

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Locations />} />
        
        {/* The new All Events route! */}
        <Route path="/events" element={<AllEvents />} /> 
        
        <Route path="/location/:id" element={<LocationEvents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App