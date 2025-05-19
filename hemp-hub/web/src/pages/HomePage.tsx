import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Hemp Resource Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore the versatile applications of industrial hemp across industries, plant parts, and product categories with our comprehensive interactive database.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/plant-types">Explore Plant Types</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/research">View Research</Link>
          </Button>
        </div>
      </section>

      {/* Plant Types Preview */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Plant Types</h2>
          <p className="text-gray-600 mt-2">Discover different hemp plant varieties and their unique properties</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Cannabis Sativa</CardTitle>
              <CardDescription>Industrial hemp variety known for fiber production</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Plant Image</span>
              </div>
              <p className="text-gray-600">Known for its tall, thin structure and narrow leaves. Primarily grown for industrial uses.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/plant-type/1">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cannabis Indica</CardTitle>
              <CardDescription>Variety known for therapeutic properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Plant Image</span>
              </div>
              <p className="text-gray-600">Distinguished by its shorter, bushier structure and broader leaves. Often used for medicinal applications.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/plant-type/2">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hemp Hybrids</CardTitle>
              <CardDescription>Modern crossbred varieties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Plant Image</span>
              </div>
              <p className="text-gray-600">Specially bred hemp varieties that combine desired traits for specific applications and growing conditions.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/plant-type/3">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Research Papers Preview */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Research</h2>
          <p className="text-gray-600 mt-2">Stay updated with the newest findings in hemp research</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Sustainable Hemp Farming Practices</CardTitle>
              <CardDescription>Published Jan 15, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">A study on environmental impacts of hemp cultivation methods and sustainable farming practices.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/research/1">Read More</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Analysis of Hemp Seeds</CardTitle>
              <CardDescription>Published Feb 20, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Comprehensive analysis of nutritional components in hemp seeds and their health benefits.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/research/2">Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}