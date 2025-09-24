import React from "react";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import { CheckCircle, Users, FileText, Clock, Star } from "lucide-react";

const AboutOverview = () => {
  const benefits = [
    {
      title: "Streamlined Process",
      description:
        "Simplified document requests with real-time status tracking",
    },
    {
      title: "Borrow Scheduling",
      description: "Easily schedule and manage borrowing of barangay resources",
    },
    {
      title: "Time Efficiency",
      description: "Reduced processing time from days to hours",
    },
  ];

  const statistics = [
    {
      value: "1,000+",
      label: "Registered Users",
      color: "primary",
      icon: Users,
    },
    {
      value: "2,500+",
      label: "Documents Processed",
      color: "accent",
      icon: FileText,
    },
    {
      value: "2 Hours",
      label: "Average Processing",
      color: "success",
      icon: Clock,
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      color: "warning",
      icon: Star,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border text-primary shadow-lg animate-fadeIn"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            About Our System
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Modernizing Barangay
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Document Services
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Our digital platform transforms traditional document processing into
            a seamless, efficient experience for both residents and barangay
            officials.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="animate-slideIn">
            <Card className="bg-card/90 backdrop-blur-sm shadow-xl border border-border">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
                  Bridging Traditional Government with Digital Innovation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  The Barangay Document Management System represents a
                  significant leap forward in local government service delivery.
                  By digitizing the entire document request and processing
                  workflow, we eliminate long queues, reduce processing time.
                </CardDescription>

                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  Our platform ensures transparency, accountability, and
                  efficiency while maintaining the highest standards of data
                  security and privacy protection required for government
                  operations.
                </CardDescription>

                <Separator className="my-6" />

                {/* Key Benefits */}
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-success rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2 text-lg">
                          {benefit.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Statistics */}
          <div className="animate-slideIn">
            <div className="grid grid-cols-2 gap-6 mb-8">
              {statistics.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-card/90 backdrop-blur-sm shadow-lg border border-border hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-${stat.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-${stat.color} group-hover:bg-${stat.color}/20 transition-all duration-300 group-hover:scale-110`}
                    >
                      <stat.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-3">
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission Statement */}
            <Card className="bg-primary/5 backdrop-blur-sm border border-primary/10">
              <CardContent className="p-8">
                <CardTitle className="font-bold text-foreground mb-4 flex items-center text-xl">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                  Our Mission
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  To provide accessible, efficient, and transparent government
                  services that empower our community while fostering trust
                  between citizens and local government.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
