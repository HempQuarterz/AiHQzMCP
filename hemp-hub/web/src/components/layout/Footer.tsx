import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Hemp Hub</h3>
            <p className="text-gray-300 mb-6">
              A comprehensive database of industrial hemp applications across industries, showcasing the versatility and potential of this remarkable plant.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">Home</div>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">About Hemp</div>
                </Link>
              </li>
              <li>
                <Link to="/plant-types">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">Plant Types</div>
                </Link>
              </li>
              <li>
                <Link to="/plant-parts">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">Parts of Plant</div>
                </Link>
              </li>
              <li>
                <Link to="/industries">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">Industries</div>
                </Link>
              </li>
              <li>
                <Link to="/research">
                  <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">Research</div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Join our newsletter to receive updates on new hemp applications and industry developments.
            </p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow min-w-0 bg-black text-white px-4 py-2 rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from Hemp Hub.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} Hemp Hub. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link to="/privacy">
              <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
            </Link>
            <Link to="/terms">
              <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</div>
            </Link>
            <Link to="/contact">
              <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;