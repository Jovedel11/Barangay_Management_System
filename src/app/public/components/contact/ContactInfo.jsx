import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Official Phone Lines",
    primary: "+63 (02) 8123-4567",
    secondary: "Mobile: +63 917-123-4567",
    description: "Business Hours: Mon-Fri 8AM-5PM",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    accentColor: "group-hover:bg-primary",
  },
  {
    icon: Mail,
    title: "Email Communications",
    primary: "info@barangay.gov.ph",
    secondary: "captain@barangay.gov.ph",
    description: "Official response within 24 hours",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    accentColor: "group-hover:bg-accent",
  },
  {
    icon: MapPin,
    title: "Physical Address",
    primary: "Barangay Government Hall",
    secondary: "123 Main Street, Quezon City, Metro Manila",
    description: "Public access: 7AM-7PM Daily",
    bgColor: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
    accentColor: "group-hover:bg-secondary-foreground",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Hotlines",
    primary: "🚨 Emergency: 911 or 117",
    secondary: "Barangay Hotline: 8-HELP (84357)",
    description: "24/7 Emergency Response Available",
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
    accentColor: "group-hover:bg-destructive",
  },
];

const ContactCard = ({ method }) => {
  const Icon = method.icon;
  return (
    <div className="group relative bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-6">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center ${method.iconColor} ${method.accentColor} group-hover:text-white transition-all duration-300 shadow-lg group-hover:scale-110`}
        >
          <Icon className="w-7 h-7" strokeWidth={2.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors">
            {method.title}
          </h3>
          <p className="text-foreground font-bold text-lg mb-2">
            {method.primary}
          </p>
          <p className="text-muted-foreground font-medium text-base mb-3">
            {method.secondary}
          </p>
          <div className="inline-block bg-gradient-to-r from-muted to-muted/80 border border-border rounded-full px-4 py-2">
            <p className="text-sm font-bold text-foreground/80">
              {method.description}
            </p>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="space-y-8" id="office-location">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-6 py-2 mb-4">
          <MessageCircle className="w-4 h-4 text-secondary-foreground" />
          <span className="text-sm font-semibold text-secondary-foreground">
            Multiple Contact Options
          </span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Connect With Us
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          Multiple channels for your convenience and urgent needs
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid gap-6">
        {contactMethods.map((method, i) => (
          <ContactCard key={i} method={method} />
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="relative bg-gradient-to-r from-destructive/10 via-warning/10 to-destructive/10 border-2 border-destructive/30 rounded-2xl p-8 shadow-xl">
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
        </div>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldAlert
              className="w-8 h-8 text-destructive"
              strokeWidth={2.5}
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-xl text-foreground mb-3">
              🚨 Emergency Response Protocol
            </h4>
            <p className="text-destructive font-black text-lg mb-2">
              For immediate life-threatening emergencies: Call 911
            </p>
            <p className="text-muted-foreground font-medium">
              For barangay-level emergencies and urgent community concerns,
              contact our 24/7 hotline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
