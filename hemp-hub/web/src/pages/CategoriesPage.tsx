import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { useCategoriesWithProductCount, useGlobalSearch } from '../hooks/useApi';

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'product_count'>('name');
  
  const { data: categories, isLoading, error } = useCategoriesWithProductCount();
  const { data: searchResults } = useGlobalSearch(searchQuery, { limit: 20 });

  // Filter and sort categories
  const displayCategories = searchQuery 
    ? searchResults?.categories || []
    : categories || [];

  const sortedCategories = [...displayCategories].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // For product count sorting, we need to handle the typed categories
    const aCount = 'product_count' in a ? a.product_count : 0;
    const bCount = 'product_count' in b ? b.product_count : 0;
    return bCount - aCount;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Categories</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hemp Categories</h1>
              <p className="text-gray-600 mt-2">
                Explore industrial hemp applications organized by plant parts and industries
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'product_count')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="product_count">Sort by Product Count</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedCategories.length} {sortedCategories.length === 1 ? 'category' : 'categories'}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={viewMode === 'grid'
                ? 'bg-white rounded-lg h-64 animate-pulse'
                : 'bg-white rounded-lg h-32 animate-pulse'
              } />
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCategories.map((category) => {
              const productCount = 'product_count' in category ? category.product_count : 0;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                        {productCount} {productCount === 1 ? 'product' : 'products'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Categories List */}
        {!isLoading && viewMode === 'list' && (
          <div className="space-y-4">
            {sortedCategories.map((category) => {
              const productCount = 'product_count' in category ? category.product_count : 0;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300"
                >
                  <div className="flex">
                    <div className="w-48 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </h3>
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full ml-4 flex-shrink-0">
                          {productCount} {productCount === 1 ? 'product' : 'products'}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No categories found' : 'No categories available'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `Try adjusting your search for "${searchQuery}"`
                : 'Categories will appear here once they are added to the database.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}