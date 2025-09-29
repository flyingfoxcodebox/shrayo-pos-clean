import React, { useState, useEffect } from 'react'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  createdAt: string
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  useEffect(() => {
    // Load customers from localStorage or use demo data
    const stored = localStorage.getItem('customers')
    if (stored) {
      setCustomers(JSON.parse(stored))
    } else {
      // Demo customers
      const demoCustomers: Customer[] = [
        {
          id: '1',
          firstName: 'Parth',
          lastName: 'Patel',
          email: 'parth@example.com',
          phone: '(555) 123-4567',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          firstName: 'Dipti',
          lastName: 'Patel',
          email: 'dipti@example.com',
          phone: '(555) 234-5678',
          address: '456 Oak Ave',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          firstName: 'Raj',
          lastName: 'Patel',
          email: 'raj@example.com',
          phone: '(555) 345-6789',
          address: '789 Pine St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          firstName: 'Sarah',
          lastName: 'Arvidson',
          email: 'sarah@example.com',
          phone: '(555) 456-7890',
          address: '321 Elm St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          firstName: 'Augustus',
          lastName: 'Arvidson-Patel',
          email: 'augustus@example.com',
          phone: '(555) 567-8901',
          address: '654 Maple Ave',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          createdAt: new Date().toISOString()
        }
      ]
      setCustomers(demoCustomers)
      localStorage.setItem('customers', JSON.stringify(demoCustomers))
    }
  }, [])

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCustomer.firstName && newCustomer.lastName) {
      const customer: Customer = {
        id: Date.now().toString(),
        ...newCustomer,
        createdAt: new Date().toISOString()
      }
      const updatedCustomers = [...customers, customer]
      setCustomers(updatedCustomers)
      localStorage.setItem('customers', JSON.stringify(updatedCustomers))
      setNewCustomer({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      })
      setShowAddForm(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer database and view customer information.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Customer
        </button>
      </div>

      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newCustomer.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newCustomer.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newCustomer.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={newCustomer.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      value={newCustomer.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={newCustomer.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Customers List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Customer Database ({customers.length} customers)
          </h3>
          
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
              <p className="text-gray-500 mb-4">Add your first customer to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {customers.map((customer) => (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {customer.firstName[0]}{customer.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {customer.firstName} {customer.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    {customer.phone && (
                      <p className="truncate">📞 {customer.phone}</p>
                    )}
                    {customer.address && (
                      <p className="truncate">📍 {customer.address}</p>
                    )}
                    {(customer.city || customer.state) && (
                      <p className="truncate">
                        {customer.city}{customer.city && customer.state && ', '}{customer.state} {customer.zipCode}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Added {new Date(customer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Customers
