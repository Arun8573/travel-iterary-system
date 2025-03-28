import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, MapPin, Calendar, Navigation, MoreHorizontal } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-blue" />
        </div>
      </Layout>
    );
  }
  
  // Mock data for trips with Indian destinations
  const upcomingTrips = [
    {
      id: 1,
      destination: "Jaipur, Rajasthan",
      dates: "Nov 15 - Nov 23, 2023",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      daysLeft: 25,
    },
    {
      id: 2,
      destination: "Goa, India",
      dates: "Dec 10 - Dec 20, 2023",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      daysLeft: 50,
    },
  ];
  
  const pastTrips = [
    {
      id: 3,
      destination: "Varanasi, Uttar Pradesh",
      dates: "Mar 10 - Mar 22, 2023",
      image: "https://images.unsplash.com/photo-1561361058-c12e08933e75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
  ];
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-medium mb-2">Welcome back, {user?.name?.split(' ')[0] || "Traveler"}</h2>
            <p className="text-muted-foreground">Here's an overview of your travel plans</p>
          </div>
          
          <Button className="btn-transition">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </div>
        
        {/* Upcoming Trips */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-medium">Upcoming Trips</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/trips">View all</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map(trip => (
              <Card key={trip.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-medium text-lg">{trip.destination}</h4>
                    <div className="flex items-center text-white/80 text-sm mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-travel-blue text-white text-xs px-2 py-1 rounded-full">
                      {trip.daysLeft} days left
                    </span>
                  </div>
                </div>
                <CardContent className="pt-4 pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>7 days</span>
                    <span className="mx-1.5">•</span>
                    <MapPin className="h-4 w-4 mr-1.5" />
                    <span>8 places</span>
                  </div>
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-travel-blue/10 flex items-center justify-center text-travel-blue mx-auto mb-4">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Plan a new adventure</h4>
                <p className="text-sm text-muted-foreground mb-4">Create a new trip to start planning your next journey</p>
                <Button size="sm">Create Trip</Button>
              </div>
            </Card>
          </div>
        </section>
        
        {/* Past Trips */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-medium">Past Trips</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/trips?filter=past">View all</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastTrips.map(trip => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-36 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-medium">{trip.destination}</h4>
                    <div className="flex items-center text-white/80 text-xs mt-0.5">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                </div>
                <CardFooter className="px-3 py-2 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
