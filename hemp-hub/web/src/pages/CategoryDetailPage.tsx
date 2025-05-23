import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';
import { useCategory, useProductsByCategory } from '../hooks/useApi';

export function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'created_at'>('title');
  
  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategory(id!);
  const { data: products, isLoading: productsLoading, error: productsError } = useProductsByCategory(id!);

  // Filter and sort products
  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (categoryError || productsError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Category</h1>
          <p className="text-gray-600">Please try refreshing the page or go back to categories.</p>
          <Link
            to="/categories"
            className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          <Link
            to="/categories"
            className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/categories" className="text-gray-500 hover:text-gray-700">
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                to="/categories"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Link>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {category.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </span>
                <span>•</span>
                <span>Updated {new Date(category.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Products in {category.name}
            </h2>
            <p className="text-gray-600">
              Discover all the hemp products in this category
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'created_at')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="title">Sort by Name</option>
                <option value="created_at">Sort by Date Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Learn More →
                    </Link>
                    <button
                      onClick={() => window.open(product.image_url, '_blank')}
                      className="text-gray-400 hover:text-gray-600"
                      title="View Image"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No products found' : 'No products in this category yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No products match your search for "${searchQuery}"`
                : 'Products will appear here when they are added to this category.'
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

      {/* Related Categories */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-6 py-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Explore Other Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
            >
              View All Categories
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
            >
              Research & Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}