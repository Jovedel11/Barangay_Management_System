import React, { useEffect, useState } from "react";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Send, MapPin } from "lucide-react";
import Skeleton from "@/core/components/ui/Sketon";

const ContactHero = () => {
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
    { label: "24/7 Emergency Response", color: "success" },
    { label: "Official Government Service", color: "primary" },
    { label: "Community First", color: "accent" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-18 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />

      <div className="relative max-w-4xl mx-auto text-center mt-10">
        {/* Heading */}
        <div className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Barangay
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Your trusted local government partner. We're here to serve our
            community with dedicated assistance, comprehensive services, and
            responsive support.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-scaleIn">
          <Button
            asChild
            size="lg"
            className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <a href="#contact-form">
              <Send className="mr-3 h-5 w-5" />
              Send Message
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-10 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <a href="#office-location">
              <MapPin className="mr-3 h-5 w-5" />
              Visit Office
            </a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm animate-fadeIn">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  indicator.color === "success"
                    ? "bg-success"
                    : indicator.color === "primary"
                    ? "bg-primary"
                    : "bg-accent"
                }`}
              />
              <span className="font-medium text-muted-foreground">
                {indicator.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
