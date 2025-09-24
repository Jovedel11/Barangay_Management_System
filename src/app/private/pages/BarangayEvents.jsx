import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Star,
  Heart,
  Music,
  User,
  Eye,
  Bell,
  Filter,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import {
  IconBallBasketball,
  IconPlayFootball,
  IconMicrophone,
  IconCrown,
  IconGift,
  IconChefHat,
  IconMusic,
  IconHeart,
  IconRun,
  IconSwimming,
  IconTrophy,
  IconCalendarEvent,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Separator } from "@/core/components/ui/separator";

export default function BarangayEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Mock user profile data
  const userProfile = {
    name: "Juan Dela Cruz",
    age: 35,
    gender: "male",
    isSenior: false,
    address: "123 Main St, Barangay Kaypian",
  };

  // Authentic Filipino Barangay Events
  const barangayEvents = [
    {
      id: 1,
      title: "Liga ng mga Barangay Basketball Tournament",
      category: "sports",
      description:
        "Annual inter-barangay basketball championship featuring teams from all sitios",
      date: "2024-02-15",
      endDate: "2024-02-25",
      time: "6:00 PM - 10:00 PM",
      venue: "Barangay Basketball Court",
      organizer: "Barangay Sports Committee",
      contact: "Kagawad Pedro Santos",
      phone: "09123456789",
      icon: IconBallBasketball,
      status: "upcoming",
      participants: "16 teams",
      prizes: "₱15,000 Champion, ₱10,000 1st Runner-up, ₱5,000 2nd Runner-up",
      requirements: "Team registration required",
      image: "/images/basketball-tournament.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Miss Barangay Kaypian 2024",
      category: "pageant",
      description:
        "Annual beauty pageant showcasing the grace and talent of our barangay ladies",
      date: "2024-03-08",
      time: "7:00 PM - 11:00 PM",
      venue: "Barangay Covered Court",
      organizer: "Barangay Women's Committee",
      contact: "Mrs. Maria Garcia",
      phone: "09987654321",
      icon: IconCrown,
      status: "upcoming",
      participants: "12 contestants",
      prizes: "Crown, Sash, ₱10,000 cash prize + prizes from sponsors",
      requirements: "Single, 18-25 years old, Barangay resident",
      image: "/images/miss-barangay.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Pista ng Barangay 2024",
      category: "fiesta",
      description:
        "Grand celebration of our barangay's founding anniversary with cultural shows, food fair, and community activities",
      date: "2024-04-12",
      endDate: "2024-04-14",
      time: "All Day",
      venue: "Barangay Plaza & Streets",
      organizer: "Barangay Council",
      contact: "Barangay Captain Jose Rizal",
      phone: "09111222333",
      icon: IconGift,
      status: "upcoming",
      participants: "Whole community",
      activities: "Cultural shows, Food fair, Games, Fireworks display",
      requirements: "Open to all residents and visitors",
      image: "/images/pista-barangay.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "Volleyball Liga - Women's Division",
      category: "sports",
      description:
        "Inter-sitio women's volleyball tournament promoting sportsmanship and camaraderie",
      date: "2024-02-20",
      endDate: "2024-02-28",
      time: "5:00 PM - 9:00 PM",
      venue: "Barangay Volleyball Court",
      organizer: "SK (Sangguniang Kabataan)",
      contact: "SK Chairman Mark Lopez",
      phone: "09444555666",
      icon: IconPlayFootball,
      status: "upcoming",
      participants: "8 teams",
      prizes: "Trophies and medals for top 3 teams",
      requirements: "Female players, 16-35 years old",
      image: "/images/volleyball.jpg",
    },
    {
      id: 5,
      title: "Karaoke Contest - Battle of Voices",
      category: "entertainment",
      description:
        "Singing competition showcasing the musical talents of barangay residents",
      date: "2024-03-15",
      time: "7:00 PM - 11:00 PM",
      venue: "Barangay Hall Function Room",
      organizer: "Barangay Cultural Committee",
      contact: "Mrs. Linda Cruz",
      phone: "09777888999",
      icon: IconMicrophone,
      status: "upcoming",
      participants: "Solo and Duet categories",
      prizes:
        "₱5,000 Grand Champion, ₱3,000 1st Runner-up, ₱2,000 2nd Runner-up",
      requirements: "Registration fee: ₱100",
      image: "/images/karaoke-contest.jpg",
    },
    {
      id: 6,
      title: "Cooking Contest - Lutong Bahay",
      category: "competition",
      description:
        "Traditional Filipino cooking competition featuring authentic home recipes",
      date: "2024-03-22",
      time: "8:00 AM - 2:00 PM",
      venue: "Barangay Covered Court",
      organizer: "Barangay Nutrition Committee",
      contact: "Mrs. Rosa Mendoza",
      phone: "09333444555",
      icon: IconChefHat,
      status: "upcoming",
      participants: "15 contestants",
      categories: "Main Dish, Dessert, Kakanin",
      prizes: "Kitchen appliances and cash prizes",
      requirements: "Must use traditional Filipino recipes",
      image: "/images/cooking-contest.jpg",
    },
    {
      id: 7,
      title: "Fun Run for Health",
      category: "sports",
      description: "Community fun run promoting health and fitness awareness",
      date: "2024-04-07",
      time: "5:00 AM - 8:00 AM",
      venue: "Barangay Streets (3K and 5K routes)",
      organizer: "Barangay Health Committee",
      contact: "Dr. Anna Reyes",
      phone: "09666777888",
      icon: IconRun,
      status: "upcoming",
      participants: "All ages welcome",
      categories: "3K Family Run, 5K Competitive Run",
      prizes: "Medals for all finishers, Special prizes for winners",
      requirements: "Registration: ₱150 (includes race kit)",
      image: "/images/fun-run.jpg",
    },
    {
      id: 8,
      title: "Senior Citizens Day Celebration",
      category: "community",
      description:
        "Special celebration honoring our beloved senior citizens with entertainment and fellowship",
      date: "2024-04-20",
      time: "9:00 AM - 4:00 PM",
      venue: "Barangay Hall",
      organizer: "Senior Citizens Association",
      contact: "Mrs. Carmen Torres",
      phone: "09888999000",
      icon: IconHeart,
      status: "upcoming",
      participants: "All senior citizens (60+ years old)",
      activities:
        "Free health check-up, Entertainment, Free lunch, Games with prizes",
      requirements: "Senior Citizen ID",
      image: "/images/senior-citizens.jpg",
    },
    {
      id: 9,
      title: "Youth Dance Competition",
      category: "entertainment",
      description: "Hip-hop and traditional dance competition for the youth",
      date: "2024-05-01",
      time: "6:00 PM - 10:00 PM",
      venue: "Barangay Covered Court",
      organizer: "Sangguniang Kabataan",
      contact: "SK Chairman Mark Lopez",
      phone: "09444555666",
      icon: IconMusic,
      status: "upcoming",
      participants: "Ages 13-30",
      categories: "Hip-hop, Traditional Filipino Dance, Modern Dance",
      prizes: "₱8,000 Grand Prize per category",
      requirements: "Group of 5-10 members",
      image: "/images/dance-competition.jpg",
    },
    {
      id: 10,
      title: "Barangay Swimming Competition",
      category: "sports",
      description: "Swimming competition for different age categories",
      date: "2024-05-15",
      time: "7:00 AM - 12:00 PM",
      venue: "Municipal Swimming Pool",
      organizer: "Barangay Sports Committee",
      contact: "Coach Miguel Santos",
      phone: "09222333444",
      icon: IconSwimming,
      status: "upcoming",
      participants: "Ages 10 and above",
      categories: "Kids (10-15), Youth (16-25), Adult (26+)",
      prizes: "Medals and certificates",
      requirements: "Medical certificate required",
      image: "/images/swimming.jpg",
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Upcoming Events",
      value: barangayEvents.filter((e) => e.status === "upcoming").length,
      description: "Events this month",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Sports Events",
      value: barangayEvents.filter((e) => e.category === "sports").length,
      description: "Athletic competitions",
      icon: Trophy,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Community Events",
      value: barangayEvents.filter((e) =>
        ["community", "fiesta"].includes(e.category)
      ).length,
      description: "Community gatherings",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Competitions",
      value: barangayEvents.filter((e) =>
        ["pageant", "competition", "entertainment"].includes(e.category)
      ).length,
      description: "Contests & shows",
      icon: Star,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  const categories = [
    { value: "all", label: "All Events" },
    { value: "sports", label: "Sports & Athletics" },
    { value: "pageant", label: "Beauty Pageants" },
    { value: "entertainment", label: "Entertainment" },
    { value: "competition", label: "Competitions" },
    { value: "community", label: "Community Events" },
    { value: "fiesta", label: "Fiesta & Celebrations" },
  ];

  const months = [
    { value: "all", label: "All Months" },
    { value: "2024-02", label: "February 2024" },
    { value: "2024-03", label: "March 2024" },
    { value: "2024-04", label: "April 2024" },
    { value: "2024-05", label: "May 2024" },
  ];

  const getStatusBadge = (status, date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return (
        <Badge className="bg-muted text-muted-foreground border-muted">
          <Clock className="h-3 w-3 mr-1" />
          Past Event
        </Badge>
      );
    } else if (daysDiff <= 7) {
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/30">
          <Bell className="h-3 w-3 mr-1" />
          This Week
        </Badge>
      );
    } else if (daysDiff <= 30) {
      return (
        <Badge className="bg-warning/10 text-warning border-warning/30">
          <Calendar className="h-3 w-3 mr-1" />
          This Month
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-primary/10 text-primary border-primary/30">
          <Calendar className="h-3 w-3 mr-1" />
          Upcoming
        </Badge>
      );
    }
  };

  const getCategoryBadge = (category) => {
    const categoryStyles = {
      sports: "bg-success/10 text-success border-success/30",
      pageant: "bg-accent/10 text-accent border-accent/30",
      entertainment: "bg-primary/10 text-primary border-primary/30",
      competition: "bg-warning/10 text-warning border-warning/30",
      community:
        "bg-secondary/20 text-secondary-foreground border-secondary/30",
      fiesta: "bg-destructive/10 text-destructive border-destructive/30",
    };

    const categoryLabels = {
      sports: "Sports",
      pageant: "Pageant",
      entertainment: "Entertainment",
      competition: "Competition",
      community: "Community",
      fiesta: "Fiesta",
    };

    return (
      <Badge className={categoryStyles[category] || categoryStyles.community}>
        {categoryLabels[category] || category}
      </Badge>
    );
  };

  const filteredEvents = barangayEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    const matchesMonth =
      filterMonth === "all" || event.date.startsWith(filterMonth);
    return matchesSearch && matchesCategory && matchesMonth;
  });

  const featuredEvents = barangayEvents.filter((event) => event.featured);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Barangay Events
            </h1>
            <p className="text-muted-foreground">
              Stay updated with community activities, sports tournaments, and
              celebrations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              <User className="h-3 w-3 mr-1" />
              {userProfile.name} - Resident
            </Badge>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-lg border ${stat.borderColor} bg-card hover:bg-card/80`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center shadow-sm`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Events */}
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
          </CardContent>
        </Card>

        {/* All Events */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <IconCalendarEvent className="h-5 w-5 text-primary" />
                  All Barangay Events
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete list of community events, sports, and activities
                </CardDescription>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search events, organizers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 cursor-pointer"
                  onClick={() => handleViewDetails(event)}
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
                              {getCategoryBadge(event.category)}
                              {getStatusBadge(event.status, event.date)}
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
                              ` - ${new Date(
                                event.endDate
                              ).toLocaleDateString()}`}
                          </p>
                          <p className="text-muted-foreground">{event.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">
                            {event.venue}
                          </p>
                          <p className="text-muted-foreground">Venue</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-success shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">
                            {event.organizer}
                          </p>
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Events Found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-xl">
                    <selectedEvent.icon className="h-6 w-6 text-primary" />
                    {selectedEvent.title}
                  </DialogTitle>
                  <div className="flex gap-2 pt-2">
                    {getCategoryBadge(selectedEvent.category)}
                    {getStatusBadge(selectedEvent.status, selectedEvent.date)}
                    {selectedEvent.featured && (
                      <Badge className="bg-accent/10 text-accent border-accent/30">
                        Featured Event
                      </Badge>
                    )}
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-foreground">
                          Event Date & Time
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">
                              {new Date(selectedEvent.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                              {selectedEvent.endDate && (
                                <span>
                                  {" "}
                                  -{" "}
                                  {new Date(
                                    selectedEvent.endDate
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedEvent.time}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-foreground">
                          Venue
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-accent" />
                          <p className="font-medium">{selectedEvent.venue}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-foreground">
                          Participants
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-success" />
                          <p className="font-medium">
                            {selectedEvent.participants}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-foreground">
                          Organizer
                        </Label>
                        <div className="mt-1">
                          <p className="font-medium">
                            {selectedEvent.organizer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedEvent.contact}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-foreground">
                          Contact Information
                        </Label>
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <p className="font-medium">{selectedEvent.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedEvent.prizes && (
                    <div>
                      <Label className="text-sm font-semibold text-foreground">
                        Prizes & Awards
                      </Label>
                      <div className="flex items-start gap-2 mt-1">
                        <Trophy className="h-4 w-4 text-warning mt-0.5" />
                        <p className="font-medium">{selectedEvent.prizes}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.activities && (
                    <div>
                      <Label className="text-sm font-semibold text-foreground">
                        Activities
                      </Label>
                      <div className="flex items-start gap-2 mt-1">
                        <Star className="h-4 w-4 text-accent mt-0.5" />
                        <p className="font-medium">
                          {selectedEvent.activities}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.categories && (
                    <div>
                      <Label className="text-sm font-semibold text-foreground">
                        Categories
                      </Label>
                      <div className="flex items-start gap-2 mt-1">
                        <Trophy className="h-4 w-4 text-warning mt-0.5" />
                        <p className="font-medium">
                          {selectedEvent.categories}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-semibold text-foreground">
                      Requirements
                    </Label>
                    <div className="flex items-start gap-2 mt-1">
                      <Bell className="h-4 w-4 text-primary mt-0.5" />
                      <p className="font-medium">
                        {selectedEvent.requirements}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Event Reminder
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mark your calendar and don't miss this exciting
                          barangay event! For more information, contact the
                          organizer directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
