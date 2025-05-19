import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useResearchPaper } from "../hooks/use-research-papers";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CalendarIcon, Users, Tag, Download, ExternalLink } from "lucide-react";

export function ResearchDetailPage() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const id = paperId ? parseInt(paperId) : null;
  const { data: paper, isLoading, error } = useResearchPaper(id);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paperId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !paper) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Research Paper Not Found</h1>
            <p className="text-gray-600 mb-6">The requested research paper could not be found.</p>
            <Button onClick={() => navigate('/research')}>View All Research</Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock paper with additional data if needed
  const mockPaperData = {
    id: paper.id,
    title: paper.title || "Sustainable Hemp Farming Practices",
    abstract: paper.abstract || "A study on environmental impacts of hemp cultivation methods.",
    authors: paper.authors || ["Smith, J.", "Johnson, M."],
    publicationDate: paper.publicationDate || "2024-01-15",
    url: paper.url || "https://example.com/research1",
    keywords: paper.keywords || ["sustainability", "cultivation", "farming"],
    content: `
      <h2>Introduction</h2>
      <p>Hemp (Cannabis sativa L.) has been cultivated for over 10,000 years for its fiber, seed, and oil. However, modern industrial agriculture methods can sometimes have negative environmental impacts. This research examines sustainable cultivation practices for hemp that minimize environmental impact while maximizing yield and quality.</p>
      
      <h2>Materials and Methods</h2>
      <p>Field trials were conducted across three different climate zones using varied cultivation techniques. Soil health, water usage, carbon sequestration, and biodiversity impacts were measured over two growing seasons. Both organic and conventional methods were compared, with special attention to the role of crop rotation and companion planting.</p>
      
      <h2>Results and Discussion</h2>
      <p>Our findings indicate that hemp grown using organic methods showed a 15% reduction in water requirements compared to conventional methods. Additionally, no-till practices combined with cover cropping improved soil health metrics by 22% over the study period. Carbon sequestration rates were measured at 5.5 tons CO2 equivalent per hectare in optimal conditions.</p>
      
      <p>Biodiversity assessments revealed 34% higher insect diversity in plots using companion planting, suggesting improved ecosystem resilience. Crop yields were statistically equivalent between sustainable and conventional methods in the second season, overcoming a 7% yield gap observed in the first year.</p>
      
      <h2>Conclusion</h2>
      <p>This research demonstrates that sustainable hemp farming practices can achieve comparable yields to conventional methods while providing significant environmental benefits. The 15% reduction in water usage is particularly noteworthy for regions facing water scarcity. Furthermore, the carbon sequestration potential positions hemp as a valuable crop for climate-smart agriculture initiatives.</p>
      
      <p>Future research should focus on scaling these practices to commercial operations and quantifying the economic benefits of ecosystem services provided by sustainable hemp cultivation.</p>
    `,
    journal: "Journal of Sustainable Agriculture",
    doi: "10.1234/jsa.2024.0123",
    citationCount: 12,
    institution: "Agricultural Research Institute",
    relatedPapers: [
      { id: 2, title: "Hemp as a Carbon Sink: Quantifying Sequestration Potential" },
      { id: 3, title: "Organic Pest Management in Hemp Cultivation" },
      { id: 4, title: "Water Efficiency Comparisons in Industrial Hemp Production" }
    ]
  };

  // Use the combined data
  const displayPaper = { ...mockPaperData, ...paper };

  // Format the publication date
  const formattedDate = new Date(displayPaper.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/research" className="hover:text-gray-700">Research</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Paper</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Paper header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayPaper.title}</h1>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{displayPaper.authors.join(", ")}</span>
                  </div>
                  {displayPaper.journal && (
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>{displayPaper.journal}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Abstract</h2>
                  <p className="text-gray-600">{displayPaper.abstract}</p>
                </div>
                
                {displayPaper.keywords && (
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Tag className="w-4 h-4 mr-1 text-gray-500" />
                      <h2 className="text-sm font-medium text-gray-500">Keywords</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {displayPaper.keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-800 text-sm px-2.5 py-0.5 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4 mb-6">
                  <Button className="flex items-center gap-2" asChild>
                    <a href={displayPaper.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Original
                    </a>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Paper content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Paper</h2>
                <div 
                  className="prose prose-green max-w-none" 
                  dangerouslySetInnerHTML={{ __html: displayPaper.content }}
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            {/* Paper metadata */}
            <Card className="mb-6 sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Paper Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publication</h3>
                    <p>{displayPaper.journal}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">DOI</h3>
                    <p>{displayPaper.doi}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Authors</h3>
                    <p>{displayPaper.authors.join(", ")}</p>
                  </div>
                  
                  {displayPaper.institution && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Institution</h3>
                      <p>{displayPaper.institution}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publication Date</h3>
                    <p>{formattedDate}</p>
                  </div>
                  
                  {displayPaper.citationCount && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Citations</h3>
                      <p>{displayPaper.citationCount}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Related papers */}
            {displayPaper.relatedPapers && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Related Research</h2>
                  
                  <div className="space-y-4">
                    {displayPaper.relatedPapers.map((relatedPaper) => (
                      <div key={relatedPaper.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <Link 
                          to={`/research/${relatedPaper.id}`}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          {relatedPaper.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}