
import React from 'react';
import { 
  Heart, Utensils, Globe, Hotel, Plane, Bus, Sun, Coffee, Compass 
} from 'lucide-react';

interface TravelTimelineProps {
  activities: string[];
}

const TravelTimeline = ({ activities }: TravelTimelineProps) => {
  // Get appropriate icon based on activity text
  const getActivityIcon = (activity: string) => {
    if (activity.toLowerCase().includes("museum")) {
      return <Heart className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("food") || activity.toLowerCase().includes("cuisine")) {
      return <Utensils className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("tour") || activity.toLowerCase().includes("walk")) {
      return <Globe className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("hotel") || activity.toLowerCase().includes("stay")) {
      return <Hotel className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("flight") || activity.toLowerCase().includes("air")) {
      return <Plane className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("bus") || activity.toLowerCase().includes("train")) {
      return <Bus className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("beach") || activity.toLowerCase().includes("relax")) {
      return <Sun className="h-4 w-4 text-travel-blue" />;
    } else if (activity.toLowerCase().includes("coffee") || activity.toLowerCase().includes("cafe")) {
      return <Coffee className="h-4 w-4 text-travel-blue" />;
    } else {
      return <Compass className="h-4 w-4 text-travel-blue" />;
    }
  };

  return (
    <div className="relative pl-6">
      <div className="absolute top-0 bottom-0 left-2 w-0.5 bg-travel-blue/30"></div>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="relative">
            <div className="absolute -left-6 top-0 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-travel-blue">
              {getActivityIcon(activity)}
            </div>
            <div className="ml-2 pb-2">
              <div className="font-medium">{`Day ${index + 1}`}</div>
              <div className="text-muted-foreground text-sm">{activity}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelTimeline;
