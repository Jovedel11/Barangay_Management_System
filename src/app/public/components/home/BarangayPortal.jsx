import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  FileText,
  Calendar,
  Users,
  Clock,
  ShoppingBag,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Home,
} from "lucide-react";
import Loader from "@/core/components/ui/Loader";

const BarangayPortal = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Core services for Barangay Kaypian residents
  const services = [
    {
      icon: FileText,
      title: "Document Requests",
      description: "Request official barangay documents",
      items: [
        "Barangay Clearance",
        "Residency Certificate",
        "Certificate of Indigency",
      ],
      color: "bg-blue-50 text-blue-600 border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      icon: ShoppingBag,
      title: "Borrow Equipment",
      description: "Reserve barangay equipment and facilities",
      items: ["Sound System", "Tables & Chairs", "Event Tents"],
      color: "bg-green-50 text-green-600 border-green-200",
      iconBg: "bg-green-100",
    },
    {
      icon: Calendar,
      title: "Community Events",
      description: "View and participate in barangay activities",
      items: [
        "Liga ng mga Barangay Basketball Tournament",
        "Pista ng Barangay",
        "Miss Barangay Kaypian",
      ],
      color: "bg-purple-50 text-purple-600 border-purple-200",
      iconBg: "bg-purple-100",
    },
    {
      icon: Users,
      title: "Resident Services",
      description: "Access various barangay assistance programs",
      items: [
        "Anti-Rabies Vaccination",
        "Free Medical Check-up",
        "Senior Citizen Health Check",
      ],
      color: "bg-orange-50 text-orange-600 border-orange-200",
      iconBg: "bg-orange-100",
    },
  ];

  const quickAccess = [
    { label: "Registered Residents", value: "1,247", icon: Users },
    { label: "Active Requests", value: "43", icon: FileText },
    { label: "Avg. Processing", value: "24hrs", icon: Clock },
  ];

  const officeInfo = {
    hours: "Monday - Friday, 8:00 AM - 5:00 PM",
    location: "Barangay Hall, Main Street, Kaypian",
    phone: "+63 (2) 123-4567",
    email: "barangaykaypian@gov.ph",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('image/hero_background.png')`,
          }}
        />

        {/* Professional Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-primary/30" />

        {/* Subtle animated patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Resident Portal
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Access barangay services online. Request documents, borrow
            equipment, and stay updated with community events.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="px-10 py-4 bg-primary hover:bg-primary/90 rounded-2xl shadow-xl text-lg font-semibold"
            >
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-7 py-2 border-1rounded-2xl text-lg font-semibold backdrop-blur-sm"
            >
              <Link to="/login">Resident Login</Link>
            </Button>
          </div>

          {/* Quick Stats with better visibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {quickAccess.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Available Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Choose from our digital services designed for Barangay Kaypian
              residents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`${service.color} border-2 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-base opacity-80 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-sm opacity-70 flex items-center"
                      >
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-3"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              asChild
              variant="outline"
              className="px-10 py-4 rounded-2xl text-lg font-semibold"
            >
              <Link to="/signup">
                Access All Services
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Barangay Office Information
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Visit us or contact our office for assistance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Office Hours & Location */}
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">
                        Visit Our Office
                      </h3>
                      <p className="text-base text-slate-600 mb-3 leading-relaxed">
                        {officeInfo.location}
                      </p>
                      <p className="text-sm text-slate-500">
                        {officeInfo.hours}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-800">
                          {officeInfo.phone}
                        </p>
                        <p className="text-sm text-slate-500">Office Phone</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-800">
                          {officeInfo.email}
                        </p>
                        <p className="text-sm text-slate-500">Official Email</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Notice */}
            <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <span className="text-lg font-semibold text-slate-700">
                    Secure Digital System
                  </span>
                </div>
                <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  This portal is exclusively for registered residents of
                  Barangay Kaypian. All transactions are secure and monitored
                  for your protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarangayPortal;
