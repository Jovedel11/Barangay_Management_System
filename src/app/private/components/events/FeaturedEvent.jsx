import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";

const FeaturedEvent = () => {
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
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="border border-border hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer"
                onClick={() => handleViewDetails(event)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <event.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/30 text-xs">
                      Featured
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {event.title}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      {event.venue}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
