import { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  FileText,
  Calendar,
  Package,
  Settings,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  User,
} from "lucide-react";
import { IconMedicalCross } from "@tabler/icons-react";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { Separator } from "@/core/components/ui/separator";

export default function ResidentGetHelp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // System features and services
  const systemFeatures = [
    {
      icon: FileText,
      title: "Document Requests",
      description: "Request official barangay documents",
      services: [
        "Barangay Clearance",
        "Residency Certificate",
        "Certificate of Indigency",
        "Business Permit",
        "Building Permit",
      ],
    },
    {
      icon: Package,
      title: "Equipment Borrowing",
      description: "Reserve barangay equipment and facilities",
      services: [
        "Sound System",
        "Tables & Chairs",
        "Event Tents",
        "Basketball Equipment",
        "Projector & Screen",
      ],
    },
    {
      icon: Calendar,
      title: "Community Events",
      description: "View and participate in barangay activities",
      services: [
        "Liga ng mga Barangay Basketball Tournament",
        "Pista ng Barangay",
        "Miss Barangay Kaypian",
        "Medical Missions",
        "Skills Training Programs",
      ],
    },
    {
      icon: IconMedicalCross,
      title: "Health Services",
      description: "Access health and medical services",
      services: [
        "Free Medical Check-up",
        "Anti-Rabies Vaccination",
        "Senior Citizen Health Check",
        "Blood Pressure Monitoring",
        "Health Education Programs",
      ],
    },
  ];

  // FAQ Data
  const faqData = [
    {
      category: "account",
      title: "Account & Login",
      questions: [
        {
          q: "I forgot my password. How can I reset it?",
          a: "On the login page, click 'Forgot Password' and enter your email. You'll receive a password reset link within a few minutes.",
        },
        {
          q: "Why is my account still pending?",
          a: "New accounts require admin approval for security. This usually takes 1-2 business days. Contact the barangay office if it takes longer.",
        },
      ],
    },
    {
      category: "documents",
      title: "Document Requests",
      questions: [
        {
          q: "What documents can I request online?",
          a: "You can request Barangay Clearance, Residency Certificate, Certificate of Indigency, Business Permit, and Building Permit through the system.",
        },
        {
          q: "How long does it take to process documents?",
          a: "Most documents are processed within 24-48 hours during business days. Complex requests may take up to 5 business days.",
        },
        {
          q: "What are the requirements for each document?",
          a: "Requirements vary by document type. Check the document details page for specific requirements, fees, and processing times.",
        },
        {
          q: "Can I track my document request status?",
          a: "Yes, go to 'Barangay Documents' to view all your requests and their current status (Pending, Processing, Ready, Completed).",
        },
        {
          q: "Do you offer document delivery?",
          a: "Yes! You will pay ₱20 delivery fee with cash on delivery (COD).",
        },
      ],
    },
    {
      category: "equipment",
      title: "Equipment Borrowing",
      questions: [
        {
          q: "What equipment can I borrow?",
          a: "Available items include sound systems, tables & chairs, event tents, basketball equipment, and projectors. Check availability in the Equipment section.",
        },
        {
          q: "How far in advance should I book equipment?",
          a: "We recommend booking at least 3-5 days in advance, especially for weekends and holidays when demand is higher.",
        },
        {
          q: "Are there fees for borrowing equipment?",
          a: "Most equipment is free for barangay residents. Some specialized items may have minimal fees. Check item details for specific pricing.",
        },
        {
          q: "What if I damage borrowed equipment?",
          a: "Report damage immediately to the barangay office. Minor damage may be waived, but major damage may require repair or replacement costs.",
        },
        {
          q: "Can I extend my borrowing period?",
          a: "Extensions may be possible if no other residents have booked the equipment. Contact the office before the return date.",
        },
      ],
    },
    {
      category: "events",
      title: "Community Events",
      questions: [
        {
          q: "How do I register for events?",
          a: "Browse upcoming events in the 'Community Events' section and click 'Register' on events you want to join. Some events may have limited slots.",
        },
        {
          q: "Are events free for residents?",
          a: "Most community events are free for barangay residents. Special events or workshops may have minimal fees for materials.",
        },
        {
          q: "Can I suggest events or activities?",
          a: "Yes! Contact the barangay office with your suggestions. We welcome community input for events and programs.",
        },
        {
          q: "What if I can't attend an event I registered for?",
          a: "Please cancel your registration as soon as possible so others can take your spot. Go to your event registrations to cancel.",
        },
      ],
    },
    {
      category: "services",
      title: "Health & Services",
      questions: [
        {
          q: "What health services are available?",
          a: "We offer free medical check-ups, anti-rabies vaccination for pets, senior citizen health checks, and various health programs.",
        },
        {
          q: "Do I need to schedule health services?",
          a: "Most services are walk-in, but some specialized services may require appointments. Check the service details for specific requirements.",
        },
        {
          q: "Are health services really free?",
          a: "Yes, basic health services are provided free for all barangay residents as part of our community health program.",
        },
        {
          q: "What should I bring to health services?",
          a: "Bring a valid ID and proof of barangay residency. For pet vaccination, bring previous vaccination records if available.",
        },
      ],
    },
    {
      category: "technical",
      title: "Technical Issues",
      questions: [
        {
          q: "The website is loading slowly. What should I do?",
          a: "Try refreshing the page or clearing your browser cache. If the issue persists, check your internet connection or try again later.",
        },
        {
          q: "I can't upload my documents. What's wrong?",
          a: "Ensure your files are in PDF, JPG, or PNG format and under 5MB each. Try using a different browser if the issue continues.",
        },
        {
          q: "Can I use this system on my mobile phone?",
          a: "Yes! The system is mobile-friendly and works on smartphones and tablets. Use any modern web browser for the best experience.",
        },
      ],
    },
  ];

  // Contact Information
  const contactInfo = {
    office: {
      name: "Barangay Kaypian Office",
      address: "Barangay Hall, Main Street, Kaypian",
      phone: "+63 (2) 123-4567",
      email: "barangaykaypian@gov.ph",
      hours:
        "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nLunch Break: 12:00 PM - 1:00 PM",
    },
    emergency: {
      police: "117",
      fire: "116",
      medical: "911",
      barangayHotline: "+63 (2) 123-4567",
    },
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((category) => {
    if (activeCategory !== "all" && category.category !== activeCategory)
      return false;

    if (searchTerm) {
      return category.questions.some(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const categories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "account", label: "Account & Login", icon: User },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "equipment", label: "Equipment", icon: Package },
    { id: "events", label: "Events", icon: Calendar },
    { id: "services", label: "Services", icon: IconMedicalCross },
    { id: "technical", label: "Technical", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Help & Support Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, learn about our services, and get
            the support you need
          </p>
        </div>

        {/* Search Bar */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help topics, services, or questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="space-y-6"
        >
          {/* Category Tabs */}
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-7 w-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Quick Access - System Features */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {systemFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:shadow-lg transition-all duration-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">
                        Available Services:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {feature.services.slice(0, 3).map((service, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-success" />
                            {service}
                          </li>
                        ))}
                        {feature.services.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{feature.services.length - 3} more services
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {filteredFAQs.map((category) => (
              <Card key={category.category} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {categories.find((c) => c.category === category.category)
                      ?.icon && (
                      <category.icon className="h-5 w-5 text-primary" />
                    )}
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    Frequently asked questions about{" "}
                    {category.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions
                      .filter(
                        (q) =>
                          !searchTerm ||
                          q.q
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          q.a.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((faq, index) => (
                        <Collapsible key={index}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
                            <span className="font-medium text-foreground">
                              {faq.q}
                            </span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-4 text-muted-foreground leading-relaxed">
                            {faq.a}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>

        {/* Contact Information */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Office Contact */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Office Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">{contactInfo.office.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contactInfo.office.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.office.phone}</p>
                    <p className="text-sm text-muted-foreground">
                      Office Phone
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.office.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Official Email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {contactInfo.office.hours}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Our Office
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Important numbers for emergencies and urgent assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-destructive/10 rounded-lg">
                  <p className="text-lg font-bold text-destructive">
                    {contactInfo.emergency.police}
                  </p>
                  <p className="text-xs text-muted-foreground">Police</p>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <p className="text-lg font-bold text-warning">
                    {contactInfo.emergency.fire}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fire Department
                  </p>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-lg font-bold text-success">
                    {contactInfo.emergency.medical}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Medical Emergency
                  </p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-lg font-bold text-primary">
                    {contactInfo.emergency.barangayHotline}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Barangay Hotline
                  </p>
                </div>
              </div>

              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  For non-emergency concerns, please contact the barangay office
                  during business hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Help */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our team is here to assist you
              with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send us a Message
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Phone className="h-4 w-4 mr-2" />
                Call the Office
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>Barangay Management System</p>
          <p>© 2024 Barangay Kaypian. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
