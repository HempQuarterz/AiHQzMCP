import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page
    console.log("Search query:", searchQuery);
    // In a real app, we would redirect to a search results page
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 bg-black">
        <div className="flex justify-between items-center h-28">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="/images/hemp-logo.png" 
                alt="Hemp Hub Logo" 
                className="h-24 w-24 cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </Link>
          </div>
          
          {/* Navigation menu in the center */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center">
            <div className="flex flex-col items-center">
              {/* Top row */}
              <div className="flex space-x-6 mb-2 items-center">
                <Link to="/">
                  <div className={`${location.pathname === '/' ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    Home
                  </div>
                </Link>
                <Link to="/about">
                  <div className={`${location.pathname === '/about' ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    About
                  </div>
                </Link>
                <Link to="/plant-types">
                  <div className={`${location.pathname === '/plant-types' ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    Plant Types
                  </div>
                </Link>
              </div>
              
              {/* Bottom row */}
              <div className="flex space-x-6 items-center">
                <Link to="/plant-parts">
                  <div className={`${location.pathname.startsWith('/plant-part') ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    Parts of Plant
                  </div>
                </Link>
                <Link to="/industries">
                  <div className={`${location.pathname === '/industries' ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    Industries
                  </div>
                </Link>
                <Link to="/research">
                  <div className={`${location.pathname.startsWith('/research') ? 'border-green-500 text-green-500' : 'border-transparent text-white hover:text-green-500 hover:border-green-500'} border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer`}>
                    Research
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Search on the right */}
          <div className="hidden sm:flex sm:items-center sm:pr-2">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-36 rounded-full px-4 py-2 border border-neutral-light focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-500 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black">
                <SheetHeader>
                  <SheetTitle className="text-white">Hemp Hub Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <Link to="/">
                      <img 
                        src="/images/hemp-logo.png" 
                        alt="Hemp Hub Logo" 
                        className="h-24 w-24 cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </Link>
                  </div>
                  
                  <div className="mt-6">
                    <form onSubmit={handleSearch} className="mb-6">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search..."
                          className="w-full rounded-full px-4 py-2 border border-neutral-light focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button 
                          type="submit" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <Search className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    </form>
                    
                    <nav className="flex flex-col space-y-4">
                      <Link to="/">
                        <div className={`${location.pathname === '/' ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          Home
                        </div>
                      </Link>
                      <Link to="/about">
                        <div className={`${location.pathname === '/about' ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          About
                        </div>
                      </Link>
                      <Link to="/plant-types">
                        <div className={`${location.pathname === '/plant-types' ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          Plant Types
                        </div>
                      </Link>
                      <Link to="/plant-parts">
                        <div className={`${location.pathname.startsWith('/plant-part') ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          Parts of Plant
                        </div>
                      </Link>
                      <Link to="/industries">
                        <div className={`${location.pathname === '/industries' ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          Industries
                        </div>
                      </Link>
                      <Link to="/research">
                        <div className={`${location.pathname.startsWith('/research') ? 'text-green-500 font-medium' : 'text-white'} hover:text-green-500 px-3 py-2 text-xl cursor-pointer`}>
                          Research
                        </div>
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;