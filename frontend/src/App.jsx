import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Navbar from "./components/Navbar"

import { Toaster } from "react-hot-toast";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./components/Register"
import Login from "./components/Login"
import OrderCnf from "./components/OrderCnf"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-confirmed" element={<OrderCnf />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
