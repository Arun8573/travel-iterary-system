
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Destination {
  name: string;
  description: string;
  image: string;
  tags: string[];
}

interface DestinationCardProps {
  destination: Destination;
  onSelect: () => void;
}

const DestinationCard = ({ destination, onSelect }: DestinationCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden border bg-card hover:shadow-md transition-all duration-300 group">
      <div className="h-44 overflow-hidden relative">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex gap-1">
            {destination.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-white border-white/50 bg-black/20 backdrop-blur-sm text-[10px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{destination.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSelect}
          className="w-full group-hover:bg-travel-blue group-hover:text-white transition-colors"
        >
          Select Destination
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;
