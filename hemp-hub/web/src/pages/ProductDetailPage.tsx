import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, Share2 } from 'lucide-react';
import { useProduct, useProductsByCategory } from '../hooks/useApi';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading, error } = useProduct(id!);
  const { data: relatedProducts } = useProductsByCategory(product?.category_id || '');

  // Filter out the current product from related products
  const filteredRelatedProducts = relatedProducts?.filter(p => p.id !== id)?.slice(0, 3) || [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
          <p className="text-gray-600">Please try refreshing the page or go back to products.</p>
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
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
            {product.category && (
              <>
                <span className="text-gray-400">/</span>
                <Link 
                  to={`/category/${product.category.id}`} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <Link
              to="/categories"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
            
            <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-white">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {product.category && (
                  <Link
                    to={`/category/${product.category.id}`}
                    className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-3 hover:bg-green-200 transition-colors"
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    {product.category.name}
                  </Link>
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
              </div>
              
              <button
                onClick={handleShare}
                className="text-gray-400 hover:text-gray-600 ml-4"
                title="Share this product"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Meta */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Added {new Date(product.created_at).toLocaleDateString()}</span>
                </div>
                
                {product.updated_at !== product.created_at && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Updated {new Date(product.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex flex-wrap gap-4">
                {product.category && (
                  <Link
                    to={`/category/${product.category.id}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    View Category
                  </Link>
                )}
                
                <button
                  onClick={() => window.open(product.image_url, '_blank')}
                  className="flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              {product.category && (
                <Link
                  to={`/category/${product.category.id}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All in {product.category.name} →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 group"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.image_url}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {relatedProduct.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Info */}
        {product.category && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 mt-12">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.category.image_url}
                  alt={product.category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {product.category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.category.description}
                </p>
                <Link
                  to={`/category/${product.category.id}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Explore all {product.category.name} products →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}