import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { queryClient } from './lib/queryClient';

// Import implemented pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PlantTypesPage } from './pages/PlantTypesPage';
import { PlantTypeDetailPage } from './pages/PlantTypeDetailPage';
import { PlantPartDetailPage } from './pages/PlantPartDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';

function NotFoundPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-700">404 - Page Not Found</h2>
      <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
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
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/plant-types" element={<PlantTypesPage />} />
              <Route path="/plant-type/:id" element={<PlantTypeDetailPage />} />
              <Route path="/plant-part/:id" element={<PlantPartDetailPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/research/:paperId" element={<ResearchDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;