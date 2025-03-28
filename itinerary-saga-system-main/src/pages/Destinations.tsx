
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, MapPin } from "lucide-react";

const Destinations = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const popularDestinations = [
    {
      id: "tokyo",
      name: "Tokyo, Japan",
      description: "Experience the perfect blend of tradition and innovation in Japan's bustling capital.",
      image: "/placeholder.svg",
      tags: ["Urban", "Culture", "Food"],
      coordinates: [139.6503, 35.6762] as [number, number]
    },
    {
      id: "paris",
      name: "Paris, France",
      description: "The city of lights, romance, and unparalleled gastronomy awaits your discovery.",
      image: "/placeholder.svg",
      tags: ["Romantic", "Historic", "Art"],
      coordinates: [2.3522, 48.8566] as [number, number]
    },
    {
      id: "santorini",
      name: "Santorini, Greece",
      description: "Stunning sunsets and beautiful white and blue architecture on this magical Greek island.",
      image: "/placeholder.svg",
      tags: ["Island", "Scenic", "Relaxation"],
      coordinates: [25.3963, 36.3932] as [number, number]
    },
    {
      id: "nyc",
      name: "New York, USA",
      description: "The city that never sleeps offers endless entertainment, culture, and excitement.",
      image: "/placeholder.svg",
      tags: ["Urban", "Entertainment", "Shopping"],
      coordinates: [-74.0060, 40.7128] as [number, number]
    },
    {
      id: "bali",
      name: "Bali, Indonesia",
      description: "A tropical paradise with rich cultural experiences and beautiful natural scenery.",
      image: "/placeholder.svg",
      tags: ["Beach", "Nature", "Culture"],
      coordinates: [115.1889, -8.4095] as [number, number]
    },
    {
      id: "rome",
      name: "Rome, Italy",
      description: "Ancient history meets world-class cuisine in the eternal city.",
      image: "/placeholder.svg",
      tags: ["Historic", "Food", "Architecture"],
      coordinates: [12.4964, 41.9028] as [number, number]
    }
  ];

  const toggleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(fav => fav !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-medium mb-4">Discover Dream Destinations</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our curated collection of stunning destinations around the world and start planning your next adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(destination.name)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(destination.name) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-travel-blue mr-1" />
                    <h3 className="font-medium">{destination.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{destination.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-slate-100 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/plan-adventure?destination=${encodeURIComponent(destination.name)}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-travel-blue group-hover:text-white transition-colors"
                    >
                      Plan Trip
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Destinations;
