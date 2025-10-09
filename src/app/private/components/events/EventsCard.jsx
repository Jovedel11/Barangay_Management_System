const EventsCard = ({ event }) => {
  return (
    <Card
      className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 cursor-pointer"
      onClick={() => {}}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <event.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {event.title}
                </h3>
                <div className="flex gap-2 ml-4">
                  <Badge className={categoryBadge.className}>
                    {categoryBadge.label}
                  </Badge>
                  <Badge className={statusBadge.className}>
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {new Date(event.date).toLocaleDateString()}
                {event.endDate &&
                  ` - ${new Date(event.endDate).toLocaleDateString()}`}
              </p>
              <p className="text-muted-foreground">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <div>
              <p className="font-medium text-foreground">{event.venue}</p>
              <p className="text-muted-foreground">Venue</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-success shrink-0" />
            <div>
              <p className="font-medium text-foreground">{event.organizer}</p>
              <p className="text-muted-foreground">Organizer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-warning shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {event.participants}
              </p>
              <p className="text-muted-foreground">Participants</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>Contact: {event.contact}</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Eye className="h-3 w-3 mr-1" />
              View Details
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
            {event.status === "upcoming" && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Register
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
