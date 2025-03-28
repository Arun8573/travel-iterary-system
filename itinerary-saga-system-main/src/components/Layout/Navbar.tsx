
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, Search, Globe, X, Map, Compass, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock authentication state (to be replaced with real auth context)
  const isAuthenticated = false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" 
          : location.pathname === "/" 
            ? "bg-transparent" 
            : "bg-white dark:bg-slate-900"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="focus:outline-none"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-serif font-medium">
                Voyage
              </span>
            </Link>
          </div>

          {/* Center section - Desktop navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/destinations">Destinations</NavLink>
              <NavLink to="/plan-adventure">Plan Adventure</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </nav>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-1 md:space-x-3">
            {isSearchOpen ? (
              <div className="flex items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="border-b bg-transparent border-slate-300 dark:border-slate-700 px-2 py-1 focus:outline-none focus:border-travel-blue"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="btn-transition">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`relative py-1 font-medium transition-colors duration-200 hover:text-travel-blue ${
        isActive ? "text-travel-blue" : "text-slate-700 dark:text-slate-200"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-travel-blue rounded animate-fade-in" />
      )}
    </Link>
  );
};

export default Navbar;
