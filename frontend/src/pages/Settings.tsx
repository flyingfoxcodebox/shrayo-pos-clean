import React, { useState } from 'react'

interface Integration {
  id: string
  name: string
  description: string
  enabled: boolean
  status: 'connected' | 'disconnected' | 'demo'
}

const Settings: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'square',
      name: 'Square',
      description: 'Payment processing and point of sale integration',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Accounting and financial management',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Customer relationship management',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'slicktext',
      name: 'SlickText',
      description: 'SMS marketing and customer communication',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and automation',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Online payment processing',
      enabled: false,
      status: 'demo'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'E-commerce platform integration',
      enabled: false,
      status: 'demo'
    }
  ])

  const [businessInfo, setBusinessInfo] = useState({
    name: 'Shrayo Liquor Store',
    address: '123 Main Street',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    phone: '(555) 123-4567',
    email: 'info@shrayoliquor.com',
    taxId: '12-3456789'
  })

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ))
  }

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessInfo({
      ...businessInfo,
      [e.target.name]: e.target.value
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-red-100 text-red-800'
      case 'demo': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected'
      case 'disconnected': return 'Disconnected'
      case 'demo': return 'Demo Mode'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your business profile and integration settings.
        </p>
      </div>

      {/* Business Profile */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Business Profile</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  name="name"
                  value={businessInfo.name}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={businessInfo.phone}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={businessInfo.address}
                onChange={handleBusinessInfoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={businessInfo.city}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={businessInfo.state}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={businessInfo.zipCode}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={businessInfo.email}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={businessInfo.taxId}
                  onChange={handleBusinessInfoChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Integrations</h3>
          <p className="text-sm text-gray-500 mb-6">
            Connect third-party services to enhance your POS system. All integrations are currently in demo mode.
          </p>
          
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {getStatusText(integration.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleIntegration(integration.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        integration.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          integration.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                {integration.enabled && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Demo integration enabled. In a production environment, you would:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Configure API credentials</li>
                        <li>Set up webhook endpoints</li>
                        <li>Test connection and sync data</li>
                        <li>Enable real-time synchronization</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Application Version</dt>
              <dd className="mt-1 text-sm text-gray-900">1.0.0</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Build Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date().toLocaleDateString()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Environment</dt>
              <dd className="mt-1 text-sm text-gray-900">Demo</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Database</dt>
              <dd className="mt-1 text-sm text-gray-900">Local Storage</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
