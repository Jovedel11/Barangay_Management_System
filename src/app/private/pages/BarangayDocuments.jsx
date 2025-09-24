import { useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Eye,
  Download,
  User,
  Wallet,
  Info,
  MapPin,
  Truck,
  Home,
} from "lucide-react";
import {
  IconCertificate,
  IconId,
  IconFileText,
  IconUser,
  IconHome,
  IconBusinessplan,
  IconSchool,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";
import { Checkbox } from "@/core/components/ui/checkbox";

export default function BarangayDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    purpose: "",
    quantity: 1,
    urgentRequest: false,
    deliveryMethod: "pickup",
    contactNumber: "",
    emailAddress: "",
    specificDetails: "",
    isPregnant: false,
  });

  // Mock user profile data
  const userProfile = {
    name: "Juan Dela Cruz",
    age: 35,
    gender: "male",
    isSenior: false,
    address: "123 Main St, Barangay Kaypian, San Jose Del Monte, Bulacan",
    civilStatus: "Single",
  };

  // Available Barangay Documents
  const availableDocuments = [
    {
      id: 1,
      name: "Barangay Clearance",
      category: "clearance",
      description: "Official clearance certificate from the barangay",
      icon: IconCertificate,
      fee: "₱30.00",
      processingTime: "1-2 days",
      requirements: ["Valid ID", "Proof of Residency", "2x2 ID Photo"],
      purposes: [
        "Employment",
        "Business Permit",
        "Travel",
        "School Enrollment",
        "Other",
      ],
      deliveryAvailable: true,
      urgent: true,
      urgentFee: "₱50.00",
      urgentTime: "Same day",
    },
    {
      id: 2,
      name: "Certificate of Indigency",
      category: "certificate",
      description:
        "Certificate proving low-income status for assistance programs",
      icon: IconFileText,
      fee: "₱20.00",
      processingTime: "2-3 days",
      requirements: [
        "Valid ID",
        "Proof of Income/Unemployment",
        "Barangay Residency",
      ],
      purposes: [
        "Scholarship Application",
        "Medical Assistance",
        "Legal Aid",
        "Government Programs",
      ],
      deliveryAvailable: true,
      urgent: false,
      specialNote: "Requires barangay official interview",
    },
    {
      id: 3,
      name: "Cedula (Community Tax Certificate)",
      category: "tax",
      description:
        "Community tax certificate required for various transactions",
      icon: IconBusinessplan,
      fee: "₱5.00",
      processingTime: "Same day",
      requirements: ["Valid ID", "Income Declaration"],
      purposes: [
        "Business Registration",
        "Employment",
        "Legal Documents",
        "Government Transactions",
      ],
      deliveryAvailable: false,
      urgent: false,
      specialNote: "Must be claimed in person at barangay office",
    },
    {
      id: 4,
      name: "Barangay ID",
      category: "identification",
      description: "Official barangay identification card",
      icon: IconId,
      fee: "₱50.00",
      processingTime: "5-7 days",
      requirements: [
        "Birth Certificate",
        "Proof of Residency",
        "2x2 ID Photo (2 copies)",
      ],
      purposes: [
        "Primary Identification",
        "Barangay Services",
        "Resident Benefits",
      ],
      deliveryAvailable: true,
      urgent: false,
      specialNote: "Photo will be taken at barangay hall",
    },
    {
      id: 5,
      name: "Certificate of Residency",
      category: "certificate",
      description: "Official proof of residence in the barangay",
      icon: IconHome,
      fee: "₱25.00",
      processingTime: "1-2 days",
      requirements: [
        "Valid ID",
        "Utility Bills",
        "Lease Contract or Property Title",
      ],
      purposes: [
        "School Enrollment",
        "Employment",
        "Banking",
        "Government Services",
      ],
      deliveryAvailable: true,
      urgent: true,
      urgentFee: "₱40.00",
      urgentTime: "Same day",
    },
    {
      id: 6,
      name: "Business Clearance",
      category: "business",
      description: "Clearance for business operations within the barangay",
      icon: IconBusinessplan,
      fee: "₱100.00",
      processingTime: "3-5 days",
      requirements: [
        "Business Registration",
        "Valid ID",
        "Location Sketch",
        "Barangay Clearance",
      ],
      purposes: ["Business Permit", "Business Registration", "Renewal"],
      deliveryAvailable: true,
      urgent: true,
      urgentFee: "₱150.00",
      urgentTime: "1-2 days",
    },
    {
      id: 7,
      name: "Certificate of Good Moral Character",
      category: "character",
      description: "Character certificate from barangay officials",
      icon: IconUser,
      fee: "₱30.00",
      processingTime: "2-3 days",
      requirements: ["Valid ID", "Character References", "Police Clearance"],
      purposes: ["Employment", "School Application", "Immigration", "Adoption"],
      deliveryAvailable: true,
      urgent: false,
      specialNote: "Requires character verification process",
    },
    {
      id: 8,
      name: "First Time Job Seeker Certification",
      category: "employment",
      description: "Certificate for first-time job seekers (tax exemption)",
      icon: IconSchool,
      fee: "Free",
      processingTime: "1 day",
      requirements: [
        "Valid ID",
        "Birth Certificate",
        "Diploma/Certificate",
        "Affidavit",
      ],
      purposes: ["First Employment", "Tax Exemption"],
      deliveryAvailable: true,
      urgent: false,
      specialNote: "Valid for 1 year only",
    },
  ];

  // Mock current requests
  const myRequests = [
    {
      id: 1,
      documentName: "Barangay Clearance",
      purpose: "Employment",
      requestDate: "2024-01-20",
      status: "ready_for_pickup",
      trackingNumber: "BC-2024-001",
      fee: "₱30.00",
      deliveryMethod: "pickup",
      paymentStatus: "pending",
      estimatedDate: "2024-01-22",
    },
    {
      id: 2,
      documentName: "Certificate of Residency",
      purpose: "School Enrollment",
      requestDate: "2024-01-18",
      status: "processing",
      trackingNumber: "CR-2024-005",
      fee: "₱25.00",
      deliveryMethod: "delivery",
      paymentStatus: "pending",
      estimatedDate: "2024-01-25",
    },
    {
      id: 3,
      documentName: "Certificate of Indigency",
      purpose: "Medical Assistance",
      requestDate: "2024-01-15",
      status: "pending_interview",
      trackingNumber: "CI-2024-003",
      fee: "₱20.00",
      deliveryMethod: "pickup",
      paymentStatus: "pending",
      estimatedDate: "2024-01-28",
      note: "Interview scheduled for January 26, 2024 at 10:00 AM",
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Available Documents",
      value: availableDocuments.length,
      description: "Different document types",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "My Requests",
      value: myRequests.length,
      description: "Total document requests",
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Ready for Pickup",
      value: myRequests.filter((r) => r.status === "ready_for_pickup").length,
      description: "Pay and collect at office",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Processing",
      value: myRequests.filter((r) => r.status === "processing").length,
      description: "Currently being processed",
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  const categories = [
    { value: "all", label: "All Documents" },
    { value: "clearance", label: "Clearances" },
    { value: "certificate", label: "Certificates" },
    { value: "identification", label: "ID Documents" },
    { value: "business", label: "Business" },
    { value: "employment", label: "Employment" },
    { value: "character", label: "Character" },
    { value: "tax", label: "Tax Documents" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "ready_for_pickup":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready - Pay at Office
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case "pending_interview":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Interview Required
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDeliveryBadge = (method, status) => {
    if (method === "pickup") {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <Home className="h-3 w-3 mr-1" />
          Walk-in Pickup
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-accent/10 text-accent border-accent/30"
        >
          <Truck className="h-3 w-3 mr-1" />
          COD Delivery
        </Badge>
      );
    }
  };

  const filteredDocuments = availableDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestDocument = (document) => {
    setSelectedDocument(document);
    setRequestForm({
      purpose: "",
      quantity: 1,
      urgentRequest: false,
      deliveryMethod: userProfile.isSenior ? "delivery" : "pickup",
      contactNumber: "",
      emailAddress: "",
      specificDetails: "",
      isPregnant: false,
    });
    setIsRequestDialogOpen(true);
  };

  const handleSubmitRequest = () => {
    console.log("Document request submitted:", {
      document: selectedDocument,
      ...requestForm,
    });
    setIsRequestDialogOpen(false);
    // Show success message
  };

  const calculateTotalFee = () => {
    if (!selectedDocument) return "₱0.00";

    let baseFee =
      selectedDocument.fee === "Free"
        ? 0
        : parseFloat(selectedDocument.fee.replace("₱", ""));
    let totalFee = baseFee * requestForm.quantity;

    if (requestForm.urgentRequest && selectedDocument.urgent) {
      const urgentFee = parseFloat(selectedDocument.urgentFee.replace("₱", ""));
      totalFee = urgentFee * requestForm.quantity;
    }

    if (
      requestForm.deliveryMethod === "delivery" &&
      selectedDocument.deliveryAvailable
    ) {
      // Free delivery for seniors and pregnant women
      if (!userProfile.isSenior && !requestForm.isPregnant) {
        totalFee += 20; // Delivery fee
      }
    }

    return totalFee === 0 ? "Free" : `₱${totalFee.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Barangay Documents
            </h1>
            <p className="text-muted-foreground">
              Request documents online • Pay and collect at barangay office
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              <User className="h-3 w-3 mr-1" />
              {userProfile.name} - Resident
            </Badge>
            {userProfile.isSenior && (
              <Badge className="bg-success/10 text-success border-success/30">
                Senior - Free Delivery
              </Badge>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-lg border ${stat.borderColor} bg-card hover:bg-card/80`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center shadow-sm`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Available Documents */}
          <Card className="lg:col-span-2 bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Available Documents
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Request online • All payments at barangay office only
                  </CardDescription>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 pt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredDocuments.map((doc) => (
                  <Card
                    key={doc.id}
                    className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <doc.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {doc.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                        {doc.urgent && (
                          <Badge className="bg-accent/10 text-accent border-accent/30 text-xs">
                            Rush Available
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Fee:</span>
                          <span className="font-medium text-primary">
                            {doc.fee}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Processing:
                          </span>
                          <span className="font-medium text-foreground">
                            {doc.processingTime}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Payment:
                          </span>
                          <span className="font-medium text-warning">
                            Walk-in Only
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => handleRequestDocument(doc)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Request
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsDetailsDialogOpen(true);
                          }}
                          className="border-primary/30 text-primary hover:bg-primary/10"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Document Requests */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-accent" />
                My Document Requests
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track your requests and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {request.documentName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {request.trackingNumber}
                          </p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="space-y-1">
                        {getDeliveryBadge(
                          request.deliveryMethod,
                          request.status
                        )}
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Purpose:</span>
                          <span className="text-foreground font-medium">
                            {request.purpose}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fee:</span>
                          <span className="text-foreground font-medium">
                            {request.fee}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span
                            className={`font-medium ${
                              request.paymentStatus === "paid"
                                ? "text-success"
                                : "text-warning"
                            }`}
                          >
                            {request.paymentStatus === "paid"
                              ? "Paid at Office"
                              : "Pending - Walk-in"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Ready:</span>
                          <span className="text-foreground font-medium">
                            {new Date(
                              request.estimatedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {request.note && (
                        <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                          <p className="text-warning font-medium">Note:</p>
                          <p className="text-warning/80">{request.note}</p>
                        </div>
                      )}

                      {request.status === "ready_for_pickup" && (
                        <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                          <p className="text-success font-medium">
                            Ready for Pickup!
                          </p>
                          <p className="text-success/80">
                            Visit barangay office to pay {request.fee} and
                            collect your document
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {request.status === "ready_for_pickup" && (
                          <Button
                            size="sm"
                            className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                          >
                            <Wallet className="h-3 w-3 mr-1" />
                            Pay & Collect
                          </Button>
                        )}
                        {request.status === "processing" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Track Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10"
              >
                View All Requests
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Walk-in Payment System Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wallet className="h-5 w-5 text-warning" />
              Walk-in Payment System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">How It Works</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Request online:</strong> Submit your document
                    request
                  </li>
                  <li>
                    • <strong>Processing:</strong> We process your request
                  </li>
                  <li>
                    • <strong>Notification:</strong> We'll notify when ready
                  </li>
                  <li>
                    • <strong>Pay & collect:</strong> Visit office to pay and
                    get document
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  Special Delivery
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Senior Citizens:</strong> Free home delivery
                  </li>
                  <li>
                    • <strong>Pregnant Women:</strong> Free priority delivery
                  </li>
                  <li>
                    • <strong>Payment:</strong> Cash on delivery (COD)
                  </li>
                  <li>
                    • <strong>Others:</strong> ₱20 delivery fee + COD
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Office Hours</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monday-Friday: 8:00 AM - 5:00 PM</li>
                  <li>• Saturday: 8:00 AM - 12:00 PM</li>
                  <li>• Lunch Break: 12:00 PM - 1:00 PM</li>
                  <li>• Contact: (02) 123-4567</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Dialog */}
        <Dialog
          open={isRequestDialogOpen}
          onOpenChange={setIsRequestDialogOpen}
        >
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            {selectedDocument && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedDocument.icon className="h-5 w-5 text-primary" />
                    Request {selectedDocument.name}
                  </DialogTitle>
                  <DialogDescription>
                    Submit request • Payment at barangay office
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="5"
                        value={requestForm.quantity}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Document Fee</Label>
                      <p className="text-lg font-bold text-primary">
                        {selectedDocument.fee}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select
                      value={requestForm.purpose}
                      onValueChange={(value) =>
                        setRequestForm({ ...requestForm, purpose: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDocument.purposes.map((purpose) => (
                          <SelectItem key={purpose} value={purpose}>
                            {purpose}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specificDetails">
                      Specific Details (Optional)
                    </Label>
                    <Textarea
                      id="specificDetails"
                      placeholder="Any specific details or instructions..."
                      value={requestForm.specificDetails}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          specificDetails: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        placeholder="09XXXXXXXXX"
                        value={requestForm.contactNumber}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            contactNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={requestForm.emailAddress}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Urgent Request Option */}
                  {selectedDocument.urgent && (
                    <div className="flex items-center space-x-2 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                      <Checkbox
                        id="urgent"
                        checked={requestForm.urgentRequest}
                        onCheckedChange={(checked) =>
                          setRequestForm({
                            ...requestForm,
                            urgentRequest: checked,
                          })
                        }
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="urgent"
                          className="cursor-pointer font-medium"
                        >
                          Rush Processing ({selectedDocument.urgentFee})
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedDocument.urgentTime} processing
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Collection Method */}
                  <div className="space-y-3">
                    <Label>Collection Method</Label>
                    <RadioGroup
                      value={requestForm.deliveryMethod}
                      onValueChange={(value) =>
                        setRequestForm({
                          ...requestForm,
                          deliveryMethod: value,
                        })
                      }
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <div className="flex-1">
                          <Label htmlFor="pickup" className="cursor-pointer">
                            Walk-in Pickup at Barangay Office
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pay cash and collect at barangay hall
                          </p>
                        </div>
                      </div>

                      {selectedDocument.deliveryAvailable && (
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <div className="flex-1">
                            <Label
                              htmlFor="delivery"
                              className="cursor-pointer"
                            >
                              Home Delivery
                              {(userProfile.isSenior ||
                                requestForm.isPregnant) && (
                                <Badge className="bg-success/10 text-success text-xs ml-2">
                                  Free
                                </Badge>
                              )}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Cash on delivery (COD) payment
                            </p>
                          </div>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  {/* Special Requirements for Female Users */}
                  {userProfile.gender === "female" &&
                    requestForm.deliveryMethod === "delivery" && (
                      <div className="space-y-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                        <Label className="text-sm font-medium">
                          Special Delivery Options
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pregnant"
                            checked={requestForm.isPregnant}
                            onCheckedChange={(checked) =>
                              setRequestForm({
                                ...requestForm,
                                isPregnant: checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="pregnant"
                            className="text-sm cursor-pointer"
                          >
                            I am pregnant (Free priority delivery)
                          </Label>
                        </div>
                      </div>
                    )}

                  {/* Requirements */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium">
                      Requirements to bring:
                    </Label>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      {selectedDocument.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedDocument.specialNote && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning font-medium">
                        Special Note:
                      </p>
                      <p className="text-sm text-warning/80">
                        {selectedDocument.specialNote}
                      </p>
                    </div>
                  )}

                  {/* Payment Summary */}
                  <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Wallet className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <Label className="text-sm font-medium text-warning">
                          Payment Summary:
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>
                            <strong>Total Amount:</strong> {calculateTotalFee()}
                          </p>
                          <p>
                            <strong>Payment Method:</strong> Cash only at
                            barangay office
                          </p>
                          {requestForm.deliveryMethod === "delivery" && (
                            <p>
                              <strong>Delivery:</strong>{" "}
                              {userProfile.isSenior || requestForm.isPregnant
                                ? "Free COD"
                                : "₱20 delivery fee + COD"}
                            </p>
                          )}
                          <p>
                            <strong>Processing:</strong>{" "}
                            {requestForm.urgentRequest &&
                            selectedDocument.urgentTime
                              ? selectedDocument.urgentTime
                              : selectedDocument.processingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRequestDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleSubmitRequest}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Document Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="sm:max-w-md">
            {selectedDocument && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedDocument.icon className="h-5 w-5 text-primary" />
                    {selectedDocument.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDocument.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Fee</Label>
                      <p className="text-lg font-bold text-primary">
                        {selectedDocument.fee}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Processing Time
                      </Label>
                      <p className="text-sm font-medium">
                        {selectedDocument.processingTime}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Payment Method:
                      </span>
                      <span className="text-sm font-medium text-warning">
                        Walk-in Cash Only
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Rush Processing:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedDocument.urgent
                          ? `Yes (${selectedDocument.urgentFee})`
                          : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Delivery Available:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedDocument.deliveryAvailable
                          ? "Yes (COD)"
                          : "No"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Valid Purposes:
                    </Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedDocument.purposes.map((purpose, index) => (
                        <li key={index}>• {purpose}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedDocument.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedDocument.specialNote && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning font-medium">
                        Special Note:
                      </p>
                      <p className="text-sm text-warning/80">
                        {selectedDocument.specialNote}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      handleRequestDocument(selectedDocument);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Request This Document
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
