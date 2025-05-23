import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { queryClient } from './lib/queryClient';

// Import updated pages that work with the actual database structure
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';

// Note: These old pages are kept for backward compatibility but should be updated:
// - PlantTypesPage → CategoriesPage ✅ 
// - PlantTypeDetailPage → CategoryDetailPage ✅
// - PlantPartDetailPage → (could map to hemp_parts if needed)

function NotFoundPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-700">404 - Page Not Found</h2>
      <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
      <div className="mt-4 space-x-4">
        <a href="/" className="text-green-600 hover:text-green-700 font-medium">
          Go Home
        </a>
        <a href="/categories" className="text-green-600 hover:text-green-700 font-medium">
          Browse Categories
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              {/* Main routes using correct database structure */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Categories (replaces plant-types) */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryDetailPage />} />
              
              {/* Products */}
              <Route path="/products" element={<CategoriesPage />} /> {/* Could create dedicated ProductsPage */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
              
              {/* Research */}
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/research/:paperId" element={<ResearchDetailPage />} />
              
              {/* Legacy routes for backward compatibility - redirect to new structure */}
              <Route path="/plant-types" element={<CategoriesPage />} />
              <Route path="/plant-type/:id" element={<CategoryDetailPage />} />
              
              {/* Future routes that could be implemented */}
              {/* <Route path="/hemp-parts" element={<HempPartsPage />} /> */}
              {/* <Route path="/hemp-part/:id" element={<HempPartDetailPage />} /> */}
              {/* <Route path="/hemp-products" element={<HempProductsPage />} /> */}
              {/* <Route path="/hemp-product/:id" element={<HempProductDetailPage />} /> */}
              {/* <Route path="/search" element={<SearchPage />} /> */}
              {/* <Route path="/insights" element={<InsightsPage />} /> */}
              
              {/* 404 page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;