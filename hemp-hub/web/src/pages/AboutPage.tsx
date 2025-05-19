import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Check, Heart, Leaf, Globe, BarChart3, Shield } from "lucide-react";

export function AboutPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Hemp Resource Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for exploring the versatile applications and research on industrial hemp, 
            promoting sustainable solutions and innovation.
          </p>
        </div>
        
        {/* Mission section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Hemp Resource Hub is dedicated to showcasing the incredible versatility and potential of industrial hemp. 
                We aim to be a comprehensive, educational platform that connects curious minds with reliable information 
                about hemp applications across industries.
              </p>
              <p className="text-gray-600 mb-6">
                By highlighting sustainable solutions and innovative uses of hemp, we hope to contribute to a future where 
                this remarkable plant plays a significant role in addressing environmental challenges while driving economic 
                growth and well-being.
              </p>
              <Button asChild>
                <Link to="/plant-types">Explore Hemp Applications</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-20 w-20 text-green-500 opacity-50" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Key benefits section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Benefits of Hemp</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Environmentally Friendly</h3>
                <p className="text-gray-600">
                  Hemp requires minimal water, no pesticides, and enriches the soil. It's carbon-negative, 
                  absorbing more CO2 than it produces during its lifecycle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Versatile Applications</h3>
                <p className="text-gray-600">
                  From textiles and construction materials to food, medicine, and biofuels, hemp offers thousands 
                  of different applications with new innovations emerging regularly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Health Benefits</h3>
                <p className="text-gray-600">
                  Hemp seeds are a nutritional powerhouse, rich in protein, essential fatty acids, and minerals. 
                  Various hemp extracts are being studied for their therapeutic properties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Why we built this section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Why We Built This Resource</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Despite its incredible potential, hemp remains misunderstood and underutilized. We created the Hemp Resource Hub 
            to bridge the knowledge gap and accelerate adoption of this sustainable plant.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600">
                  We provide accurate, research-based information about industrial hemp and its applications, 
                  helping to dispel myths and misconceptions.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  By showcasing cutting-edge applications and research, we hope to inspire new ideas 
                  and innovations in hemp technology.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We believe that hemp can play a vital role in creating a more sustainable future, 
                  addressing challenges from climate change to resource depletion.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Connection</h3>
                <p className="text-gray-600">
                  Our platform helps connect researchers, entrepreneurs, farmers, and consumers 
                  interested in the hemp industry and its products.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="bg-green-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Hemp's Potential?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Dive into our comprehensive database of hemp applications, discover innovative products, 
            and stay updated with the latest research.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/plant-types">Explore Plant Types</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white hover:bg-white hover:text-green-600">
              <Link to="/research">View Research</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}