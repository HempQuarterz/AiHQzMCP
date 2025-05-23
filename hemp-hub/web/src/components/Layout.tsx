import { Link, useLocation } from 'react-router-dom';
import { Leaf, Search, Menu, X, Github, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
    { name: 'Research', href: '/research' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hemp Hub</h1>
                <p className="text-xs text-gray-500">Information Center</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-600 border-b-2 border-green-600 pb-4'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/search"
                className="text-gray-400 hover:text-gray-600"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                to="/categories"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Explore
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/categories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Explore Categories
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Industrial Hemp Hub</h3>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Your comprehensive resource for industrial hemp information, products, 
                applications, and research. Connecting the hemp industry with knowledge 
                and innovation.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/HempQuarterz/AiHQzMCP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:hempquarterz@gmail.com"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/research"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Research Papers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Product Catalog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/HempQuarterz/AiHQzMCP/blob/main/planning-document.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/HempQuarterz/AiHQzMCP/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-500">
                © 2025 Industrial Hemp Information Hub. Built for the hemp community.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Los Angeles, CA</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}