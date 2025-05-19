import { useState } from "react";
import { Link } from "react-router-dom";
import { useResearchPapers } from "../hooks/use-research-papers";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Search } from "lucide-react";

export function ResearchPage() {
  const { data: researchPapers, isLoading, error } = useResearchPapers();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock research papers data
  const mockPapers = [
    {
      id: 1,
      title: "Sustainable Hemp Farming Practices",
      abstract: "A study on environmental impacts of hemp cultivation methods.",
      authors: ["Smith, J.", "Johnson, M."],
      publicationDate: "2024-01-15",
      url: "https://example.com/research1",
      keywords: ["sustainability", "cultivation", "farming"]
    },
    {
      id: 2,
      title: "Nutritional Analysis of Hemp Seeds",
      abstract: "Comprehensive analysis of nutritional components in hemp seeds.",
      authors: ["Lopez, R.", "Chen, H."],
      publicationDate: "2024-02-20",
      url: "https://example.com/research2",
      keywords: ["nutrition", "seeds", "health"]
    },
    {
      id: 3,
      title: "Hemp Fiber Properties for Textile Applications",
      abstract: "Analysis of hemp fiber characteristics and performance in textiles.",
      authors: ["Williams, A.", "Brown, K."],
      publicationDate: "2024-03-10",
      url: "https://example.com/research3",
      keywords: ["fiber", "textiles", "materials"]
    },
    {
      id: 4,
      title: "Economic Impact of Hemp Legalization",
      abstract: "Study on the economic effects of recent hemp legalization across various regions.",
      authors: ["Miller, S.", "Taylor, D."],
      publicationDate: "2024-04-05",
      url: "https://example.com/research4",
      keywords: ["economics", "policy", "legalization"]
    },
    {
      id: 5,
      title: "Hemp-Based Bioplastics Development",
      abstract: "Research on creating sustainable bioplastics using hemp-derived materials.",
      authors: ["Garcia, J.", "Wilson, T."],
      publicationDate: "2024-04-25",
      url: "https://example.com/research5",
      keywords: ["bioplastics", "sustainability", "innovation"]
    },
  ];

  // Use actual data if available, otherwise use mock data
  const displayPapers = researchPapers?.length ? researchPapers : mockPapers;

  // Filter papers based on search query
  const filteredPapers = displayPapers.filter(paper => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.authors.some(author => author.toLowerCase().includes(query)) ||
      (paper.keywords && paper.keywords.some(keyword => keyword.toLowerCase().includes(query)))
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already filtering in real-time, so this is just to handle form submission
    console.log("Search query submitted:", searchQuery);
  };

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

  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div>
                <p className="text-red-700">Error loading research papers. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hemp Research Papers</h1>
        <p className="text-gray-600 mb-8">
          Explore the latest scientific research and academic papers on hemp cultivation, 
          applications, and benefits. Stay informed about the latest discoveries in hemp science.
        </p>

        {/* Search bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by title, author, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Research papers */}
        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">No Research Papers Found</h2>
            <p className="text-gray-600 mb-4">
              No papers match your search criteria. Try a different search term or browse all papers.
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-700">
                    <Link to={`/research/${paper.id}`}>
                      {paper.title}
                    </Link>
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
                    <span>{new Date(paper.publicationDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{paper.authors.join(", ")}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{paper.abstract}</p>
                  
                  {paper.keywords && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {paper.keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <Link 
                    to={`/research/${paper.id}`}
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    Read Full Paper →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}