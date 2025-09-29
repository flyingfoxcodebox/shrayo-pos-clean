import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  // Mock data for demo
  const stats = [
    { name: 'Today\'s Sales', value: '$2,847.50', change: '+12%', changeType: 'positive' },
    { name: 'Total Orders', value: '47', change: '+8%', changeType: 'positive' },
    { name: 'Average Order', value: '$60.59', change: '+3%', changeType: 'positive' },
    { name: 'Top Product', value: 'Premium Whiskey', change: '15 sold', changeType: 'neutral' },
  ]

  const recentTransactions = [
    { id: 'TXN-001', customer: 'Parth Patel', amount: '$89.99', time: '2 minutes ago' },
    { id: 'TXN-002', customer: 'Sarah Arvidson', amount: '$156.50', time: '15 minutes ago' },
    { id: 'TXN-003', customer: 'Raj Patel', amount: '$45.00', time: '1 hour ago' },
    { id: 'TXN-004', customer: 'Dipti Patel', amount: '$234.75', time: '2 hours ago' },
    { id: 'TXN-005', customer: 'Augustus Arvidson-Patel', amount: '$78.25', time: '3 hours ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your liquor store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-3 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-medium">$</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-1 sm:ml-2 flex items-baseline text-xs sm:text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-4 sm:py-5 sm:p-6">
          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/sales"
              className="relative group bg-white p-4 sm:p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-2 sm:p-3 bg-blue-50 text-blue-700 ring-2 sm:ring-4 ring-white">
                  <span className="text-xl sm:text-2xl">🛒</span>
                </span>
              </div>
              <div className="mt-4 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  New Sale
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                  Start a new transaction and process a customer order.
                </p>
              </div>
            </Link>

            <Link
              to="/customers"
              className="relative group bg-white p-4 sm:p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-2 sm:p-3 bg-green-50 text-green-700 ring-2 sm:ring-4 ring-white">
                  <span className="text-xl sm:text-2xl">👥</span>
                </span>
              </div>
              <div className="mt-4 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Manage Customers
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                  View and add new customers to your system.
                </p>
              </div>
            </Link>

            <Link
              to="/products"
              className="relative group bg-white p-4 sm:p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-2 sm:p-3 bg-purple-50 text-purple-700 ring-2 sm:ring-4 ring-white">
                  <span className="text-xl sm:text-2xl">🍷</span>
                </span>
              </div>
              <div className="mt-4 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  View Products
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                  Browse your liquor inventory and product catalog.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <li key={transaction.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {transaction.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          Transaction {transaction.id}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/sales-history"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
