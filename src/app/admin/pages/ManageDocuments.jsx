import {
  FileText,
  Edit,
  Home,
  Truck,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { IconFolder } from "@tabler/icons-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import SearchFilterBar from "@/app/shared/components/search-filter-bar";
import TabNavigation from "@/app/shared/components/table-navigation";
import DataTable from "@/app/shared/components/data-table";
import ModalForm from "@/app/shared/components/modal-form";
import StatusBadge from "@/app/shared/components/status-badge";
import DocumentTypeCard from "@/app/shared/components/document-type-card";

// Hook
import useManageDocument from "@/app/admin/hooks/useManageDocument";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Label } from "@/core/components/ui/label";

const ManageDocuments = () => {
  const {
    // State
    searchTerm,
    setSearchTerm,
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
    filteredRequests,

    // Loading states
    docTypesLoading,
    requestsLoading,

    // Configuration
    statusOptions,
    stats,
    tabs,
    requestFilters,
    documentTypeFormFields,
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
  } = useManageDocument();

  // Helper functions
  const getDeliveryBadge = (method, isPregnant, isSenior) => {
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
          {isPregnant || isSenior ? "Free Delivery" : "COD Delivery"}
        </Badge>
      );
    }
  };

  // Document request table columns
  const requestColumns = [
    {
      key: "trackingNumber",
      label: "Tracking #",
      sortable: true,
    },
    {
      key: "residentName",
      label: "Resident",
      render: (value, request) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            {request.residentEmail}
          </p>
        </div>
      ),
    },
    {
      key: "documentName",
      label: "Document",
      render: (value, request) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            Purpose: {request.purpose}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} type="document" />,
    },
    {
      key: "requestDate",
      label: "Request Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "deliveryMethod",
      label: "Delivery",
      render: (value, request) =>
        getDeliveryBadge(value, request.isPregnant, request.isSenior),
    },
    {
      key: "fee",
      label: "Fee",
      render: (value) => (
        <span className="font-medium text-primary">{value}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Document Management"
          description="Manage document types, process requests, and track resident applications"
          actions={pageHeaderActions}
        />

        {/* Statistics */}
        <StatsGrid stats={stats} />

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Document Requests Tab */}
        {activeTab === "requests" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Document Requests
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Review and process resident document requests
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={requestFilters}
                onExport={handleExport}
                onRefresh={handleRefresh}
                searchPlaceholder="Search by name, tracking number, or document..."
                showAddButton={false}
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredRequests}
                columns={requestColumns}
                onView={handleViewRequestDetails}
                onEdit={handleProcessRequest}
                onDelete={handleDeleteRequest}
                emptyMessage="No document requests found"
                customActions={[
                  {
                    label: "Process Request",
                    icon: Edit,
                    onClick: handleProcessRequest,
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Document Types Tab */}
        {activeTab === "types" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <IconFolder className="h-5 w-5 text-primary" />
                    Document Types
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage available document types and their settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documentTypesWithIcons.map((docType) => (
                  <DocumentTypeCard
                    key={docType.id}
                    documentType={docType}
                    onEdit={handleEditDocumentType}
                    onView={handleViewDocumentType}
                    onToggleStatus={toggleDocumentTypeStatus}
                    onDelete={handleDeleteDocumentType}
                    onSettings={(docType) =>
                      console.log("Settings for:", docType)
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Document Type Modal */}
        <ModalForm
          isOpen={isDocumentTypeFormOpen}
          onClose={() => setIsDocumentTypeFormOpen(false)}
          title={
            selectedDocumentType
              ? "Edit Document Type"
              : "Add New Document Type"
          }
          description={
            selectedDocumentType
              ? "Update document type details and settings"
              : "Create a new document type for residents to request"
          }
          fields={documentTypeFormFields}
          formData={documentTypeForm}
          setFormData={setDocumentTypeForm}
          onSubmit={handleSubmitDocumentType}
          isLoading={docTypesLoading}
          submitText={
            selectedDocumentType ? "Update Document Type" : "Add Document Type"
          }
          size="lg"
        />

        {/* Process Request Modal */}
        <ModalForm
          isOpen={isProcessRequestOpen}
          onClose={() => setIsProcessRequestOpen(false)}
          title="Process Request"
          description={`Update the status and details for ${selectedRequest?.trackingNumber}`}
          fields={[
            {
              name: "status",
              label: "Status",
              type: "select",
              options: statusOptions.filter((s) => s.value !== "all"),
              required: true,
            },
            {
              name: "estimatedDate",
              label: "Estimated Ready Date",
              type: "date",
            },
            {
              name: "fee",
              label: "Fee Amount",
              type: "text",
              placeholder: "₱0.00",
            },
            {
              name: "notes",
              label: "Processing Notes",
              type: "textarea",
              placeholder: "Add notes about the processing status...",
            },
          ]}
          formData={processForm}
          setFormData={setProcessForm}
          onSubmit={handleSubmitProcessing}
          isLoading={requestsLoading}
          submitText="Update Request"
        />

        {/* Request Details Dialog */}
        <Dialog
          open={isRequestDetailsOpen}
          onOpenChange={setIsRequestDetailsOpen}
        >
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Request Details - {selectedRequest.trackingNumber}
                  </DialogTitle>
                  <DialogDescription>
                    Complete information about this document request
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Status and Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedRequest.status}
                          type="document"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Request Date
                      </Label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(selectedRequest.requestDate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Resident Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Resident Information
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {selectedRequest.residentName}
                        </span>
                        {selectedRequest.isSenior && (
                          <Badge className="bg-success/10 text-success text-xs">
                            Senior
                          </Badge>
                        )}
                        {selectedRequest.isPregnant && (
                          <Badge className="bg-accent/10 text-accent text-xs">
                            Pregnant
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedRequest.residentEmail}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedRequest.residentPhone}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">
                          {selectedRequest.residentAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Document Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Document Information
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Document:
                          </span>
                          <p className="font-medium">
                            {selectedRequest.documentName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Purpose:
                          </span>
                          <p className="font-medium">
                            {selectedRequest.purpose}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Quantity:
                          </span>
                          <p className="font-medium">
                            {selectedRequest.quantity}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Fee:
                          </span>
                          <p className="font-medium text-primary">
                            {selectedRequest.fee}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Delivery Method:
                        </span>
                        <div className="mt-1">
                          {getDeliveryBadge(
                            selectedRequest.deliveryMethod,
                            selectedRequest.isPregnant,
                            selectedRequest.isSenior
                          )}
                        </div>
                      </div>
                      {selectedRequest.specificDetails && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Specific Details:
                          </span>
                          <p className="text-sm mt-1">
                            {selectedRequest.specificDetails}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Required Documents
                    </Label>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      {selectedRequest.requirements.map((req, index) => (
                        <li key={index} className="list-disc">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Processing Information */}
                  {selectedRequest.processedBy && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Processing Information
                      </Label>
                      <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Processed By:
                            </span>
                            <p className="font-medium">
                              {selectedRequest.processedBy}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Processed Date:
                            </span>
                            <p className="font-medium">
                              {new Date(
                                selectedRequest.processedDate
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {selectedRequest.notes && (
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Notes:
                            </span>
                            <p className="text-sm mt-1">
                              {selectedRequest.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRequestDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsRequestDetailsOpen(false);
                      handleProcessRequest(selectedRequest);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Process Request
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Document Type Details Dialog */}
        <Dialog
          open={isDocumentTypeDialogOpen}
          onOpenChange={setIsDocumentTypeDialogOpen}
        >
          <DialogContent className="sm:max-w-lg">
            {selectedDocumentType && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedDocumentType.icon className="h-5 w-5 text-primary" />
                    {selectedDocumentType.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDocumentType.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Fee</Label>
                      <p className="text-lg font-bold text-primary">
                        {selectedDocumentType.fee}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Processing Time
                      </Label>
                      <p className="text-sm font-medium">
                        {selectedDocumentType.processingTime}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Category:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {selectedDocumentType.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Rush Processing:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedDocumentType.urgent
                          ? `Yes (${selectedDocumentType.urgentFee})`
                          : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Delivery Available:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedDocumentType.deliveryAvailable ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Requests:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedDocumentType.totalRequests}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Pending Requests:
                      </span>
                      <span className="text-sm font-medium text-warning">
                        {selectedDocumentType.pendingRequests}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Valid Purposes:
                    </Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedDocumentType.purposes.map((purpose, index) => (
                        <li key={index}>• {purpose}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedDocumentType.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedDocumentType.specialNote && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning font-medium">
                        Special Note:
                      </p>
                      <p className="text-sm text-warning/80">
                        {selectedDocumentType.specialNote}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDocumentTypeDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsDocumentTypeDialogOpen(false);
                      handleEditDocumentType(selectedDocumentType);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Document Type
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageDocuments;
