import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, BookOpen } from 'lucide-react';

export function ResearchDetailPage() {
  const { paperId } = useParams<{ paperId: string }>();

  // This is a placeholder page - research data would come from your database
  // when you implement the research_papers table from your planning document
  
  // Mock research paper data
  const paper = {
    id: paperId,
    title: 'Sustainable Hemp Farming Practices and Environmental Impact',
    authors: ['Dr. Jane Smith', 'Prof. Michael Johnson'],
    abstract: 'This comprehensive study examines sustainable farming practices for industrial hemp and their positive environmental impact, including soil health improvement and carbon sequestration potential. The research was conducted over a three-year period across multiple hemp farms in different climate zones.',
    fullText: `This study represents the most comprehensive analysis of sustainable hemp farming practices to date. Over a three-year period, we examined farming techniques across 50 hemp farms in various climate zones to understand the environmental impact of different cultivation methods.

Key Findings:
1. Hemp cultivation can improve soil health by up to 40% when using regenerative farming practices
2. Carbon sequestration rates are 35% higher than traditional crops
3. Water usage is reduced by 50% compared to cotton cultivation
4. Biodiversity in hemp farming areas increased by 25%

The study also examined economic impacts, finding that sustainable hemp farming practices, while requiring higher initial investment, yield 20% higher profits over a 5-year period due to improved soil quality and reduced input costs.

These findings suggest that hemp cultivation, when done sustainably, can play a significant role in climate change mitigation while providing economic benefits to farmers.`,
    publication_date: '2024-03-15',
    journal: 'Journal of Sustainable Agriculture',
    doi: '10.1234/jsa.2024.0315',
    url: 'https://example.com/research/sustainable-hemp-farming',
    keywords: ['sustainability', 'farming', 'environment', 'hemp', 'carbon sequestration'],
    citation_count: 45,
    download_count: 1234
  };

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
            <Link to="/research" className="text-gray-500 hover:text-gray-700">
              Research
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Research Paper</span>
          </nav>
        </div>
      </div>

      {/* Research Paper Detail */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/research"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Link>

          {/* Paper Header */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {paper.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{paper.authors.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(paper.publication_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>{paper.journal}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {paper.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Paper Stats */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{paper.citation_count}</div>
                <div className="text-sm text-gray-600">Citations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{paper.download_count.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">DOI</div>
                <div className="text-sm font-mono text-gray-900">{paper.doi}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.open(paper.url, '_blank')}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                disabled
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Paper (Demo)
              </button>
              <button className="flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Download PDF
              </button>
              <button className="flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Cite Paper
              </button>
            </div>
          </div>

          {/* Abstract */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-700 leading-relaxed">
              {paper.abstract}
            </p>
          </div>

          {/* Full Text Preview */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Research Preview</h2>
            <div className="prose prose-gray max-w-none">
              {paper.fullText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Full Research Database Coming Soon
                </h3>
                <p className="text-blue-700">
                  This is a preview of how research papers will be displayed in our upcoming research database. 
                  The full system will include peer-reviewed papers, searchable abstracts, citation tracking, 
                  and direct links to published research.
                </p>
              </div>
            </div>
          </div>

          {/* Related Research */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Research Topics</h3>
            <div className="flex flex-wrap gap-3">
              {['Sustainable Agriculture', 'Hemp Cultivation', 'Carbon Sequestration', 'Soil Health', 'Environmental Impact'].map((topic) => (
                <Link
                  key={topic}
                  to="/research"
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}