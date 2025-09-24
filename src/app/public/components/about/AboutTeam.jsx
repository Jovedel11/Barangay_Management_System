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
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import {
  Star,
  Monitor,
  Users,
  Link as LinkIcon,
  Mail,
  Linkedin,
  Heart,
  Layers,
} from "lucide-react";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Maria Elena Santos",
      role: "Barangay Captain",
      department: "Executive Leadership",
      bio: "Leading the digital transformation initiative with over 15 years of public service experience.",
      achievements: [
        "Digital Government Pioneer",
        "Community Service Excellence Award",
        "Public Administration Masters",
      ],
      social: {
        email: "captain@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Roberto Cruz",
      role: "IT Director",
      department: "Technology & Systems",
      bio: "Overseeing the technical architecture and security of our digital government platform.",
      achievements: [
        "Cybersecurity Certification",
        "Government IT Excellence",
        "Digital Innovation Leader",
      ],
      social: {
        email: "it.director@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Ana Patricia Reyes",
      role: "Operations Manager",
      department: "Citizen Services",
      bio: "Ensuring smooth operations and exceptional citizen experience in our digital services.",
      achievements: [
        "Service Excellence Award",
        "Process Optimization Expert",
        "Customer Experience Leader",
      ],
      social: {
        email: "operations@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Jonathan Miguel Torres",
      role: "Systems Administrator",
      department: "Technical Support",
      bio: "Maintaining system reliability and providing technical support to ensure 24/7 service availability.",
      achievements: [
        "System Reliability Expert",
        "Cloud Infrastructure Specialist",
        "24/7 Support Excellence",
      ],
      social: {
        email: "sysadmin@barangay.gov.ph",
        linkedin: "#",
      },
    },
  ];

  const departments = [
    {
      name: "Executive Leadership",
      description: "Strategic oversight and policy direction",
      icon: Star,
      color: "primary",
    },
    {
      name: "Technology & Systems",
      description: "Platform development and security",
      icon: Monitor,
      color: "accent",
    },
    {
      name: "Citizen Services",
      description: "User experience and support",
      icon: Users,
      color: "success",
    },
    {
      name: "Technical Support",
      description: "System maintenance and assistance",
      icon: LinkIcon,
      color: "warning",
    },
  ];

  const teamCulture = [
    {
      icon: Users,
      title: "Collaborative",
      desc: "Working together across departments to deliver exceptional citizen services",
      color: "primary",
    },
    {
      icon: Layers,
      title: "Innovative",
      desc: "Embracing new technologies and creative solutions for better government services",
      color: "accent",
    },
    {
      icon: Heart,
      title: "Service-Oriented",
      desc: "Dedicated to improving the lives of our community members through public service",
      color: "success",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-foreground to-gray-900 text-background relative overflow-hidden py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 bg-primary/15 border border-primary/30 text-primary"
          >
            <Users className="w-4 h-4 mr-2" />
            Our Team
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6">
            Meet the People Behind
            <span className="block mt-2 text-primary">Digital Innovation</span>
          </h2>

          <p className="text-lg md:text-xl text-background/80 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of public servants and technology professionals
            working together to transform government service delivery for our
            community.
          </p>
        </div>

        {/* Departments Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slideIn">
          {departments.map((dept, index) => (
            <Card
              key={index}
              className="bg-background/10 backdrop-blur-sm border border-background/20 hover:bg-background/15 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${
                    dept.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : dept.color === "accent"
                      ? "bg-accent/20 text-accent"
                      : dept.color === "success"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  <dept.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-semibold text-background mb-2 group-hover:text-primary transition-colors duration-300 text-base">
                  {dept.name}
                </CardTitle>
                <CardDescription className="text-sm text-background/70">
                  {dept.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-background/10 backdrop-blur-sm border border-background/20 hover:bg-background/15 transition-all duration-300 transform hover:-translate-y-1 animate-slideIn group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <Avatar className="w-20 h-20 flex-shrink-0">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-background mb-1 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <p className="font-medium mb-1 text-primary">
                      {member.role}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-background/10 text-background/80 border-background/20"
                    >
                      {member.department}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-background/80 mb-6 leading-relaxed">
                  {member.bio}
                </CardDescription>

                <div className="mb-6">
                  <h4 className="font-semibold text-background mb-3">
                    Key Achievements:
                  </h4>
                  <div className="space-y-2">
                    {member.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-success/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-background/80">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="mb-4 bg-background/20" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 bg-background/10 hover:bg-primary/20 hover:text-primary text-background/70 transition-all duration-300"
                      asChild
                    >
                      <a href={`mailto:${member.social.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 bg-background/10 hover:bg-primary/20 hover:text-primary text-background/70 transition-all duration-300"
                      asChild
                    >
                      <a href={member.social.linkedin}>
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <span className="text-xs text-background/50">
                    Available for consultation
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Culture */}
        <Card className="mt-20 bg-background/10 backdrop-blur-sm border border-background/20 animate-fadeIn">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-background mb-4">
              Our Team Culture
            </CardTitle>
            <CardDescription className="max-w-2xl mx-auto text-background/80 text-base">
              We foster a collaborative environment focused on innovation,
              integrity, and public service excellence.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {teamCulture.map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      item.color === "primary"
                        ? "bg-primary/20 text-primary"
                        : item.color === "accent"
                        ? "bg-accent/20 text-accent"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold text-background mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-background/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutTeam;
