// Feature flags and integration configuration
export interface IntegrationConfig {
  id: string
  name: string
  enabled: boolean
  apiKey?: string
  webhookUrl?: string
  settings?: Record<string, any>
}

export interface IntegrationResponse {
  success: boolean
  data?: any
  error?: string
}

// Feature flags configuration
export const INTEGRATION_FLAGS: Record<string, IntegrationConfig> = {
  square: {
    id: 'square',
    name: 'Square',
    enabled: false,
    settings: {
      environment: 'demo',
      webhookEndpoint: '/webhooks/square'
    }
  },
  quickbooks: {
    id: 'quickbooks',
    name: 'QuickBooks',
    enabled: false,
    settings: {
      environment: 'demo',
      companyId: 'demo-company'
    }
  },
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    enabled: false,
    settings: {
      environment: 'demo',
      portalId: 'demo-portal'
    }
  },
  slicktext: {
    id: 'slicktext',
    name: 'SlickText',
    enabled: false,
    settings: {
      environment: 'demo',
      keyword: 'DEMO'
    }
  },
  mailchimp: {
    id: 'mailchimp',
    name: 'Mailchimp',
    enabled: false,
    settings: {
      environment: 'demo',
      listId: 'demo-list'
    }
  },
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    enabled: false,
    settings: {
      environment: 'demo',
      webhookEndpoint: '/webhooks/stripe'
    }
  },
  shopify: {
    id: 'shopify',
    name: 'Shopify',
    enabled: false,
    settings: {
      environment: 'demo',
      shopDomain: 'demo-shop.myshopify.com'
    }
  }
}

// Check if integration is enabled
export const isIntegrationEnabled = (integrationId: string): boolean => {
  return INTEGRATION_FLAGS[integrationId]?.enabled || false
}

// Get integration configuration
export const getIntegrationConfig = (integrationId: string): IntegrationConfig | null => {
  return INTEGRATION_FLAGS[integrationId] || null
}

// Enable/disable integration
export const toggleIntegration = (integrationId: string, enabled: boolean): void => {
  if (INTEGRATION_FLAGS[integrationId]) {
    INTEGRATION_FLAGS[integrationId].enabled = enabled
  }
}

// Get all integrations
export const getAllIntegrations = (): IntegrationConfig[] => {
  return Object.values(INTEGRATION_FLAGS)
}
