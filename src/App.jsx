"use client"

import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import { CartProvider } from "./context/CartContext"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate() 

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("sharekart-user")
    if (userLoggedIn) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard") 
    }
  }, [isLoggedIn, navigate]) 

  const handleLogin = () => {
    localStorage.setItem("sharekart-user", JSON.stringify({ id: 1, name: "User" }))
    setIsLoggedIn(true) 
  }

  const handleLogout = () => {
    localStorage.removeItem("sharekart-user")
    setIsLoggedIn(false)
    navigate("/login") 
  }

  return (
    <CartProvider>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        )}
      </Routes>
      <Toaster />
    </CartProvider>
  )
}

export default App




