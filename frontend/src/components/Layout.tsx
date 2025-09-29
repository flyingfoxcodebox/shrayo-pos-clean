import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FoxLogo from './FoxLogo'

interface LayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', current: location.pathname === '/' },
    { name: 'Sales', href: '/sales', current: location.pathname === '/sales' },
    { name: 'Sales History', href: '/sales-history', current: location.pathname === '/sales-history' },
    { name: 'Customers', href: '/customers', current: location.pathname === '/customers' },
    { name: 'Products', href: '/products', current: location.pathname === '/products' },
    { name: 'Settings', href: '/settings', current: location.pathname === '/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FoxLogo className="h-8 w-8" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Shrayo POS</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Demo build. Integrations are not fully connected. © 2025 Flying Fox Solutions — 
            <a href="https://flyingfoxtoolbox.com" className="text-blue-600 hover:text-blue-500 ml-1">
              Learn more at https://flyingfoxtoolbox.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
