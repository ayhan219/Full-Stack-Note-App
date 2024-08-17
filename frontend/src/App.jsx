import { BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import React, { useState } from 'react'
import LoginNavbar from "./components/LoginNavbar/LoginNavbar"


function App() {
  
  
  
  const [active,setActive] = useState("/")
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Burada giriş yapma işlemi yapılır, başarılıysa
    setIsAuthenticated(true);
    setActive("/home")
  };

  const handleLogout = () => {
    // Burada çıkış yapma işlemi yapılır, başarılıysa
    setIsAuthenticated(false);
    setActive("/home")
  };
  

  

  return (
    <Router>
      
      {isAuthenticated?<LoginNavbar active={active} setActive={setActive} handleLogout={handleLogout}  />:<Navbar active={active} setActive={setActive}  />}
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register handleLogout={handleLogout} />} />
      </Routes>
    </Router>
      
  )
}

export default App