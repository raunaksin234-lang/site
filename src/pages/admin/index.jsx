import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    const savedAdmin = localStorage.getItem('admin')
    
    if (savedToken && savedAdmin) {
      setToken(savedToken)
      setAdmin(JSON.parse(savedAdmin))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLoginSuccess = (adminData, tokenData) => {
    setAdmin(adminData)
    setToken(tokenData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setIsLoggedIn(false)
    setAdmin(null)
    setToken(null)
  }

  return isLoggedIn && admin && token ? (
    <AdminDashboard admin={admin} token={token} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  )
}
