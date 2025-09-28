import { Calendar, Edit, User, MapPin, Phone } from "lucide-react";
import { IconStethoscope } from "@tabler/icons-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import SearchFilterBar from "@/app/shared/components/search-filter-bar";
import TabNavigation from "@/app/shared/components/table-navigation";
import DataTable from "@/app/shared/components/data-table";
import ModalForm from "@/app/shared/components/modal-form";
import StatusBadge from "@/app/shared/components/status-badge";
import ServiceCard from "@/app/shared/components/service-card";

// Hook
import useManageServices from "@/app/admin/hooks/useManageServices";

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

const ManageServices = () => {
  const {
    // State
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedService,
    selectedAppointment,
    isServiceDialogOpen,
    setIsServiceDialogOpen,
    isAppointmentDetailsOpen,
    setIsAppointmentDetailsOpen,
    isProcessAppointmentOpen,
    setIsProcessAppointmentOpen,
    isServiceDetailsOpen,
    setIsServiceDetailsOpen,
    serviceForm,
    setServiceForm,
    processForm,
    setProcessForm,

    // Data
    filteredServices,
    filteredAppointments,

    // Loading states
    servicesLoading,
    appointmentsLoading,

    // Configuration
    statusOptions,
    stats,
    tabs,
    serviceFilters,
    appointmentFilters,
    serviceFormFields,
    pageHeaderActions,

    // Event handlers
    handleAddService,
    handleEditService,
    handleSubmitService,
    handleDeleteService,
    handleViewServiceDetails,
    handleViewAppointmentDetails,
    handleProcessAppointment,
    handleSubmitProcessing,
    handleDeleteAppointment,
    handleExport,
    handleRefresh,
    toggleServiceStatus,
  } = useManageServices();

  // Appointment table columns
  const appointmentColumns = [
    {
      key: "appointmentNumber",
      label: "Appointment #",
      sortable: true,
    },
    {
      key: "residentName",
      label: "Resident",
      render: (value, appointment) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            {appointment.residentEmail}
          </p>
        </div>
      ),
    },
    {
      key: "serviceName",
      label: "Service",
      render: (value, appointment) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {appointment.serviceCategory}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} type="service" />,
    },
    {
      key: "appointmentDate",
      label: "Date & Time",
      render: (value, appointment) => (
        <div className="text-sm">
          <p className="font-medium">{new Date(value).toLocaleDateString()}</p>
          <p className="text-muted-foreground">{appointment.appointmentTime}</p>
        </div>
      ),
    },
    {
      key: "specialRequirements",
      label: "Special Notes",
      render: (value, appointment) => (
        <div className="flex flex-col gap-1">
          {appointment.isSenior && (
            <Badge className="bg-success/10 text-success text-xs">Senior</Badge>
          )}
          {appointment.isPregnant && (
            <Badge className="bg-accent/10 text-accent text-xs">Pregnant</Badge>
          )}
          {value && (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Service Management"
          description="Manage barangay services, appointments, and resident requests"
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

        {/* Services Tab */}
        {activeTab === "services" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <IconStethoscope className="h-5 w-5 text-primary" />
                    Barangay Services
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage available services and their details
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={serviceFilters}
                onAdd={handleAddService}
                onExport={handleExport}
                onRefresh={handleRefresh}
                addButtonText="Add New Service"
                searchPlaceholder="Search services..."
                showAddButton={false} // Already in page header
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={handleEditService}
                    onView={handleViewServiceDetails}
                    onToggleStatus={toggleServiceStatus}
                    onDelete={handleDeleteService}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    Service Appointments
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage resident service appointments and requests
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={appointmentFilters}
                onExport={handleExport}
                onRefresh={handleRefresh}
                searchPlaceholder="Search by name, appointment number, or service..."
                showAddButton={false}
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredAppointments}
                columns={appointmentColumns}
                onView={handleViewAppointmentDetails}
                onEdit={handleProcessAppointment}
                onDelete={handleDeleteAppointment}
                emptyMessage="No appointments found"
                customActions={[
                  {
                    label: "Process Appointment",
                    icon: Edit,
                    onClick: handleProcessAppointment,
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Service Modal */}
        <ModalForm
          isOpen={isServiceDialogOpen}
          onClose={() => setIsServiceDialogOpen(false)}
          title={selectedService ? "Edit Service" : "Add New Service"}
          description={
            selectedService
              ? "Update service details and settings"
              : "Add a new service to the barangay"
          }
          fields={serviceFormFields}
          formData={serviceForm}
          setFormData={setServiceForm}
          onSubmit={handleSubmitService}
          isLoading={servicesLoading}
          submitText={selectedService ? "Update Service" : "Add Service"}
          size="lg"
        />

        {/* Process Appointment Modal */}
        <ModalForm
          isOpen={isProcessAppointmentOpen}
          onClose={() => setIsProcessAppointmentOpen(false)}
          title="Process Appointment"
          description={`Update the status and details for ${selectedAppointment?.appointmentNumber}`}
          fields={[
            {
              name: "status",
              label: "Status",
              type: "select",
              options: statusOptions.filter((s) => s.value !== "all"),
              required: true,
            },
            {
              name: "appointmentDate",
              label: "Appointment Date",
              type: "date",
            },
            {
              name: "notes",
              label: "Processing Notes",
              type: "textarea",
              placeholder: "Add notes about the appointment...",
            },
          ]}
          formData={processForm}
          setFormData={setProcessForm}
          onSubmit={handleSubmitProcessing}
          isLoading={appointmentsLoading}
          submitText="Update Appointment"
        />

        {/* Appointment Details Dialog */}
        <Dialog
          open={isAppointmentDetailsOpen}
          onOpenChange={setIsAppointmentDetailsOpen}
        >
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedAppointment && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Appointment Details -{" "}
                    {selectedAppointment.appointmentNumber}
                  </DialogTitle>
                  <DialogDescription>
                    Complete information about this service appointment
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Status and Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedAppointment.status}
                          type="service"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Request Date
                      </Label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(
                          selectedAppointment.requestDate
                        ).toLocaleString()}
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
                          {selectedAppointment.residentName}
                        </span>
                        {selectedAppointment.isSenior && (
                          <Badge className="bg-success/10 text-success text-xs">
                            Senior
                          </Badge>
                        )}
                        {selectedAppointment.isPregnant && (
                          <Badge className="bg-accent/10 text-accent text-xs">
                            Pregnant
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedAppointment.residentPhone}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">
                          {selectedAppointment.residentAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Service Information
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Service:
                          </span>
                          <p className="font-medium">
                            {selectedAppointment.serviceName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Category:
                          </span>
                          <p className="font-medium capitalize">
                            {selectedAppointment.serviceCategory}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Appointment Date:
                          </span>
                          <p className="font-medium">
                            {new Date(
                              selectedAppointment.appointmentDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Time:
                          </span>
                          <p className="font-medium">
                            {selectedAppointment.appointmentTime}
                          </p>
                        </div>
                      </div>
                      {selectedAppointment.specialRequirements && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Special Requirements:
                          </span>
                          <p className="text-sm mt-1">
                            {selectedAppointment.specialRequirements}
                          </p>
                        </div>
                      )}
                      {selectedAppointment.notes && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Notes:
                          </span>
                          <p className="text-sm mt-1">
                            {selectedAppointment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Processing Information */}
                  {selectedAppointment.processedBy && (
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
                              {selectedAppointment.processedBy}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Processed Date:
                            </span>
                            <p className="font-medium">
                              {new Date(
                                selectedAppointment.processedDate
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAppointmentDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsAppointmentDetailsOpen(false);
                      handleProcessAppointment(selectedAppointment);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Process Appointment
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Service Details Dialog */}
        <Dialog
          open={isServiceDetailsOpen}
          onOpenChange={setIsServiceDetailsOpen}
        >
          <DialogContent className="sm:max-w-lg">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedService.icon className="h-5 w-5 text-primary" />
                    {selectedService.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedService.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Cost</Label>
                      <p className="text-lg font-bold text-primary">
                        {selectedService.cost}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Service Type
                      </Label>
                      <p className="text-sm font-medium capitalize">
                        {selectedService.serviceType}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Schedule:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.schedule}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Time:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Location:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Available Slots:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.slots}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Contact:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.contact}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Phone:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedService.phone}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedService.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Details:</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedService.details}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsServiceDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsServiceDetailsOpen(false);
                      handleEditService(selectedService);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Service
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

export default ManageServices;
