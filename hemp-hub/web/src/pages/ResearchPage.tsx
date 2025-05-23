import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Calendar, User, Search } from 'lucide-react';

export function ResearchPage() {
  // This is a placeholder page - research data would come from your database
  // when you implement the research_papers table from your planning document
  
  const placeholderResearch = [
    {
      id: '1',
      title: 'Sustainable Hemp Farming Practices and Environmental Impact',
      authors: ['Dr. Jane Smith', 'Prof. Michael Johnson'],
      abstract: 'This comprehensive study examines sustainable farming practices for industrial hemp and their positive environmental impact, including soil health improvement and carbon sequestration potential.',
      publication_date: '2024-03-15',
      url: 'https://example.com/research/sustainable-hemp-farming',
      keywords: ['sustainability', 'farming', 'environment', 'hemp']
    },
    {
      id: '2',
      title: 'Nutritional Analysis of Hemp Seeds: A Complete Protein Source',
      authors: ['Dr. Sarah Rodriguez', 'Dr. Chen Wei'],
      abstract: 'Detailed nutritional analysis of hemp seeds reveals a complete amino acid profile, making them an excellent plant-based protein source with significant health benefits.',
      publication_date: '2024-02-20',
      url: 'https://example.com/research/hemp-seed-nutrition',
      keywords: ['nutrition', 'protein', 'health', 'seeds']
    },
    {
      id: '3',
      title: 'Hemp-Based Building Materials: Hempcrete Performance Studies',
      authors: ['Dr. Robert Brown', 'Prof. Lisa Anderson'],
      abstract: 'Engineering analysis of hempcrete as a sustainable building material, examining thermal properties, durability, and carbon footprint compared to traditional materials.',
      publication_date: '2024-01-10',
      url: 'https://example.com/research/hempcrete-performance',
      keywords: ['construction', 'materials', 'sustainability', 'hempcrete']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hemp Research Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access the latest scientific studies, research papers, and academic findings 
              about industrial hemp applications, benefits, and innovations.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search research papers, authors, topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Research Database Coming Soon
              </h3>
              <p className="text-blue-700 mb-4">
                We're building a comprehensive database of hemp research papers, studies, and academic publications. 
                The research library will include peer-reviewed papers, patents, and cutting-edge studies from around the world.
              </p>
              <div className="text-sm text-blue-600">
                <strong>Planned Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Searchable database of hemp research papers</li>
                  <li>Filter by topic, author, publication date, and research focus</li>
                  <li>Abstract previews and full paper access</li>
                  <li>Citation tools and reference management</li>
                  <li>Latest research alerts and notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Research Papers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sample Research Papers
          </h2>
          <p className="text-gray-600 mb-8">
            Here's a preview of the type of research content that will be available in our database:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {placeholderResearch.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {paper.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{paper.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(paper.publication_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {paper.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:ml-6 lg:flex-shrink-0">
                  <button
                    onClick={() => window.open(paper.url, '_blank')}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    disabled
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Paper (Demo)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Contribute to Hemp Research
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Are you a researcher working on hemp-related studies? We'd love to include 
            your work in our database to help advance the hemp industry knowledge base.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Learn More About Our Mission
            </Link>
            <Link
              to="/categories"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Explore Hemp Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}