import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { FileText, Users, Smile, Clock } from "lucide-react";

const AboutStats = () => {
  const [visibleStats, setVisibleStats] = useState(new Set());
  const [animatedValues, setAnimatedValues] = useState({});
  const observerRef = useRef(null);

  const statistics = [
    {
      id: "documents",
      icon: FileText,
      value: 15420,
      suffix: "+",
      label: "Documents Processed",
      description: "Successfully completed requests",
      color: "primary",
    },
    {
      id: "users",
      icon: Users,
      value: 8750,
      suffix: "+",
      label: "Registered Users",
      description: "Active community members",
      color: "accent",
    },
    {
      id: "satisfaction",
      icon: Smile,
      value: 98.5,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Based on user feedback",
      color: "success",
    },
    {
      id: "time",
      icon: Clock,
      value: 85,
      suffix: "%",
      label: "Time Saved",
      description: "Compared to traditional methods",
      color: "warning",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statId = entry.target.dataset.statId;
            setVisibleStats((prev) => new Set([...prev, statId]));

            const stat = statistics.find((s) => s.id === statId);
            if (stat) {
              animateValue(stat.id, 0, stat.value, 1500);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-stat-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const animateValue = (id, start, end, duration) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;

      setAnimatedValues((prev) => ({ ...prev, [id]: currentValue }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const formatValue = (stat) => {
    const value = animatedValues[stat.id] || 0;
    return stat.id === "satisfaction" || stat.id === "time"
      ? value.toFixed(1)
      : Math.floor(value).toLocaleString();
  };

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 bg-primary/10 border border-primary/20 text-primary"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            Impact & Results
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our System
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              By the Numbers
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real data showcasing the positive impact of our digital
            transformation on community service delivery and citizen
            satisfaction.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {statistics.map((stat, index) => (
            <Card
              key={stat.id}
              data-stat-id={stat.id}
              className={`glass-effect shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${
                visibleStats.has(stat.id) ? "animate-scaleIn" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    stat.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : stat.color === "accent"
                      ? "bg-accent/10 text-accent group-hover:bg-accent/20"
                      : stat.color === "success"
                      ? "bg-success/10 text-success group-hover:bg-success/20"
                      : "bg-warning/10 text-warning group-hover:bg-warning/20"
                  }`}
                >
                  <stat.icon className="h-7 w-7" />
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <CardTitle className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {formatValue(stat)}
                    {stat.suffix}
                  </CardTitle>
                  <CardTitle className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {stat.description}
                  </CardDescription>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      stat.color === "primary"
                        ? "bg-primary"
                        : stat.color === "accent"
                        ? "bg-accent"
                        : stat.color === "success"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                    style={{
                      width: visibleStats.has(stat.id) ? "100%" : "0%",
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
