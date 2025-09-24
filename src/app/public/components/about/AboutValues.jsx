import React from "react";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Heart, Layers, Users, Smile } from "lucide-react";

const AboutValues = () => {
  const coreValues = [
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our operations, ensuring transparency and honesty in every interaction with our community.",
      principles: [
        "Honest communication",
        "Ethical practices",
        "Transparent processes",
        "Accountability",
      ],
    },
    {
      icon: Layers,
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and creative solutions to continuously improve our services and exceed citizen expectations.",
      principles: [
        "Technology adoption",
        "Creative solutions",
        "Continuous improvement",
        "Future-ready systems",
      ],
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "We design our services to be accessible to all community members, regardless of age, technical ability, or socioeconomic status.",
      principles: [
        "Universal access",
        "Digital equity",
        "Cultural sensitivity",
        "Barrier-free design",
      ],
    },
    {
      icon: Smile,
      title: "Impact",
      description:
        "We measure our success by the positive difference we make in people's lives and the efficiency we bring to government services.",
      principles: [
        "Measurable outcomes",
        "Community benefit",
        "Service excellence",
        "Sustainable growth",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 bg-accent/10 border border-accent/20 text-accent"
          >
            <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
            Core Values
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What We
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Stand For
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our core values guide every decision we make and every service we
            provide, ensuring we remain true to our commitment to the community.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {coreValues.map((value, index) => (
            <Card
              key={index}
              className="glass-effect shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideIn group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed text-base">
                      {value.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground mb-3">
                    Key Principles:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {value.principles.map((principle, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {principle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
