import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Integration routes
app.get('/api/integrations', (req, res) => {
  const { getAllIntegrations } = require('./lib/integrations')
  res.json(getAllIntegrations())
})

app.post('/api/integrations/:id/toggle', (req, res) => {
  const { id } = req.params
  const { enabled } = req.body
  const { toggleIntegration } = require('./lib/integrations')
  
  toggleIntegration(id, enabled)
  res.json({ success: true, enabled })
})

// Mock API endpoints for demo
app.get('/api/products', (req, res) => {
  // Return mock products
  res.json([])
})

app.get('/api/customers', (req, res) => {
  // Return mock customers
  res.json([])
})

app.post('/api/sales', (req, res) => {
  // Mock sale processing
  res.json({ 
    success: true, 
    transactionId: `TXN-${Date.now()}`,
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
