import { Link } from 'react-router-dom';
import { Leaf, Target, Users, Database, Globe, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About Hemp Hub
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Your comprehensive resource for industrial hemp information, connecting 
              researchers, businesses, and innovators with the knowledge they need 
              to advance the hemp industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To create the most complete, accurate, and accessible source of information 
                on industrial hemp uses, applications, companies, regulations, research, 
                and historical significance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We believe that by democratizing access to hemp knowledge, we can accelerate 
                innovation, support sustainable practices, and help build a more 
                environmentally conscious future.
              </p>
              <Link
                to="/categories"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Our Database
              </Link>
            </div>
            <div className="lg:order-first">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">12+ Categories</h3>
                  <p className="text-sm text-gray-600">Comprehensive hemp classifications</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Leaf className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">39+ Products</h3>
                  <p className="text-sm text-gray-600">Real hemp applications</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-sm text-gray-600">Worldwide hemp industry data</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Growing Fast</h3>
                  <p className="text-sm text-gray-600">Continuously expanding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive resources for every stakeholder in the hemp ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Product Database
              </h3>
              <p className="text-gray-600">
                Extensive catalog of hemp products and applications across all industries, 
                from textiles to construction materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Research Library
              </h3>
              <p className="text-gray-600">
                Access to scientific studies, research papers, and the latest 
                findings in hemp science and technology.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Industry Directory
              </h3>
              <p className="text-gray-600">
                Connect with hemp businesses, suppliers, and innovators 
                across the global hemp value chain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Market Intelligence
              </h3>
              <p className="text-gray-600">
                Data and insights on market sizes, growth rates, emerging 
                trends, and industry challenges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Regulatory Information
              </h3>
              <p className="text-gray-600">
                Jurisdiction-specific regulations, THC limits, licensing 
                requirements, and import/export information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation Hub
              </h3>
              <p className="text-gray-600">
                Showcase of cutting-edge hemp technologies, patents, 
                and breakthrough applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed for diverse stakeholders in the hemp ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Researchers",
                description: "Access comprehensive data for academic studies and R&D projects",
                icon: BookOpen
              },
              {
                title: "Businesses",
                description: "Find suppliers, applications, and market opportunities",
                icon: TrendingUp
              },
              {
                title: "Consumers",
                description: "Learn about hemp products and their benefits",
                icon: Users
              },
              {
                title: "Policymakers",
                description: "Get industry insights for informed decision-making",
                icon: Target
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Hemp Revolution
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're researching, developing, or investing in hemp, 
            our platform provides the knowledge you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/categories"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Database
            </Link>
            <Link
              to="/research"
              className="border border-green-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}