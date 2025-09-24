import React from "react";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Avatar, AvatarFallback } from "@/core/components/ui/avatar";
import { Clock, Heart, CheckCircle, X, Star } from "lucide-react";

const Benefits = () => {
  const primaryBenefits = [
    {
      icon: Clock,
      title: "Save Time & Effort",
      description:
        "Skip the long queues and office visits. Submit your document requests from anywhere, anytime.",
      metrics: "Average 3-4 hours saved per request",
      color: "success",
    },
    {
      icon: Heart,
      title: "Convenience & Accessibility",
      description:
        "Access government services 24/7 from your home, office, or mobile device with internet connection.",
      metrics: "Available 24/7, 365 days a year",
      color: "primary",
    },
    {
      icon: CheckCircle,
      title: "Transparency & Tracking",
      description:
        "Track your request status in real-time and receive updates at every step of the processing workflow.",
      metrics: "100% transparent process tracking",
      color: "accent",
    },
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Local Resident",
      message:
        "I got my barangay clearance in just 2 hours without leaving my house. The system is so easy to use!",
      avatar: "MS",
    },
    {
      name: "Juan Dela Cruz",
      role: "Small Business Owner",
      message:
        "Processing my business permit was seamless. The real-time tracking feature kept me informed throughout.",
      avatar: "JD",
    },
    {
      name: "Ana Rodriguez",
      role: "Senior Citizen",
      message:
        "As a senior, this system saves me from long queues. My family helps me submit requests online.",
      avatar: "AR",
    },
  ];

  const comparisonData = [
    {
      category: "Traditional Process",
      items: [
        { text: "Long waiting times in queues", negative: true },
        { text: "Multiple office visits required", negative: true },
        { text: "Physical paperwork and forms", negative: true },
        { text: "Unclear processing status", negative: true },
        { text: "Limited office hours only", negative: true },
      ],
    },
    {
      category: "Digital System",
      items: [
        { text: "Instant online submission", negative: false },
        { text: "Submit from anywhere", negative: false },
        { text: "Digital forms and uploads", negative: false },
        { text: "Real-time status tracking", negative: false },
        { text: "24/7 availability", negative: false },
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border text-primary shadow-lg animate-fadeIn"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            System Benefits
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Why Choose Our
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Document System?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Experience the future of government services with our innovative
            digital platform designed to serve you better, faster, and more
            efficiently.
          </p>
        </div>

        {/* Primary Benefits Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-24">
          {primaryBenefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-card/90 backdrop-blur-sm shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    benefit.color === "success"
                      ? "bg-success/10 text-success group-hover:bg-success/20"
                      : benefit.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : benefit.color === "accent"
                      ? "bg-accent/10 text-accent group-hover:bg-accent/20"
                      : "bg-warning/10 text-warning group-hover:bg-warning/20"
                  }`}
                >
                  <benefit.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {benefit.description}
                </CardDescription>

                <Badge
                  variant={benefit.color}
                  className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold ${
                    benefit.color === "success"
                      ? "bg-success/10 text-success"
                      : benefit.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : benefit.color === "accent"
                      ? "bg-accent/10 text-accent"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-3 animate-pulse ${
                      benefit.color === "success"
                        ? "bg-success"
                        : benefit.color === "primary"
                        ? "bg-primary"
                        : benefit.color === "accent"
                        ? "bg-accent"
                        : "bg-warning"
                    }`}
                  ></div>
                  {benefit.metrics}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mb-24 animate-fadeIn">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Traditional vs Digital Approach
            </h3>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              See the clear advantages of choosing our digital document
              management system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {comparisonData.map((section, sectionIndex) => (
              <Card
                key={sectionIndex}
                className={`bg-card/90 backdrop-blur-sm shadow-xl border transition-all duration-500 relative ${
                  section.category === "Digital System"
                    ? "border-success/30 hover:shadow-2xl"
                    : "border-destructive/30"
                }`}
              >
                {section.category === "Digital System" && (
                  <Badge
                    variant="success"
                    className="absolute -top-4 -right-4 bg-success text-white px-6 py-2 rounded-full font-bold shadow-xl"
                  >
                    Recommended
                  </Badge>
                )}

                <CardHeader>
                  <div className="flex items-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 ${
                        section.category === "Digital System"
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      }`}
                    >
                      {section.category === "Digital System" ? (
                        <CheckCircle className={`h-8 w-8 text-success`} />
                      ) : (
                        <X className={`h-8 w-8 text-destructive`} />
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {section.category}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            item.negative
                              ? "bg-destructive/10"
                              : "bg-success/10"
                          }`}
                        >
                          {item.negative ? (
                            <X className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <span className="text-muted-foreground text-lg flex-1">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="animate-fadeIn">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Our Residents Say
            </h3>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Real feedback from community members who have experienced the
              benefits firsthand
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card/90 backdrop-blur-sm shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-warning mr-1 fill-current"
                      />
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-muted-foreground mb-8 text-lg leading-relaxed italic">
                    "{testimonial.message}"
                  </CardDescription>

                  <div className="flex items-center">
                    <Avatar className="w-16 h-16 mr-6">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
