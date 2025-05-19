import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePlantPart } from "../hooks/use-plant-data";
import { useHempProducts } from "../hooks/use-product-data";
import { useIndustries } from "../hooks/use-plant-data";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { InfoIcon } from "lucide-react";

export function PlantPartDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plantPartId = id ? parseInt(id) : null;
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const { data: plantPart, isLoading: isLoadingPlantPart } = usePlantPart(plantPartId);
  const { data: industries, isLoading: isLoadingIndustries } = useIndustries();
  const { data: productsData, isLoading: isLoadingProducts } = useHempProducts(
    plantPartId, 
    selectedIndustry, 
    currentPage, 
    itemsPerPage
  );

  // Scroll to top on page load or filter change
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [plantPartId, selectedIndustry]);

  // Loading state
  if (isLoadingPlantPart || isLoadingIndustries) {
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
  if (!plantPart) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Plant Part Not Found</h1>
            <p className="text-gray-600 mb-6">The requested plant part could not be found.</p>
            <Button onClick={() => navigate('/')}>Return to Homepage</Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Hemp Fabric",
      description: "Sustainable fabric made from hemp stalks.",
      image_url: "/images/hemp-fabric.jpg",
      plant_part_id: plantPartId,
      industry_id: 1,
      benefits: ["Durable", "Sustainable", "Breathable"],
      uses: ["Clothing", "Upholstery", "Industrial textiles"]
    },
    {
      id: 2,
      name: "Hemp Fiber Insulation",
      description: "Natural insulation material for construction.",
      image_url: "/images/hemp-insulation.jpg",
      plant_part_id: plantPartId,
      industry_id: 3,
      benefits: ["Eco-friendly", "Excellent thermal properties", "Sound absorbing"],
      uses: ["Home insulation", "Commercial buildings", "Sound proofing"]
    },
    {
      id: 3,
      name: "Hemp Rope",
      description: "Strong and durable rope made from hemp fibers.",
      image_url: "/images/hemp-rope.jpg",
      plant_part_id: plantPartId,
      industry_id: 1,
      benefits: ["Strong", "Resistant to mold", "Long-lasting"],
      uses: ["Marine applications", "Industrial use", "Crafts"]
    },
    {
      id: 4,
      name: "Hemp Paper",
      description: "Sustainable paper products made from hemp.",
      image_url: "/images/hemp-paper.jpg",
      plant_part_id: plantPartId,
      industry_id: 2,
      benefits: ["Tree-free", "Acid-free", "Durable"],
      uses: ["Stationery", "Art supplies", "Packaging"]
    }
  ];

  // Use actual data if available, otherwise use mock data
  const displayProducts = productsData?.items?.length ? productsData.items : mockProducts;
  
  // Use actual industries if available, otherwise use mock data
  const displayIndustries = industries?.length ? industries : [
    { id: 1, name: "Textiles", description: "Fabric and fiber products", icon: "shirt" },
    { id: 2, name: "Paper", description: "Sustainable paper products", icon: "file" },
    { id: 3, name: "Construction", description: "Building materials", icon: "building" },
    { id: 4, name: "Food", description: "Edible hemp products", icon: "utensils" }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/plant-types" className="hover:text-gray-700">Plant Types</Link>
          <span>/</span>
          <Link to={`/plant-type/${plantPart.plant_type_id}`} className="hover:text-gray-700">
            Plant Type
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{plantPart.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">{plantPart.name} Applications by Industry</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with plant part info */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-full p-3 mr-3">
                  <InfoIcon className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">Hemp {plantPart.name}</h2>
              </div>

              {/* Part image placeholder */}
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400">Plant Part Image</span>
              </div>

              <h3 className="font-medium text-lg mb-2">About Hemp {plantPart.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {plantPart.description || `Hemp ${plantPart.name} are versatile components of the cannabis plant with numerous applications across various industries.`}
              </p>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 flex items-center">
                  <InfoIcon className="h-5 w-5 mr-2" />
                  Key Facts
                </h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <InfoIcon className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                    Hemp has been cultivated for over 10,000 years
                  </li>
                  <li className="flex items-start">
                    <InfoIcon className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                    A single hemp plant can have over 25,000 practical uses
                  </li>
                  <li className="flex items-start">
                    <InfoIcon className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                    Hemp requires 50% less water than cotton to grow
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main content with applications */}
          <div className="lg:w-2/3">
            {/* Industry filter */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">Filter by Industry</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedIndustry === null ? "default" : "outline"}
                    className={selectedIndustry === null ? "bg-green-600" : ""}
                    onClick={() => setSelectedIndustry(null)}
                  >
                    All Industries
                  </Button>
                  
                  {displayIndustries.map(industry => (
                    <Button
                      key={industry.id}
                      variant={selectedIndustry === industry.id ? "default" : "outline"}
                      className={selectedIndustry === industry.id ? "bg-green-600" : ""}
                      onClick={() => setSelectedIndustry(industry.id)}
                    >
                      {industry.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            {isLoadingProducts ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayProducts.map(product => (
                  <Card key={product.id} className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-gray-400">Product Image</span>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="mb-3">
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Benefits:</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.benefits.map((benefit, i) => (
                              <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {product.uses && product.uses.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Uses:</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.uses.map((use, i) => (
                              <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/product/${product.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination placeholder */}
            {displayProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  >
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    {currentPage} of {Math.ceil(displayProducts.length / itemsPerPage)}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage >= Math.ceil(displayProducts.length / itemsPerPage)}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}