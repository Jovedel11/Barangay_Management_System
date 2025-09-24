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
import { Separator } from "@/core/components/ui/separator";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I register for the digital government services?",
      answer:
        "Registration is simple and free. Visit our platform, click 'Register', provide your basic information and valid ID. Verification usually takes 24-48 hours, and you'll receive email confirmation once approved.",
    },
    {
      question: "What documents can I request through the digital platform?",
      answer:
        "You can request various documents including Barangay Clearance, Certificate of Indigency, Business Permits, Residency Certificates, and other official documents. Most requests are processed within 2-3 business days.",
    },
    {
      question: "Is my personal information secure on this platform?",
      answer:
        "Yes, we use bank-level security with 256-bit SSL encryption, secure servers, and strict data privacy protocols. Your information is protected according to the Data Privacy Act of 2012 and never shared with unauthorized parties.",
    },
    {
      question: "How can I track the status of my document request?",
      answer:
        "After submitting a request, you'll receive a tracking number. Log into your account and go to 'My Requests' to see real-time status updates. You'll also receive email notifications for important updates.",
    },
    {
      question: "What payment methods are accepted for document fees?",
      answer:
        "We accept various payment methods including GCash, PayMaya, online banking, credit/debit cards, and over-the-counter payments at partner locations. All transactions are secure and receipts are provided digitally.",
    },
    {
      question:
        "Can I still visit the office for services not available online?",
      answer:
        "Absolutely! While we encourage digital transactions for convenience, our physical office remains open for services not yet digitized, complex cases, or for those who prefer in-person assistance.",
    },
    {
      question: "How do I report technical issues or request help?",
      answer:
        "Contact our support team through the 'Help & Support' section, email support@barangay.gov.ph, or call our hotline during business hours. We also have live chat support for immediate assistance.",
    },
    {
      question: "Are there any fees for using the digital platform?",
      answer:
        "The platform itself is free to use. You only pay the standard government fees for specific documents or services. There are no additional convenience fees for using our digital services.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-card relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 bg-primary/10 border border-primary/20 text-primary"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our digital government
            services. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="glass-effect shadow-md hover:shadow-lg transition-all duration-300 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <Button
                    onClick={() => toggleFAQ(index)}
                    variant="ghost"
                    className="w-full p-0 h-auto text-left justify-between hover:bg-transparent"
                  >
                    <CardTitle className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </CardTitle>
                    <div
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openFAQ === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </Button>
                </CardHeader>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <CardContent className="pt-0">
                    <Separator className="mb-4" />
                    <CardDescription className="text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center animate-fadeIn">
          <Card className="glass-effect shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <MessageCircle className="h-8 w-8" />
              </div>

              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Still Need Help?
              </CardTitle>

              <CardDescription className="text-muted-foreground mb-8 text-base">
                Our support team is here to assist you with any questions or
                technical issues.
              </CardDescription>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href="mailto:support@barangay.gov.ph">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-border hover:bg-muted hover:text-primary"
                >
                  <a href="tel:+63-xxx-xxx-xxxx">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Hotline
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
