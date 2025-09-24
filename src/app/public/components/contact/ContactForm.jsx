import React, { useState } from "react";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Separator } from "@/core/components/ui/separator";
import { MessageCircle, User, Send, CheckCircle, Loader } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
    department: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          priority: "normal",
          department: "",
        });
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const departments = [
    { value: "", label: "Select Department" },
    { value: "general", label: "General Inquiry" },
    { value: "permits", label: "Permits & Licenses" },
    { value: "health", label: "Health Services" },
    { value: "social", label: "Social Services" },
    { value: "peace", label: "Peace & Order" },
    { value: "disaster", label: "Disaster Management" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority" },
    { value: "normal", label: "Normal" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  return (
    <div className="space-y-8" id="contact-form">
      {/* Header */}
      <div className="text-center lg:text-left">
        <Badge
          variant="secondary"
          className="mb-6 px-6 py-3 bg-primary/10 border border-primary/30 text-primary shadow-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Official Contact Form
        </Badge>

        <h2 className="text-4xl font-bold text-foreground mb-4">
          Send us a Message
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          Fill out the form below and we'll get back to you within 24 hours
        </p>
      </div>

      {/* Form */}
      <Card className="glass-effect shadow-xl border-border">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Personal Information
                </CardTitle>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-bold text-foreground"
                  >
                    FULL NAME *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your complete name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-foreground"
                  >
                    EMAIL ADDRESS *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-bold text-foreground"
                  >
                    PHONE NUMBER
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-sm font-bold text-foreground"
                  >
                    DEPARTMENT
                  </Label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-background border border-input rounded-md text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Message Details
                </CardTitle>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-bold text-foreground"
                  >
                    SUBJECT *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of your inquiry"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="priority"
                    className="text-sm font-bold text-foreground"
                  >
                    PRIORITY LEVEL
                  </Label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-background border border-input rounded-md text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-bold text-foreground"
                >
                  DETAILED MESSAGE *
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-3 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none"
                  placeholder="Please provide comprehensive details about your inquiry, request, or concern. The more specific you are, the better we can assist you..."
                />
                <CardDescription className="text-sm text-muted-foreground">
                  Minimum 10 characters required. Be specific for faster, more
                  accurate assistance.
                </CardDescription>
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6">
              <Separator className="mb-6" />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full md:w-auto px-12 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Submit Official Request</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Success Message */}
      {submitStatus === "success" && (
        <Card className="bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/30 shadow-lg animate-fadeIn">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <CardTitle className="font-bold text-lg text-foreground mb-2">
                  ✅ Official Request Submitted Successfully!
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium mb-1">
                  Your message has been received by our government office.
                </CardDescription>
                <CardDescription className="text-sm text-muted-foreground">
                  Reference ID:{" "}
                  <span className="font-mono font-bold">
                    BRG-{Date.now().toString().slice(-6)}
                  </span>{" "}
                  • Response within 24 hours
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactForm;
