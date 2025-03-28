
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, Calendar as CalendarIcon, User, Plus, Plane, Hotel, 
  Utensils, Bus, Heart, Compass, Palmtree, Sun, Camera, Coffee,
  Bookmark, BriefcaseBusiness, Globe, PartyPopper, Luggage
} from "lucide-react";
import { format } from "date-fns";
import DestinationCard from "@/components/travel/DestinationCard";
import TravelTimeline from "@/components/travel/TravelTimeline";

const PlanAdventure = () => {
  const [searchParams] = useSearchParams();
  const preselectedDestination = searchParams.get("destination") || "";
  
  const [destination, setDestination] = useState(preselectedDestination);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("medium");
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState("");
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [inspirationMode, setInspirationMode] = useState(false);

  // List of popular destinations
  const popularDestinations = [
    { 
      name: "Tokyo, Japan", 
      description: "Experience the perfect blend of tradition and innovation",
      image: "/placeholder.svg",
      tags: ["culture", "food", "urban"]
    },
    { 
      name: "Paris, France", 
      description: "The city of lights, romance, and gastronomy",
      image: "/placeholder.svg",
      tags: ["romantic", "history", "food"] 
    },
    { 
      name: "Santorini, Greece", 
      description: "Stunning views and beautiful white and blue architecture",
      image: "/placeholder.svg",
      tags: ["beach", "romantic", "scenic"] 
    },
    { 
      name: "Bali, Indonesia", 
      description: "Tropical paradise with rich cultural experiences",
      image: "/placeholder.svg",
      tags: ["beach", "nature", "culture"] 
    },
    { 
      name: "New York, USA", 
      description: "The city that never sleeps - endless entertainment",
      image: "/placeholder.svg",
      tags: ["urban", "shopping", "entertainment"] 
    },
    { 
      name: "Rome, Italy", 
      description: "Ancient history and world-class cuisine",
      image: "/placeholder.svg",
      tags: ["history", "food", "culture"] 
    }
  ];
  
  // Handle adding new activity
  const handleAddActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity("");
    }
  };
  
  // Handle removing activity
  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  // Handle selecting a destination from inspiration cards
  const handleSelectDestination = (destination: string) => {
    setDestination(destination);
    setInspirationMode(false);
  };

  // Sample trip ideas based on the selected destination
  const getTripIdeas = () => {
    const ideas: Record<string, string[]> = {
      "Tokyo, Japan": [
        "Visit the Tokyo Skytree for panoramic views",
        "Experience traditional tea ceremony in Ueno Park",
        "Explore the quirky shops in Harajuku",
        "Try authentic ramen at a local restaurant"
      ],
      "Paris, France": [
        "Take a sunset cruise on the Seine River",
        "Visit the Louvre Museum to see the Mona Lisa",
        "Enjoy a picnic by the Eiffel Tower",
        "Explore the charming Montmartre neighborhood"
      ],
      "Santorini, Greece": [
        "Watch the sunset in Oia village",
        "Take a catamaran cruise around the caldera",
        "Visit the ancient ruins of Akrotiri",
        "Wine tasting at local vineyards"
      ],
      "Bali, Indonesia": [
        "Visit the sacred monkey forest sanctuary",
        "Take a yoga class overlooking rice terraces",
        "Watch traditional Balinese dance performances",
        "Surf lesson at Kuta Beach"
      ],
      "New York, USA": [
        "Walk across the Brooklyn Bridge at sunset",
        "Explore Central Park by bike",
        "See a Broadway show",
        "Visit the Metropolitan Museum of Art"
      ],
      "Rome, Italy": [
        "Tour the ancient Colosseum",
        "Throw a coin in the Trevi Fountain",
        "Take a cooking class to learn pasta making",
        "Visit the Vatican Museums and Sistine Chapel"
      ]
    };
    
    return destination && ideas[destination] ? ideas[destination] : [];
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-4xl font-medium mb-4">Plan Your Adventure</h1>
          <p className="text-muted-foreground max-w-2xl">
            Create a personalized travel itinerary for your next trip with our interactive planner.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details">Trip Details</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            
            {/* Trip Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {!inspirationMode ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Destination</label>
                          <div className="relative">
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  value={destination}
                                  onChange={(e) => setDestination(e.target.value)}
                                  placeholder="Where are you going?"
                                  className="pl-10"
                                />
                              </div>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setInspirationMode(true)}
                                className="whitespace-nowrap"
                              >
                                <Palmtree className="h-4 w-4 mr-2" />
                                Need inspiration?
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Travel Dates</label>
                          <div className="flex space-x-4">
                            <div className="flex-1">
                              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : "Start date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => {
                                      setStartDate(date);
                                      if (date && endDate && date > endDate) {
                                        setEndDate(undefined);
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div className="flex-1">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    disabled={!startDate}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : "End date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    disabled={(date) => (startDate ? date < startDate : false)}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Travelers</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Select value={travelers} onValueChange={setTravelers}>
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Number of travelers" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 traveler</SelectItem>
                                  <SelectItem value="2">2 travelers</SelectItem>
                                  <SelectItem value="3">3 travelers</SelectItem>
                                  <SelectItem value="4">4 travelers</SelectItem>
                                  <SelectItem value="5+">5+ travelers</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Budget</label>
                            <Select value={budget} onValueChange={setBudget}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="economy">Economy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="luxury">Luxury</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Trip Notes</label>
                          <Textarea 
                            placeholder="Any special requirements or notes for your trip..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        {destination && (
                          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <Bookmark className="h-4 w-4 text-travel-blue" />
                              Trip Ideas for {destination}
                            </h4>
                            <div className="space-y-2">
                              {getTripIdeas().length > 0 ? (
                                getTripIdeas().map((idea, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-auto py-1 px-2 text-left justify-start"
                                      onClick={() => {
                                        if (!activities.includes(idea)) {
                                          setActivities([...activities, idea]);
                                        }
                                      }}
                                    >
                                      <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                                      <span className="text-sm">{idea}</span>
                                    </Button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  Enter a popular destination to see trip ideas
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Find Inspiration</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setInspirationMode(false)}
                          >
                            Back to Details
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {popularDestinations.map((dest, index) => (
                            <DestinationCard
                              key={index}
                              destination={dest}
                              onSelect={() => handleSelectDestination(dest.name)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {!inspirationMode && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={() => setActiveTab("activities")} className="btn-transition">
                        Next: Plan Activities
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activities Tab */}
            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Activities to Your Itinerary</h3>
                      
                      <div className="flex space-x-2">
                        <Input
                          value={newActivity}
                          onChange={(e) => setNewActivity(e.target.value)}
                          placeholder="Enter an activity (e.g., Visit Eiffel Tower)"
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddActivity();
                            }
                          }}
                        />
                        <Button onClick={handleAddActivity}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Visit local museums")) {
                              setActivities([...activities, "Visit local museums"]);
                            }
                          }}
                        >
                          <BriefcaseBusiness className="h-4 w-4 mr-2 text-amber-500" />
                          Cultural
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Try local cuisine")) {
                              setActivities([...activities, "Try local cuisine"]);
                            }
                          }}
                        >
                          <Utensils className="h-4 w-4 mr-2 text-red-500" />
                          Food & Dining
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Take a guided tour")) {
                              setActivities([...activities, "Take a guided tour"]);
                            }
                          }}
                        >
                          <Globe className="h-4 w-4 mr-2 text-blue-500" />
                          Tours
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Relax at the beach")) {
                              setActivities([...activities, "Relax at the beach"]);
                            }
                          }}
                        >
                          <Palmtree className="h-4 w-4 mr-2 text-green-500" />
                          Relaxation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Attend local festival")) {
                              setActivities([...activities, "Attend local festival"]);
                            }
                          }}
                        >
                          <PartyPopper className="h-4 w-4 mr-2 text-purple-500" />
                          Entertainment
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => {
                            if (!activities.includes("Photography spots")) {
                              setActivities([...activities, "Photography spots"]);
                            }
                          }}
                        >
                          <Camera className="h-4 w-4 mr-2 text-indigo-500" />
                          Photography
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Your Activities</h4>
                      {activities.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-lg">
                          <Luggage className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                          <p className="text-muted-foreground text-sm">No activities added yet. Add some activities to build your itinerary.</p>
                          <Button variant="outline" size="sm" className="mt-4" onClick={() => setNewActivity("Explore local attractions")}>
                            Add a suggested activity
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {activities.map((activity, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                            >
                              <div className="flex items-center">
                                {activity.toLowerCase().includes("museum") ? (
                                  <Heart className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("food") || activity.toLowerCase().includes("cuisine") ? (
                                  <Utensils className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("tour") || activity.toLowerCase().includes("walk") ? (
                                  <Globe className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("hotel") || activity.toLowerCase().includes("stay") ? (
                                  <Hotel className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("flight") || activity.toLowerCase().includes("air") ? (
                                  <Plane className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("bus") || activity.toLowerCase().includes("train") ? (
                                  <Bus className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("beach") || activity.toLowerCase().includes("relax") ? (
                                  <Sun className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : activity.toLowerCase().includes("coffee") || activity.toLowerCase().includes("cafe") ? (
                                  <Coffee className="h-4 w-4 mr-2 text-travel-blue" />
                                ) : (
                                  <Compass className="h-4 w-4 mr-2 text-travel-blue" />
                                )}
                                <span>{activity}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveActivity(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      Back to Details
                    </Button>
                    <Button onClick={() => setActiveTab("summary")} className="btn-transition">
                      Review Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-6">Trip Summary</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Destination</h4>
                          <p className="text-lg font-medium">{destination || "Not specified"}</p>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Travel Dates</h4>
                          <p className="text-lg font-medium">
                            {startDate && endDate 
                              ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}` 
                              : "Dates not selected"}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Travelers</h4>
                            <p className="text-lg font-medium">{travelers === "5+" ? "5+" : travelers}</p>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Budget</h4>
                            <p className="text-lg font-medium capitalize">{budget}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg h-full">
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Planned Activities</h4>
                          {activities.length === 0 ? (
                            <p className="text-muted-foreground italic">No activities planned yet</p>
                          ) : (
                            <TravelTimeline activities={activities} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-6 bg-travel-blue/10 rounded-lg text-center">
                      <h4 className="text-xl font-medium mb-3">Ready to finalize your adventure?</h4>
                      <p className="text-muted-foreground mb-4">
                        Save your trip plan and start preparing for an amazing journey!
                      </p>
                      <Button size="lg" className="bg-travel-blue hover:bg-travel-blue/90 btn-transition">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save Trip Plan
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-start">
                    <Button variant="outline" onClick={() => setActiveTab("activities")}>
                      Back to Activities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PlanAdventure;
