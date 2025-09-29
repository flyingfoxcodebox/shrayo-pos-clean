import React, { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  sku: string
  price: number
  category: string
  inventory: number
  description?: string
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load products from localStorage or use demo data
    const stored = localStorage.getItem('products')
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      // Demo products - 50+ liquor products
      const demoProducts: Product[] = [
        // Whiskey
        { id: '1', name: 'Premium Whiskey', sku: 'WH-001', price: 89.99, category: 'Whiskey', inventory: 25, description: 'Smooth premium whiskey' },
        { id: '2', name: 'Bourbon Reserve', sku: 'WH-002', price: 65.50, category: 'Whiskey', inventory: 18, description: 'Aged bourbon reserve' },
        { id: '3', name: 'Scotch Single Malt', sku: 'WH-003', price: 125.00, category: 'Whiskey', inventory: 12, description: 'Premium single malt scotch' },
        { id: '4', name: 'Irish Whiskey', sku: 'WH-004', price: 45.75, category: 'Whiskey', inventory: 22, description: 'Traditional Irish whiskey' },
        { id: '5', name: 'Rye Whiskey', sku: 'WH-005', price: 55.25, category: 'Whiskey', inventory: 15, description: 'Spicy rye whiskey' },
        
        // Vodka
        { id: '6', name: 'Vodka Premium', sku: 'VD-001', price: 45.50, category: 'Vodka', inventory: 30, description: 'Premium filtered vodka' },
        { id: '7', name: 'Grey Goose', sku: 'VD-002', price: 75.99, category: 'Vodka', inventory: 8, description: 'Luxury French vodka' },
        { id: '8', name: 'Beluga Gold', sku: 'VD-003', price: 95.00, category: 'Vodka', inventory: 5, description: 'Ultra-premium vodka' },
        { id: '9', name: 'Tito\'s Handmade', sku: 'VD-004', price: 35.99, category: 'Vodka', inventory: 25, description: 'American craft vodka' },
        { id: '10', name: 'Ketel One', sku: 'VD-005', price: 42.50, category: 'Vodka', inventory: 20, description: 'Dutch premium vodka' },
        
        // Wine
        { id: '11', name: 'Red Wine Cabernet', sku: 'WN-001', price: 32.75, category: 'Wine', inventory: 20, description: 'Full-bodied red wine' },
        { id: '12', name: 'Chardonnay White', sku: 'WN-002', price: 28.99, category: 'Wine', inventory: 18, description: 'Crisp white wine' },
        { id: '13', name: 'Pinot Noir', sku: 'WN-003', price: 45.50, category: 'Wine', inventory: 15, description: 'Elegant red wine' },
        { id: '14', name: 'Sauvignon Blanc', sku: 'WN-004', price: 25.75, category: 'Wine', inventory: 22, description: 'Fresh white wine' },
        { id: '15', name: 'Merlot Reserve', sku: 'WN-005', price: 38.99, category: 'Wine', inventory: 16, description: 'Smooth red wine' },
        { id: '16', name: 'Riesling Sweet', sku: 'WN-006', price: 22.50, category: 'Wine', inventory: 24, description: 'Sweet dessert wine' },
        { id: '17', name: 'Malbec', sku: 'WN-007', price: 35.25, category: 'Wine', inventory: 14, description: 'Bold red wine' },
        { id: '18', name: 'Prosecco', sku: 'WN-008', price: 28.99, category: 'Wine', inventory: 19, description: 'Italian sparkling wine' },
        
        // Beer
        { id: '19', name: 'Craft Beer 6-Pack', sku: 'BE-001', price: 24.99, category: 'Beer', inventory: 50, description: 'Local craft beer selection' },
        { id: '20', name: 'IPA Premium', sku: 'BE-002', price: 18.50, category: 'Beer', inventory: 35, description: 'Hoppy India Pale Ale' },
        { id: '21', name: 'Stout Dark', sku: 'BE-003', price: 16.99, category: 'Beer', inventory: 28, description: 'Rich dark stout' },
        { id: '22', name: 'Lager Classic', sku: 'BE-004', price: 14.75, category: 'Beer', inventory: 42, description: 'Traditional lager' },
        { id: '23', name: 'Wheat Beer', sku: 'BE-005', price: 19.99, category: 'Beer', inventory: 31, description: 'Refreshing wheat beer' },
        { id: '24', name: 'Pilsner', sku: 'BE-006', price: 15.50, category: 'Beer', inventory: 38, description: 'Crisp pilsner' },
        
        // Gin
        { id: '25', name: 'Gin London Dry', sku: 'GN-001', price: 38.99, category: 'Gin', inventory: 15, description: 'Classic London dry gin' },
        { id: '26', name: 'Hendrick\'s Gin', sku: 'GN-002', price: 55.75, category: 'Gin', inventory: 10, description: 'Premium Scottish gin' },
        { id: '27', name: 'Tanqueray', sku: 'GN-003', price: 42.50, category: 'Gin', inventory: 18, description: 'Premium London gin' },
        { id: '28', name: 'Bombay Sapphire', sku: 'GN-004', price: 45.99, category: 'Gin', inventory: 12, description: 'Premium gin with botanicals' },
        { id: '29', name: 'Aviation Gin', sku: 'GN-005', price: 48.75, category: 'Gin', inventory: 8, description: 'American craft gin' },
        
        // Tequila
        { id: '30', name: 'Tequila Silver', sku: 'TQ-001', price: 52.25, category: 'Tequila', inventory: 12, description: 'Premium silver tequila' },
        { id: '31', name: 'Don Julio 1942', sku: 'TQ-002', price: 185.00, category: 'Tequila', inventory: 3, description: 'Ultra-premium tequila' },
        { id: '32', name: 'Patron Silver', sku: 'TQ-003', price: 65.99, category: 'Tequila', inventory: 8, description: 'Premium tequila' },
        { id: '33', name: 'Casamigos', sku: 'TQ-004', price: 75.50, category: 'Tequila', inventory: 6, description: 'Celebrity tequila brand' },
        { id: '34', name: 'Herradura', sku: 'TQ-005', price: 58.75, category: 'Tequila', inventory: 10, description: 'Traditional tequila' },
        
        // Rum
        { id: '35', name: 'Rum Spiced', sku: 'RM-001', price: 41.80, category: 'Rum', inventory: 18, description: 'Caribbean spiced rum' },
        { id: '36', name: 'Bacardi Superior', sku: 'RM-002', price: 28.99, category: 'Rum', inventory: 25, description: 'Classic white rum' },
        { id: '37', name: 'Captain Morgan', sku: 'RM-003', price: 32.50, category: 'Rum', inventory: 22, description: 'Spiced rum' },
        { id: '38', name: 'Mount Gay', sku: 'RM-004', price: 45.75, category: 'Rum', inventory: 14, description: 'Barbados rum' },
        { id: '39', name: 'Plantation Rum', sku: 'RM-005', price: 55.25, category: 'Rum', inventory: 9, description: 'Premium aged rum' },
        
        // Champagne
        { id: '40', name: 'Champagne Brut', sku: 'CH-001', price: 125.00, category: 'Champagne', inventory: 8, description: 'French champagne' },
        { id: '41', name: 'Dom Perignon', sku: 'CH-002', price: 285.00, category: 'Champagne', inventory: 2, description: 'Luxury champagne' },
        { id: '42', name: 'Veuve Clicquot', sku: 'CH-003', price: 95.99, category: 'Champagne', inventory: 6, description: 'Premium champagne' },
        { id: '43', name: 'Moet Chandon', sku: 'CH-004', price: 75.50, category: 'Champagne', inventory: 12, description: 'Classic champagne' },
        { id: '44', name: 'Krug Grande', sku: 'CH-005', price: 450.00, category: 'Champagne', inventory: 1, description: 'Ultra-luxury champagne' },
        
        // Liqueurs
        { id: '45', name: 'Baileys Irish Cream', sku: 'LQ-001', price: 32.99, category: 'Liqueur', inventory: 20, description: 'Cream liqueur' },
        { id: '46', name: 'Grand Marnier', sku: 'LQ-002', price: 65.75, category: 'Liqueur', inventory: 8, description: 'Orange liqueur' },
        { id: '47', name: 'Cointreau', sku: 'LQ-003', price: 42.50, category: 'Liqueur', inventory: 12, description: 'Triple sec liqueur' },
        { id: '48', name: 'Kahlua', sku: 'LQ-004', price: 28.99, category: 'Liqueur', inventory: 16, description: 'Coffee liqueur' },
        { id: '49', name: 'Amaretto', sku: 'LQ-005', price: 35.25, category: 'Liqueur', inventory: 14, description: 'Almond liqueur' },
        { id: '50', name: 'Frangelico', sku: 'LQ-006', price: 38.99, category: 'Liqueur', inventory: 10, description: 'Hazelnut liqueur' },
        { id: '51', name: 'Chambord', sku: 'LQ-007', price: 45.75, category: 'Liqueur', inventory: 7, description: 'Raspberry liqueur' },
        { id: '52', name: 'Sambuca', sku: 'LQ-008', price: 32.50, category: 'Liqueur', inventory: 11, description: 'Anise liqueur' }
      ]
      setProducts(demoProducts)
      localStorage.setItem('products', JSON.stringify(demoProducts))
    }
  }, [])

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTotalInventory = () => {
    return products.reduce((sum, product) => sum + product.inventory, 0)
  }

  const getTotalValue = () => {
    return products.reduce((sum, product) => sum + (product.price * product.inventory), 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse your liquor inventory and product catalog.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-3 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">#</span>
                </div>
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd className="text-lg sm:text-2xl font-semibold text-gray-900">{products.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-3 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">📦</span>
                </div>
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Inventory</dt>
                  <dd className="text-lg sm:text-2xl font-semibold text-gray-900">{getTotalInventory()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-3 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">$</span>
                </div>
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Inventory Value</dt>
                  <dd className="text-lg sm:text-2xl font-semibold text-gray-900">${getTotalValue().toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or SKU..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-4 sm:py-5 sm:p-6">
          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-4">
            Product Catalog ({filteredProducts.length} products)
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-300">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{product.sku}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.inventory > 20 ? 'bg-green-100 text-green-800' :
                    product.inventory > 10 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.inventory}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                  <p className="text-xs sm:text-sm text-gray-600 capitalize">{product.category}</p>
                  {product.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                  )}
                </div>
                
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="truncate">SKU: {product.sku}</span>
                    <span className="truncate ml-2">${(product.price * product.inventory).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
