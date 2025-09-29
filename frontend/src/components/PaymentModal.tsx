import React, { useState, useEffect } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (transactionId: string) => void
  amount: number
  customer: string
  items: Array<{
    product: {
      name: string
      price: number
    }
    quantity: number
  }>
}

type PaymentStep = 'card-input' | 'processing' | 'success' | 'declined'

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  customer,
  items: _items
}) => {
  const [step, setStep] = useState<PaymentStep>('card-input')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [simulateDecline, setSimulateDecline] = useState(false)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    if (isOpen) {
      setStep('card-input')
      setCardNumber('')
      setExpiryDate('')
      setCvv('')
      setCardholderName('')
      setSimulateDecline(false)
    }
  }, [isOpen])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '')
    if (value.length <= 4) {
      setCvv(value)
    }
  }

  const processPayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      return
    }

    setStep('processing')
    setTransactionId(`TXN-${Date.now()}`)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, simulateDecline ? 3000 : 2000))

    if (simulateDecline) {
      setStep('declined')
    } else {
      setStep('success')
      setTimeout(() => {
        onSuccess(transactionId)
        onClose()
      }, 3000)
    }
  }

  const resetAndClose = () => {
    setStep('card-input')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {step === 'card-input' && 'Payment Details'}
              {step === 'processing' && 'Processing Payment...'}
              {step === 'success' && 'Payment Successful'}
              {step === 'declined' && 'Payment Declined'}
            </h3>
            {step === 'card-input' && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {step === 'card-input' && (
            <div className="space-y-4">
              {/* Demo Toggle */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="simulate-decline"
                    checked={simulateDecline}
                    onChange={(e) => setSimulateDecline(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="simulate-decline" className="ml-2 text-sm text-yellow-800">
                    Simulate payment decline (demo only)
                  </label>
                </div>
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                  maxLength={19}
                />
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-gray-50 rounded-md p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount to charge:</span>
                  <span className="font-semibold text-lg">${amount.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Customer: {customer || 'Walk-in Customer'}
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h4>
              <p className="text-gray-600">Please wait while we process your payment...</p>
              <div className="mt-4 space-y-1">
                <div className="text-sm text-gray-500">• Verifying card details</div>
                <div className="text-sm text-gray-500">• Contacting payment processor</div>
                <div className="text-sm text-gray-500">• Authorizing transaction</div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h4>
              <p className="text-gray-600 mb-4">Transaction ID: {transactionId}</p>
              <div className="bg-green-50 rounded-md p-3 mb-4">
                <div className="text-sm text-green-800">
                  <div className="font-medium">Amount: ${amount.toFixed(2)}</div>
                  <div>Card ending in: ****{cardNumber.slice(-4)}</div>
                  <div>Time: {new Date().toLocaleString()}</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
                  Print Receipt
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-200">
                  Send Receipt
                </button>
              </div>
            </div>
          )}

          {step === 'declined' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Payment Declined</h4>
              <p className="text-gray-600 mb-4">Your payment could not be processed.</p>
              <div className="bg-red-50 rounded-md p-3 mb-4">
                <div className="text-sm text-red-800">
                  <div>Error: Insufficient funds</div>
                  <div>Transaction ID: {transactionId}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'card-input' && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={!cardNumber || !expiryDate || !cvv || !cardholderName}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Process Payment
              </button>
            </div>
          </div>
        )}

        {step === 'declined' && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={resetAndClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
