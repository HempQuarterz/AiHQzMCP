import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useHempProduct } from "../hooks/use-product-data";
import { usePlantPart } from "../hooks/use-plant-data";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { InfoIcon, Check } from "lucide-react";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id ? parseInt(id) : null;
  const { data: product, isLoading: isLoadingProduct, error: productError } = useHempProduct(productId);
  const { data: plantPart, isLoading: isLoadingPlantPart } = usePlantPart(product?.plant_part_id || null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Loading state
  if (isLoadingProduct || isLoadingPlantPart) {
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
  if (productError || !product) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The requested product could not be found.</p>
            <Button onClick={() => navigate('/')}>Return to Homepage</Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for the product if needed
  const mockProduct = {
    ...product,
    sustainability_score: 8.5,
    market_status: "Established",
    production_regions: ["North America", "Europe", "Asia"],
    key_manufacturers: ["EcoHemp Co.", "Green Solutions Inc.", "Hemp Innovations"],
    industry_challenges: [
      "Regulatory barriers in some regions",
      "Competition from synthetic alternatives",
      "Supply chain optimization"
    ],
    industry_opportunities: [
      "Growing demand for sustainable products",
      "Technological innovations in processing",
      "Expanded legalization globally"
    ]
  };

  // Use the available product data, enhanced with mock data
  const displayProduct = { ...mockProduct, ...product };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/plant-types" className="hover:text-gray-700">Plant Types</Link>
          <span>/</span>
          {plantPart && (
            <>
              <Link to={`/plant-type/${plantPart.plant_type_id}`} className="hover:text-gray-700">
                Plant Type
              </Link>
              <span>/</span>
              <Link to={`/plant-part/${plantPart.id}`} className="hover:text-gray-700">
                {plantPart.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 font-medium">{displayProduct.name}</span>
        </div>

        {/* Product Overview */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            {/* Product image */}
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
              <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
            </div>
            
            {/* Product info */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayProduct.name}</h1>
              
              <div className="mb-4 flex items-center">
                <div className="bg-green-100 text-green-800 text-xs font-medium rounded px-2.5 py-0.5 mr-2">
                  {plantPart ? plantPart.name : "Hemp Product"}
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium rounded px-2.5 py-0.5">
                  Industry Name
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{displayProduct.description}</p>
              
              <div className="mb-6">
                <h2 className="font-medium text-gray-900 mb-2">Sustainability Score</h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(displayProduct.sustainability_score / 10) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="font-medium text-gray-900 mb-2">Key Benefits</h2>
                <ul className="space-y-1">
                  {displayProduct.benefits && displayProduct.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="font-medium text-gray-900 mb-2">Common Uses</h2>
                <div className="flex flex-wrap gap-2">
                  {displayProduct.uses && displayProduct.uses.map((use, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <InfoIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">Market Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Market Status</h3>
                  <p className="font-medium">{displayProduct.market_status}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Major Production Regions</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {displayProduct.production_regions.map((region, idx) => (
                      <li key={idx}>{region}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Key Manufacturers</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {displayProduct.key_manufacturers.map((manufacturer, idx) => (
                      <li key={idx}>{manufacturer}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <InfoIcon className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">Industry Outlook</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Challenges</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {displayProduct.industry_challenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Opportunities</h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {displayProduct.industry_opportunities.map((opportunity, idx) => (
                      <li key={idx}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products section placeholder */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                  <h3 className="font-bold mb-2">Related Hemp Product {i}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Another innovative hemp-based product with various applications.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/product/${i + 5}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}