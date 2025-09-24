import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Card, CardContent } from "@/core/components/ui/card";
import { ArrowRight, CheckCircle, Lock, Zap } from "lucide-react";
import Skeleton from "@/core/components/ui/Sketon";

const HeroSection = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  const trustIndicators = [
    {
      icon: CheckCircle,
      title: "Government Certified",
      description: "Fully compliant with government standards",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is protected with advanced encryption",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick document processing and approval",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('image/hero_background.png')`,
        }}
      />

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/50 to-muted/40" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border shadow-lg animate-fadeIn text-sm font-semibold"
          >
            <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
            Barangay Document Management System
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight animate-fadeIn">
            <span className="block mb-3">Modern & Efficient</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Document Management
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-card-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
            Streamline your barangay document requests with our secure,
            efficient, and user-friendly digital platform. Schedule to Borrow
            things and clearances hassle-free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-scaleIn">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <Link to="/signup">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-10 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeIn">
            {trustIndicators.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-foreground/30 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
