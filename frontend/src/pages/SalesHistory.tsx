import React, { useState, useEffect } from 'react'

interface Transaction {
  id: string
  customer: string
  items: Array<{
    product: {
      id: string
      name: string
      sku: string
      price: number
      category: string
    }
    quantity: number
  }>
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: string
  timestamp: string
}

const SalesHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Load transactions from localStorage
    const stored = localStorage.getItem('transactions')
    if (stored) {
      setTransactions(JSON.parse(stored))
    }
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getTotalSales = () => {
    return transactions.reduce((sum, txn) => sum + txn.total, 0)
  }

  const getTotalTransactions = () => {
    return transactions.length
  }

  const getAverageOrder = () => {
    return transactions.length > 0 ? getTotalSales() / transactions.length : 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View all completed transactions and sales data.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">$</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd className="text-2xl font-semibold text-gray-900">${getTotalSales().toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">#</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{getTotalTransactions()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Ø</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Order</dt>
                  <dd className="text-2xl font-semibold text-gray-900">${getAverageOrder().toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Transaction History</h3>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-4">Start making sales to see transaction history here.</p>
              <a
                href="/sales"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start New Sale
              </a>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
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
                              {transaction.id} • {transaction.items.length} items
                            </p>
                            <div className="mt-1">
                              <div className="flex flex-wrap gap-1">
                                {transaction.items.slice(0, 3).map((item, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {item.product.name} (×{item.quantity})
                                  </span>
                                ))}
                                {transaction.items.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    +{transaction.items.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${transaction.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.timestamp)}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {transaction.paymentMethod}
                        </p>
                        {transaction.discount > 0 && (
                          <p className="text-xs text-green-600">
                            -${transaction.discount.toFixed(2)} discount
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesHistory
