
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, Calendar, Map, Compass, Settings, LogOut, User, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Mock authentication state (to be replaced with real auth context)
  const isAuthenticated = false;

  useEffect(() => {
    setMounted(true);
    
    // Close sidebar on route change (mobile)
    onClose();
  }, [location.pathname, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-sidebar sidebar:bg-sidebar border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between py-2 mb-6">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <span className="text-xl font-serif font-medium">Voyage</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {isAuthenticated ? (
            <>
              {/* User profile summary */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-travel-blue/20 flex items-center justify-center text-travel-blue">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Travel Enthusiast</p>
                  <p className="text-sm text-muted-foreground">user@example.com</p>
                </div>
              </div>
              
              {/* Create new trip button */}
              <Button className="mb-6 btn-transition" size="sm" asChild>
                <Link to="/plan-adventure">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Trip
                </Link>
              </Button>
              
              <Separator className="mb-6" />
              
              {/* Main navigation */}
              <nav className="space-y-1 mb-6">
                <SidebarLink to="/dashboard" icon={<Home className="h-5 w-5" />}>
                  Dashboard
                </SidebarLink>
                <SidebarLink to="/trips" icon={<Calendar className="h-5 w-5" />}>
                  My Trips
                </SidebarLink>
                <SidebarLink to="/destinations" icon={<Map className="h-5 w-5" />}>
                  Destinations
                </SidebarLink>
                <SidebarLink to="/plan-adventure" icon={<Compass className="h-5 w-5" />}>
                  Plan Adventure
                </SidebarLink>
              </nav>
              
              <Separator className="mb-6" />
              
              {/* Secondary navigation */}
              <nav className="space-y-1 mb-6">
                <SidebarLink to="/profile" icon={<User className="h-5 w-5" />}>
                  Profile
                </SidebarLink>
                <SidebarLink to="/settings" icon={<Settings className="h-5 w-5" />}>
                  Settings
                </SidebarLink>
              </nav>
              
              <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Guest navigation */}
              <nav className="space-y-1 mb-6">
                <SidebarLink to="/" icon={<Home className="h-5 w-5" />}>
                  Home
                </SidebarLink>
                <SidebarLink to="/destinations" icon={<Map className="h-5 w-5" />}>
                  Destinations
                </SidebarLink>
                <SidebarLink to="/plan-adventure" icon={<Compass className="h-5 w-5" />}>
                  Plan Adventure
                </SidebarLink>
              </nav>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full btn-transition" 
                  asChild
                >
                  <Link to="/login" onClick={onClose}>Login</Link>
                </Button>
                <Button 
                  className="w-full btn-transition"
                  asChild
                >
                  <Link to="/register" onClick={onClose}>Register</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ 
  to, 
  icon, 
  children 
}: { 
  to: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200 ${
        isActive 
          ? "bg-travel-blue/10 text-travel-blue" 
          : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      <span>{children}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-travel-blue" />
      )}
    </Link>
  );
};

export default Sidebar;
