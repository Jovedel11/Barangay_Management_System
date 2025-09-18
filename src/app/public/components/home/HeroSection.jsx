import Skeleton from "@/core/components/ui/Sketon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Simulate a 1 second loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton width="100%" height="400px" />;
  }

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
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-lg animate-fadeIn">
            <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              Barangay Document Management System
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-foreground mb-8 leading-tight animate-fadeIn">
            <span className="block mb-3">Modern & Efficient</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-big">
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
            <Link
              to="/signup"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              Get Started Today
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-2 inline-block"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-10 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeIn">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ),
                title: "Government Certified",
                description: "Fully compliant with government standards",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ),
                title: "Secure & Private",
                description: "Your data is protected with advanced encryption",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Fast Processing",
                description: "Quick document processing and approval",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:bg-card/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm">
                  {feature.description}
                </p>
              </div>
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
