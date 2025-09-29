import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import SalesHistory from './pages/SalesHistory'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Layout onLogout={() => setIsAuthenticated(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales-history" element={<SalesHistory />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
