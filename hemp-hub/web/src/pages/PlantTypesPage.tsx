import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { usePlantTypes } from '../hooks/use-plant-data';

export function PlantTypesPage() {
  const { data: plantTypes, isLoading, error } = usePlantTypes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div>
            <p className="text-red-700">Error loading plant types. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const mockPlantTypes = [
    {
      id: 1,
      name: 'Cannabis Sativa',
      description: 'A species of the Cannabis genus known for its tall, thin structure and narrow leaves.',
      image_url: '/images/cannabis-sativa.jpg'
    },
    {
      id: 2,
      name: 'Cannabis Indica',
      description: 'A species of the Cannabis genus known for its shorter, bushier structure and broader leaves.',
      image_url: '/images/cannabis-indica.jpg'
    },
    {
      id: 3,
      name: 'Hemp Hybrids',
      description: 'Modern crossbred varieties that combine traits from different hemp species.',
      image_url: '/images/hemp-hybrid.jpg'
    }
  ];

  // Use actual data if available, otherwise use mock data
  const displayPlantTypes = plantTypes?.length ? plantTypes : mockPlantTypes;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hemp Plant Types</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the different varieties of hemp plants, their characteristics, 
          and specific applications in various industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPlantTypes.map((plantType) => (
          <Card key={plantType.id}>
            <CardHeader>
              <CardTitle>{plantType.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Plant Image</span>
              </div>
              <p className="text-gray-600">{plantType.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/plant-type/${plantType.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}