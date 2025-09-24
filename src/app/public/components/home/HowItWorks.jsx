import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import {
  User,
  FileText,
  ClipboardList,
  Clock,
  Download,
  Monitor,
  Calendar,
  CheckCircle,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeGuide, setActiveGuide] = useState("documents");

  const documentSteps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up with your personal details to create a secure account in our system.",
      icon: User,
      timeframe: "2-3 minutes",
    },
    {
      number: "02",
      title: "Choose Document Type",
      description:
        "Select from our catalog of available barangay documents and services based on your specific needs.",
      icon: FileText,
      timeframe: "1-2 minutes",
    },
    {
      number: "03",
      title: "Fill Out Application",
      description:
        "Complete the digital form with accurate information and upload any required supporting documents.",
      icon: ClipboardList,
      timeframe: "3-5 minutes",
    },
    {
      number: "04",
      title: "Track Your Request",
      description:
        "Monitor real-time progress of your application with detailed status updates and estimated completion times.",
      icon: Clock,
      timeframe: "Real-time updates",
    },
    {
      number: "05",
      title: "Receive & Download",
      description:
        "Get notified when your document is ready and download it securely or schedule pickup from the barangay office.",
      icon: Download,
      timeframe: "Instant download",
    },
  ];

  const equipmentSteps = [
    {
      number: "01",
      title: "Browse Equipment Catalog",
      description:
        "View available barangay equipment and facilities with real-time availability status.",
      icon: Monitor,
      timeframe: "2-3 minutes",
    },
    {
      number: "02",
      title: "Submit Reservation Request",
      description:
        "Fill out the equipment borrowing form with your intended use and duration.",
      icon: Calendar,
      timeframe: "3-4 minutes",
    },
    {
      number: "03",
      title: "Approval & Confirmation",
      description:
        "Wait for barangay staff approval and receive confirmation with pickup details.",
      icon: CheckCircle,
      timeframe: "4-6 hours",
    },
    {
      number: "04",
      title: "Pickup & Return",
      description:
        "Collect the equipment from the barangay office and return it according to the agreed schedule.",
      icon: ShoppingCart,
      timeframe: "As scheduled",
    },
  ];

  const faqs = [
    {
      question: "What documents do I need to register?",
      answer:
        "You need a valid government ID, proof of residency in the barangay, and a working email address.",
    },
    {
      question: "How long does document processing take?",
      answer:
        "Processing times vary: Barangay Clearance (2-3 hours), Certificate of Residency (1-2 hours), Business Permits (1-2 days).",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept cash payments at the barangay office, GCash, PayMaya, and bank transfers.",
    },
    {
      question: "Is online borrowing available?",
      answer: "Yes, you can schedule online borrowing of barangay resources.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-foreground to-gray-900 text-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-background rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary shadow-lg animate-fadeIn"
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            Step-by-Step Guide
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-8 animate-fadeIn">
            How Our System
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-background/80 max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Follow our simple, streamlined process to get your barangay
            documents and services quickly and efficiently.
          </p>
        </div>

        {/* Service Type Tabs */}
        <div className="flex justify-center mb-20 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Button
              onClick={() => setActiveGuide("documents")}
              variant={activeGuide === "documents" ? "default" : "ghost"}
              size="lg"
              className={`px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 ${
                activeGuide === "documents"
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-background/10 text-background hover:bg-background/20 hover:scale-102"
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Document Requests
            </Button>

            <Button
              onClick={() => setActiveGuide("equipment")}
              variant={activeGuide === "equipment" ? "default" : "ghost"}
              size="lg"
              className={`px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 ${
                activeGuide === "equipment"
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-background/10 text-background hover:bg-background/20 hover:scale-102"
              }`}
            >
              <Monitor className="mr-3 h-5 w-5" />
              Equipment Borrowing
            </Button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {(activeGuide === "documents"
                ? documentSteps
                : equipmentSteps
              ).map((step, index) => (
                <Card
                  key={index}
                  className={`animate-slideIn group cursor-pointer transition-all duration-500 bg-background/10 backdrop-blur-sm shadow-2xl border hover:bg-background/15 ${
                    activeStep === index
                      ? "border-primary/50 shadow-primary/20 bg-background/15 scale-105"
                      : "border-background/20 hover:border-primary/30 hover:scale-102"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Connector Line */}
                  {index <
                    (activeGuide === "documents"
                      ? documentSteps
                      : equipmentSteps
                    ).length -
                      1 && (
                    <div className="hidden lg:block absolute left-10 top-24 w-0.5 h-20 bg-gradient-to-b from-primary/60 to-accent/30"></div>
                  )}

                  <CardContent className="p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      {/* Step Icon & Number */}
                      <div className="flex-shrink-0 flex items-center lg:flex-col lg:items-center gap-6">
                        <div
                          className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                            activeStep === index
                              ? "bg-primary text-primary-foreground shadow-2xl scale-110"
                              : "bg-primary/20 text-primary group-hover:bg-primary/30 group-hover:scale-105"
                          }`}
                        >
                          <step.icon className="h-7 w-7" />
                        </div>
                        <Badge
                          variant={
                            activeStep === index ? "default" : "secondary"
                          }
                          className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                            activeStep === index
                              ? "bg-primary/30 text-primary"
                              : "bg-background/20 text-background/70"
                          }`}
                        >
                          {step.number}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                          <CardTitle
                            className={`text-2xl lg:text-3xl font-bold mb-4 lg:mb-0 transition-colors duration-300 ${
                              activeStep === index
                                ? "text-primary"
                                : "text-background group-hover:text-primary"
                            }`}
                          >
                            {step.title}
                          </CardTitle>
                          <Badge
                            variant="success"
                            className="inline-flex items-center px-4 py-2 bg-success/20 text-success rounded-xl font-semibold backdrop-blur-sm"
                          >
                            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                            {step.timeframe}
                          </Badge>
                        </div>

                        <CardDescription className="text-background/80 text-lg leading-relaxed">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="bg-background/10 backdrop-blur-sm shadow-2xl border border-background/20 animate-fadeIn">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold text-background mb-6">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-background/80 text-xl max-w-3xl mx-auto">
              Find answers to common questions about our document management
              system
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-background/5 backdrop-blur-sm shadow-lg border border-background/10 hover:bg-background/10 hover:border-primary/30 transition-all duration-500 group"
                >
                  <CardContent className="p-8">
                    <CardTitle className="font-bold text-background mb-4 group-hover:text-primary transition-colors duration-300 flex items-start text-lg">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 group-hover:bg-primary/30">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      {faq.question}
                    </CardTitle>
                    <CardDescription className="text-background/70 leading-relaxed ml-12">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-24 text-center animate-scaleIn">
          <Card className="bg-gradient-to-r from-primary to-accent shadow-2xl border-0">
            <CardContent className="p-12 md:p-16">
              <div className="max-w-4xl mx-auto">
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                  Need Additional Help?
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 mb-10 text-xl">
                  Our barangay staff is here to assist you throughout the
                  process. Don't hesitate to reach out if you have questions.
                </CardDescription>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto bg-background text-foreground px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-background px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background hover:text-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link to="/signup">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
