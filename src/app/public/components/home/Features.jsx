import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { User, FileText, Clock, Bell, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: User,
      title: "Personal Account Management",
      description:
        "Create and manage your secure personal profile with complete control over your information.",
      color: "primary",
    },
    {
      icon: FileText,
      title: "Document Request Submission",
      description:
        "Submit requests for various barangay documents including clearances, certificates, and permits through our streamlined online process.",
      color: "accent",
    },
    {
      icon: Clock,
      title: "Real-Time Status Tracking",
      description:
        "Monitor the progress of your document requests with live updates and detailed status information at every step of the process.",
      color: "success",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Receive timely notifications and updates about your requests through email notifications.",
      color: "warning",
    },
    {
      icon: Shield,
      title: "Secure Data Protection",
      description:
        "Your personal information is protected by strict privacy controls.",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description:
        "Experience lightning-fast document processing with automated workflows that reduce traditional waiting times from days to hours.",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border text-primary shadow-lg animate-fadeIn"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            System Features
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Everything You Need for
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seamless Document Management
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Discover the comprehensive features designed to make your barangay
            document requests simple, fast, and hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/90 backdrop-blur-sm shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    feature.color === "success"
                      ? "bg-success/10 text-success group-hover:bg-success/20"
                      : feature.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : feature.color === "accent"
                      ? "bg-accent/10 text-accent group-hover:bg-accent/20"
                      : "bg-warning/10 text-warning group-hover:bg-warning/20"
                  }`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-scaleIn">
          <Card className="bg-gradient-to-r from-primary to-accent shadow-2xl border-0">
            <CardContent className="p-12 md:p-16 text-center">
              <CardTitle className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-primary-foreground/90 mb-10 max-w-3xl mx-auto text-xl">
                Join hundreds of residents who have already simplified their
                document requests with our digital platform.
              </CardDescription>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-card text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:bg-card/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-background px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background hover:text-primary transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
