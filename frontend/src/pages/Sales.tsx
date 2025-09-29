import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  category: string
  inventory: number
}

interface CartItem {
  product: Product
  quantity: number
}

const Sales: React.FC = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string>('')
  const [discount, setDiscount] = useState<number>(0)
  const [tax, setTax] = useState<number>(8.5) // 8.5% tax rate
  const [paymentMethod, setPaymentMethod] = useState<string>('cash')

  // Mock products data
  const products: Product[] = [
    { id: '1', name: 'Premium Whiskey', sku: 'WH-001', price: 89.99, category: 'Whiskey', inventory: 25 },
    { id: '2', name: 'Vodka Premium', sku: 'VD-002', price: 45.50, category: 'Vodka', inventory: 30 },
    { id: '3', name: 'Craft Beer 6-Pack', sku: 'BE-003', price: 24.99, category: 'Beer', inventory: 50 },
    { id: '4', name: 'Red Wine Cabernet', sku: 'WN-004', price: 32.75, category: 'Wine', inventory: 20 },
    { id: '5', name: 'Gin London Dry', sku: 'GN-005', price: 38.99, category: 'Gin', inventory: 15 },
    { id: '6', name: 'Tequila Silver', sku: 'TQ-006', price: 52.25, category: 'Tequila', inventory: 12 },
    { id: '7', name: 'Rum Spiced', sku: 'RM-007', price: 41.80, category: 'Rum', inventory: 18 },
    { id: '8', name: 'Champagne Brut', sku: 'CH-008', price: 125.00, category: 'Champagne', inventory: 8 },
  ]

  const customers = [
    { id: '1', name: 'Parth Patel' },
    { id: '2', name: 'Dipti Patel' },
    { id: '3', name: 'Raj Patel' },
    { id: '4', name: 'Sarah Arvidson' },
    { id: '5', name: 'Augustus Arvidson-Patel' },
  ]

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.product.id !== productId))
    } else {
      setCart(cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId))
  }

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  }

  const getTaxAmount = () => {
    return (getSubtotal() - discount) * (tax / 100)
  }

  const getTotal = () => {
    return getSubtotal() - discount + getTaxAmount()
  }

  const processSale = () => {
    if (cart.length === 0) return

    // In a real app, this would send to backend
    const transaction = {
      id: `TXN-${Date.now()}`,
      customer: selectedCustomer || 'Walk-in Customer',
      items: cart,
      subtotal: getSubtotal(),
      discount,
      tax: getTaxAmount(),
      total: getTotal(),
      paymentMethod,
      timestamp: new Date().toISOString()
    }

    // Store in localStorage for demo
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    existingTransactions.push(transaction)
    localStorage.setItem('transactions', JSON.stringify(existingTransactions))

    // Reset form and redirect
    setCart([])
    setSelectedCustomer('')
    setDiscount(0)
    navigate('/sales-history')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales & Checkout</h1>
        <p className="mt-1 text-sm text-gray-500">
          Process customer transactions and manage sales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.sku} • {product.category}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Stock: {product.inventory}</p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.inventory === 0}
                        className="ml-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-6">
          {/* Customer Selection */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Customer</h3>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Walk-in Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">No items in cart</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-xs text-gray-500">${item.product.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-2 text-red-600 hover:text-red-800 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          {cart.length > 0 && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Credit Card</option>
                      <option value="check">Check</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax ({tax}%):</span>
                    <span className="font-medium">${getTaxAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={processSale}
                  className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Process Sale
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sales
