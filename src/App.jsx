import { Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Classification from './pages/Classification'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path="/classification" element={<Classification />} />
    </Routes>
  )
}

export default App
