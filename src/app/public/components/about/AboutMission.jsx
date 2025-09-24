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
import { Star, Eye, Users, Quote } from "lucide-react";

const AboutMission = () => {
  const missions = [
    {
      icon: Star,
      title: "Our Mission",
      description:
        "To provide accessible, efficient, and transparent government services that empower our community members and foster trust between citizens and local government through innovative digital solutions.",
      color: "primary",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading model of digital government service delivery, setting the standard for transparency, efficiency, and citizen satisfaction in local government operations nationwide.",
      color: "accent",
    },
    {
      icon: Users,
      title: "Our Values",
      description:
        "Integrity, Innovation, Inclusivity, and Impact. We are committed to serving our community with the highest ethical standards while embracing technological advancement for the greater good.",
      color: "success",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 bg-primary/10 border border-primary/20 text-primary"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            Our Foundation
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mission, Vision &
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence drives everything we do, from the
            technology we develop to the relationships we build with our
            community.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {missions.map((mission, index) => (
            <Card
              key={index}
              className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                    mission.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : mission.color === "accent"
                      ? "bg-accent/10 text-accent group-hover:bg-accent/20"
                      : "bg-success/10 text-success group-hover:bg-success/20"
                  }`}
                >
                  <mission.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {mission.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  {mission.description}
                </CardDescription>

                {/* Decorative Element */}
                <div
                  className={`mt-6 w-12 h-1 rounded-full transition-all duration-300 group-hover:w-16 ${
                    mission.color === "primary"
                      ? "bg-primary"
                      : mission.color === "accent"
                      ? "bg-accent"
                      : "bg-success"
                  }`}
                ></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center animate-fadeIn">
          <Card className="glass-effect shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Quote className="h-8 w-8" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 italic leading-relaxed">
                "Technology should serve the people, making government services
                more accessible, efficient, and transparent for every member of
                our community."
              </blockquote>
              <cite className="text-muted-foreground font-medium">
                — Barangay Captain, Digital Transformation Initiative
              </cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
