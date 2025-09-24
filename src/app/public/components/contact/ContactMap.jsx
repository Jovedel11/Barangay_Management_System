import React, { useEffect, useState } from "react";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapPin,
  Navigation,
  Copy,
  CheckCircle,
  Info,
  Car,
  Bus,
  Clock,
  Phone,
  AlertTriangle,
} from "lucide-react";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker with your color scheme
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3C14.477 3 10 7.477 10 13C10 19.5 20 37 20 37C20 37 30 19.5 30 13C30 7.477 25.523 3 20 3Z" fill="#0F766E" stroke="#115E59" stroke-width="3"/>
      <circle cx="20" cy="13" r="5" fill="#FFFFFF" stroke="#134E4A" stroke-width="2"/>
      <circle cx="20" cy="13" r="2" fill="#14B8A6"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const ContactMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const position = [14.821869263386215, 121.06262502359284];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mapInfo = {
    address: "Kaypian Barangay Hall, R3C7+M2Q, SJDM, 3023 Bulacan",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    weekend: "Saturday: 8:00 AM - 12NN",
    phone: "+63 (02) 8123-4567",
    emergency: "911 or 117",
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(mapInfo.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy address");
    }
  };

  return (
    <div className="space-y-8" id="office-location">
      {/* Header */}
      <div className="text-center lg:text-left">
        <Badge
          variant="secondary"
          className="mb-6 px-6 py-3 bg-primary/10 border border-primary/30 text-primary shadow-lg"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Official Location
        </Badge>

        <h2 className="text-4xl font-bold text-foreground mb-4">
          Visit Our Office
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          Find us on the map and plan your visit to our government facility
        </p>
      </div>

      {/* Map Container */}
      <Card className="glass-effect shadow-2xl border-border overflow-hidden">
        {/* Map */}
        <div className="h-96 bg-muted/50 relative">
          {isLoaded ? (
            <MapContainer
              center={position}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <h3 className="font-bold text-lg text-foreground">
                        Kaypian Barangay Hall
                      </h3>
                    </div>
                    <p className="text-muted-foreground font-medium mb-3">
                      {mapInfo.address}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">
                          Hours:
                        </span>
                        <span className="text-foreground font-semibold">
                          {mapInfo.hours}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">
                          Phone:
                        </span>
                        <span className="text-foreground font-semibold">
                          {mapInfo.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground font-medium text-lg">
                  Loading interactive map...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Map Info Panel */}
        <CardContent className="p-8 bg-gradient-to-br from-muted/30 to-background">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Address & Directions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="font-bold text-xl text-foreground">
                  Address & Navigation
                </CardTitle>
              </div>
              <CardDescription className="text-muted-foreground font-medium text-base mb-6">
                {mapInfo.address}
              </CardDescription>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyAddress}
                  className="hover:bg-muted"
                >
                  {copySuccess ? (
                    <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copySuccess ? "Copied!" : "Copy Address"}
                </Button>
              </div>
            </div>

            {/* Visitor Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="font-bold text-xl text-foreground">
                  Visitor Information
                </CardTitle>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Office Hours:
                  </span>
                  <span className="text-foreground font-bold">
                    Mon-Fri 8AM-5PM
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border">
                  <span className="text-muted-foreground font-medium">
                    Weekend:
                  </span>
                  <span className="text-foreground font-bold">
                    Sat 8AM-12NN
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone:
                  </span>
                  <span className="text-foreground font-bold">
                    {mapInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg border border-destructive/30">
                  <span className="text-destructive font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Emergency:
                  </span>
                  <span className="text-destructive font-bold">
                    {mapInfo.emergency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transportation Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/30 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-bold text-lg text-foreground">
                Public Transport
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground font-medium">
              Accessible via jeepney routes, city buses, and nearby MRT stations
              with covered walkways
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-success/10 border border-success/30 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="font-bold text-lg text-foreground">
                Free Parking
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground font-medium">
              Dedicated parking spaces available for government service visitors
              - no fees required
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactMap;
