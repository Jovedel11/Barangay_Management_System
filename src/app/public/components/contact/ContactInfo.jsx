import React from "react";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
  Clock,
} from "lucide-react";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Official Phone Lines",
      primary: "+63 (02) 8123-4567",
      secondary: "Mobile: +63 917-123-4567",
      description: "Business Hours: Mon-Fri 8AM-5PM",
      color: "primary",
    },
    {
      icon: Mail,
      title: "Email Communications",
      primary: "info@barangay.gov.ph",
      secondary: "captain@barangay.gov.ph",
      description: "Official response within 24 hours",
      color: "accent",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      primary: "Barangay Government Hall",
      secondary: "123 Main Street, Quezon City, Metro Manila",
      description: "Public access: 7AM-7PM Daily",
      color: "success",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Hotlines",
      primary: "🚨 Emergency: 911 or 117",
      secondary: "Barangay Hotline: 8-HELP (84357)",
      description: "24/7 Emergency Response Available",
      color: "destructive",
    },
  ];

  return (
    <div className="space-y-8" id="contact-info">
      {/* Header */}
      <div className="text-center lg:text-left">
        <Badge
          variant="secondary"
          className="mb-6 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border shadow-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Multiple Contact Options
        </Badge>

        <h2 className="text-4xl font-bold text-foreground mb-4">
          Connect With Us
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          Multiple channels for your convenience and urgent needs
        </p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <Card
            key={index}
            className="group bg-card/90 backdrop-blur-sm border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    method.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : method.color === "accent"
                      ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
                      : method.color === "success"
                      ? "bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground"
                      : "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground"
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <CardTitle className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </CardTitle>
                  <CardDescription className="text-foreground font-semibold text-base mb-1">
                    {method.primary}
                  </CardDescription>
                  <CardDescription className="text-muted-foreground font-medium text-sm mb-3">
                    {method.secondary}
                  </CardDescription>
                  <Badge
                    variant="secondary"
                    className="bg-muted/50 text-muted-foreground border-border text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {method.description}
                  </Badge>
                </div>

                {/* Hover Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Notice */}
      <Card className="bg-gradient-to-r from-destructive/5 via-warning/5 to-destructive/5 border-2 border-destructive/30 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <CardTitle className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                🚨 Emergency Response Protocol
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </CardTitle>
              <CardDescription className="text-destructive font-bold text-base mb-2">
                For immediate life-threatening emergencies: Call 911
              </CardDescription>
              <CardDescription className="text-muted-foreground font-medium">
                For barangay-level emergencies and urgent community concerns,
                contact our 24/7 hotline.
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
