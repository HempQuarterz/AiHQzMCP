import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePlantType, usePlantParts } from "../hooks/use-plant-data";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";

export function PlantTypeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plantTypeId = id ? parseInt(id) : null;
  const { data: plantType, isLoading: isLoadingPlantType, error: plantTypeError } = usePlantType(plantTypeId);
  const { data: plantParts, isLoading: isLoadingParts } = usePlantParts(plantTypeId);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [plantTypeId]);

  // Loading state
  if (isLoadingPlantType || isLoadingParts) {
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
  if (plantTypeError || !plantType) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Plant Type Not Found</h1>
            <p className="text-gray-600 mb-6">The requested plant type could not be found.</p>
            <Button onClick={() => navigate('/')}>Return to Homepage</Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock plant parts if none are returned from the API
  const displayPlantParts = plantParts?.length ? plantParts : [
    {
      id: 1,
      name: "Flowers",
      description: "The reproductive structures of the plant, often called buds.",
      image_url: "/images/flowers.jpg",
      plant_type_id: plantTypeId
    },
    {
      id: 2,
      name: "Seeds",
      description: "The reproductive part that contains the embryo.",
      image_url: "/images/seeds.jpg",
      plant_type_id: plantTypeId
    },
    {
      id: 3,
      name: "Stalks",
      description: "The main stem of the plant that supports the foliage.",
      image_url: "/images/stalks.jpg",
      plant_type_id: plantTypeId
    },
    {
      id: 4,
      name: "Leaves",
      description: "The primary photosynthetic organs of the plant.",
      image_url: "/images/leaves.jpg",
      plant_type_id: plantTypeId
    }
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
          <span className="text-gray-900 font-medium">{plantType.name}</span>
        </div>

        {/* Plant Type Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Plant Image</span>
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{plantType.name}</h1>
              <p className="text-gray-600 mb-6">{plantType.description}</p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      This plant type has {displayPlantParts.length} different parts that can be used for various applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plant Parts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plant Parts</h2>
          <p className="text-gray-600 mb-8">
            {plantType.name} has several distinct parts, each with unique properties and applications
            across various industries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPlantParts.map((part) => (
              <Card key={part.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{part.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Part Image</span>
                  </div>
                  <p className="text-gray-600">{part.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/plant-part/${part.id}`}>View Applications</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}