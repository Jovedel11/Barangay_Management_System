import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import {
  Star,
  Calendar,
  MapPin,
  Eye,
  Trophy,
  Heart,
  Music,
  Users,
  Crown,
  PartyPopper,
  Dumbbell,
} from "lucide-react";
import ViewEventSheet from "./ViewEventSheet";

const getCategoryIcon = (category) => {
  const iconMap = {
    "Sports Athletic": Dumbbell,
    "Beauty Pageants": Crown,
    Entertainment: Music,
    Competitions: Trophy,
    "Community Events": Users,
    "Fiesta & Celebration": PartyPopper,
  };

  return iconMap[category] || Star;
};

const FeaturedEvent = () => {
  const { data, isLoading: eventsLoading } = useQuery({
    queryKey: ["featured-events"],
    queryFn: () =>
      customRequest({
        path: "/api/brgy-events/featured/retrieve",
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const featuredEvents = Array.isArray(data?.response) ? data.response : [];

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Star className="h-5 w-5 text-accent" />
          Featured Events
        </CardTitle>
        <CardDescription>
          Don't miss these major barangay events and celebrations
        </CardDescription>
      </CardHeader>

      <CardContent>
        {eventsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">
              Loading featured events...
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featuredEvents.map((event) => {
              const Icon = getCategoryIcon(event.category);

              return (
                <Card
                  key={event._id}
                  className="border border-border hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer"
                  onClick={() => {}}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/30 text-xs">
                        {event.status === "ongoing" ? "Ongoing" : "Featured"}
                      </Badge>
                    </div>

                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {event.eventTitle}
                    </h4>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(event.startDate).toLocaleDateString()} -{" "}
                        {new Date(event.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        {event.venue}
                      </div>
                    </div>
                    <ViewEventSheet selectedEvent={event}>
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </ViewEventSheet>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedEvent;
