import { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Truck,
} from "lucide-react";
import {
  IconCertificate,
  IconFileText,
  IconBusinessplan,
  IconFolder,
} from "@tabler/icons-react";

// Hooks
import useDocumentManagement from "@/app/shared/hooks/useDocumentManagement";
import useDocumentRequests from "@/app/shared/hooks/useDocumentRequest";

const useManageDocument = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [isRequestDetailsOpen, setIsRequestDetailsOpen] = useState(false);
  const [isDocumentTypeDialogOpen, setIsDocumentTypeDialogOpen] = useState(false);
  const [isProcessRequestOpen, setIsProcessRequestOpen] = useState(false);
  const [isDocumentTypeFormOpen, setIsDocumentTypeFormOpen] = useState(false);

  // Form states
  const [processForm, setProcessForm] = useState({
    status: "",
    notes: "",
    estimatedDate: "",
    fee: "",
  });
  const [documentTypeForm, setDocumentTypeForm] = useState({
    name: "",
    category: "",
    description: "",
    fee: "",
    processingTime: "",
    requirements: [],
    purposes: [],
    deliveryAvailable: false,
    urgent: false,
    urgentFee: "",
    urgentTime: "",
    specialNote: "",
    isActive: false,
  });

  // Custom hooks
  const {
    documentTypes,
    loading: docTypesLoading,
    error: docTypesError,
    createDocumentType,
    updateDocumentType,
    deleteDocumentType,
    toggleDocumentTypeStatus,
    refreshDocumentTypes,
  } = useDocumentManagement();

  const {
    requests,
    loading: requestsLoading,
    error: requestsError,
    updateRequestStatus,
    approveRequest,
    rejectRequest,
    markAsReady,
    markAsOutForDelivery,
    markAsCompleted,
    deleteRequest,
    refreshRequests,
  } = useDocumentRequests();

  // Add icon mapping for document types
  const iconMap = {
    1: IconCertificate,
    2: IconFileText,
    3: IconBusinessplan,
  };

  const documentTypesWithIcons = documentTypes.map((docType) => ({
    ...docType,
    icon: iconMap[docType.id] || IconFileText,
  }));

  // Configuration
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "clearance", label: "Clearances" },
    { value: "certificate", label: "Certificates" },
    { value: "identification", label: "ID Documents" },
    { value: "business", label: "Business" },
    { value: "employment", label: "Employment" },
    { value: "character", label: "Character" },
    { value: "tax", label: "Tax Documents" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending_review", label: "Pending Review" },
    { value: "processing", label: "Processing" },
    { value: "ready_for_pickup", label: "Ready for Pickup" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  // Statistics
  const stats = [
    {
      title: "Total Requests",
      value: requests.length,
      description: "All document requests",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Pending Review",
      value: requests.filter((r) => r.status === "pending_review").length,
      description: "Awaiting admin review",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      title: "Processing",
      value: requests.filter((r) => r.status === "processing").length,
      description: "Currently being processed",
      icon: AlertTriangle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Ready for Pickup",
      value: requests.filter((r) => r.status === "ready_for_pickup").length,
      description: "Ready for collection",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Out for Delivery",
      value: requests.filter((r) => r.status === "out_for_delivery").length,
      description: "On the way to the recipient",
      icon: Truck,
      color: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
    },
  ];

  // Tab configuration
  const tabs = [
    {
      value: "requests",
      label: "Document Requests",
      icon: FileText,
      count: requests.length,
    },
    {
      value: "types",
      label: "Document Types",
      icon: IconFolder,
      count: documentTypesWithIcons.length,
    },
  ];

  // Filter configurations
  const requestFilters = [
    {
      value: filterStatus,
      onChange: setFilterStatus,
      options: statusOptions,
      placeholder: "Filter by status",
    },
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categories,
      placeholder: "Filter by category",
    },
  ];

  // Document type form fields
  const documentTypeFormFields = [
    {
      name: "name",
      label: "Document Name",
      type: "text",
      placeholder: "e.g., Barangay Clearance",
      required: true,
      gridClassName: "col-span-1",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories.filter((c) => c.value !== "all"),
      required: true,
      gridClassName: "col-span-1",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the document purpose...",
      gridClassName: "col-span-2",
    },
    {
      name: "fee",
      label: "Processing Fee",
      type: "text",
      placeholder: "e.g., ₱30.00",
      gridClassName: "col-span-1",
    },
    {
      name: "processingTime",
      label: "Processing Time",
      type: "text",
      placeholder: "e.g., 1-2 days",
      gridClassName: "col-span-1",
    },
    {
      name: "deliveryAvailable",
      label: "Delivery Options",
      type: "checkbox",
      checkboxLabel: "Delivery Available",
      gridClassName: "col-span-1",
    },
    {
      name: "urgent",
      label: "Rush Processing",
      type: "checkbox",
      checkboxLabel: "Urgent Processing Available",
      gridClassName: "col-span-1",
    },
    {
      name: "urgentFee",
      label: "Urgent Fee",
      type: "text",
      placeholder: "e.g., ₱50.00",
      gridClassName: "col-span-1",
    },
    {
      name: "urgentTime",
      label: "Urgent Processing Time",
      type: "text",
      placeholder: "e.g., Same day",
      gridClassName: "col-span-1",
    },
    {
      name: "specialNote",
      label: "Special Notes",
      type: "textarea",
      placeholder: "Any special requirements or notes...",
      gridClassName: "col-span-2",
    },
    {
      name: "isActive",
      label: "Status",
      type: "checkbox",
      checkboxLabel: "Active (Available for requests)",
      gridClassName: "col-span-2",
    },
  ];

  // Filter functions
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.documentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || request.documentCategory === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Event handlers
  const handleAddDocumentType = () => {
    setDocumentTypeForm({
      name: "",
      category: "",
      description: "",
      fee: "",
      processingTime: "",
      requirements: [],
      purposes: [],
      deliveryAvailable: true,
      urgent: false,
      urgentFee: "",
      urgentTime: "",
      specialNote: "",
      isActive: true,
    });
    setSelectedDocumentType(null);
    setIsDocumentTypeFormOpen(true);
  };

  const handleEditDocumentType = (docType) => {
    setSelectedDocumentType(docType);
    setDocumentTypeForm({
      name: docType.name,
      category: docType.category,
      description: docType.description,
      fee: docType.fee,
      processingTime: docType.processingTime,
      requirements: docType.requirements,
      purposes: docType.purposes,
      deliveryAvailable: docType.deliveryAvailable,
      urgent: docType.urgent,
      urgentFee: docType.urgentFee || "",
      urgentTime: docType.urgentTime || "",
      specialNote: docType.specialNote || "",
      isActive: docType.isActive,
    });
    setIsDocumentTypeFormOpen(true);
  };

  const handleSubmitDocumentType = async () => {
    try {
      if (selectedDocumentType) {
        await updateDocumentType(selectedDocumentType.id, documentTypeForm);
      } else {
        await createDocumentType(documentTypeForm);
      }
      setIsDocumentTypeFormOpen(false);
    } catch (error) {
      console.error("Error saving document type:", error);
    }
  };

  const handleDeleteDocumentType = async (id) => {
    if (window.confirm("Are you sure you want to delete this document type?")) {
      try {
        await deleteDocumentType(id);
      } catch (error) {
        console.error("Error deleting document type:", error);
      }
    }
  };

  const handleViewDocumentType = (docType) => {
    setSelectedDocumentType(docType);
    setIsDocumentTypeDialogOpen(true);
  };

  const handleViewRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsRequestDetailsOpen(true);
  };

  const handleProcessRequest = (request) => {
    setSelectedRequest(request);
    setProcessForm({
      status: request.status,
      notes: request.notes || "",
      estimatedDate: request.estimatedDate || "",
      fee: request.fee,
    });
    setIsProcessRequestOpen(true);
  };

  const handleSubmitProcessing = async () => {
    try {
      await updateRequestStatus(selectedRequest.id, processForm);
      setIsProcessRequestOpen(false);
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };

  const handleDeleteRequest = async (request) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteRequest(request.id);
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  const handleExport = () => {
    console.log("Export functionality to be implemented");
  };

  const handleRefresh = () => {
    if (activeTab === "requests") {
      refreshRequests();
    } else {
      refreshDocumentTypes();
    }
  };

  // Page header configuration
  const pageHeaderActions = [
    {
      label: "Export Reports",
      variant: "outline",
      icon: Download,
      onClick: handleExport,
      className: "border-primary/30 text-primary hover:bg-primary/10",
    },
    {
      label: "Add Document Type",
      icon: Plus,
      onClick: handleAddDocumentType,
    },
  ];

  return {
    // State
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    activeTab,
    setActiveTab,
    selectedRequest,
    selectedDocumentType,
    isRequestDetailsOpen,
    setIsRequestDetailsOpen,
    isDocumentTypeDialogOpen,
    setIsDocumentTypeDialogOpen,
    isProcessRequestOpen,
    setIsProcessRequestOpen,
    isDocumentTypeFormOpen,
    setIsDocumentTypeFormOpen,
    processForm,
    setProcessForm,
    documentTypeForm,
    setDocumentTypeForm,

    // Data
    documentTypesWithIcons,
    requests,
    filteredRequests,

    // Loading states
    docTypesLoading,
    requestsLoading,

    // Error states
    docTypesError,
    requestsError,

    // Configuration
    categories,
    statusOptions,
    stats,
    tabs,
    requestFilters,
    documentTypeFormFields, //Available docs
    pageHeaderActions,

    // Event handlers
    handleAddDocumentType,
    handleEditDocumentType,
    handleSubmitDocumentType,
    handleDeleteDocumentType,
    handleViewDocumentType,
    handleViewRequestDetails,
    handleProcessRequest,
    handleSubmitProcessing,
    handleDeleteRequest,
    handleExport,
    handleRefresh,
    toggleDocumentTypeStatus,
  };
};

export default useManageDocument;