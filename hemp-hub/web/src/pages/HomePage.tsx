import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Factory, BookOpen, TrendingUp } from 'lucide-react';
import { useCategories, useFeaturedProducts, useDashboardStats } from '../hooks/useApi';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts(6);
  const { data: stats } = useDashboardStats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page (implement this route)
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Industrial Hemp Information Hub
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover the complete world of industrial hemp with our comprehensive database 
            of products, applications, and research. From seeds to textiles, explore 
            sustainable solutions for every industry.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search hemp products, applications, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          {stats && (
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4" />
                <span>{stats.categories_count} Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4" />
                <span>{stats.products_count} Products</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Hemp Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive collection of hemp applications organized by plant parts and industries.
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover some of the most innovative hemp products and applications.
            </p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts?.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {product.description}
                    </p>
                    {product.category && (
                      <div className="mt-3">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Explore Products
              </h3>
              <p className="text-gray-600 mb-4">
                Browse our comprehensive database of hemp products and applications across all industries.
              </p>
              <Link
                to="/products"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View Products →
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Research & Studies
              </h3>
              <p className="text-gray-600 mb-4">
                Access the latest research papers, studies, and scientific findings about industrial hemp.
              </p>
              <Link
                to="/research"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse Research →
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Industry Insights
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with market trends, industry news, and emerging applications.
              </p>
              <Link
                to="/insights"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View Insights →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}