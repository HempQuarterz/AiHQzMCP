import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-green-700">
              Hemp Hub
            </Link>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-700 hover:text-green-600">
                Home
              </Link>
              <Link to="/archetypes" className="text-gray-700 hover:text-green-600">
                Archetypes
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hemp Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
