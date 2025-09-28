import { Calendar, Edit, Users, User, MapPin, Phone, Mail } from "lucide-react";
import { IconCalendarEvent } from "@tabler/icons-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import SearchFilterBar from "@/app/shared/components/search-filter-bar";
import TabNavigation from "@/app/shared/components/table-navigation";
import DataTable from "@/app/shared/components/data-table";
import ModalForm from "@/app/shared/components/modal-form";
import StatusBadge from "@/app/shared/components/status-badge";
import EventCard from "@/app/shared/components/event-card";

// Hook
import useManageEvents from "@/app/admin/hooks/useManageEvents";

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
import { Label } from "@/core/components/ui/label";

const ManageEvents = () => {
  const {
    // State
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedEvent,
    selectedRegistration,
    isEventDialogOpen,
    setIsEventDialogOpen,
    isRegistrationDetailsOpen,
    setIsRegistrationDetailsOpen,
    isProcessRegistrationOpen,
    setIsProcessRegistrationOpen,
    eventForm,
    setEventForm,
    processForm,
    setProcessForm,

    // Data
    filteredEvents,
    filteredRegistrations,

    // Loading states
    eventsLoading,
    registrationsLoading,

    // Configuration
    statusOptions,
    stats,
    tabs,
    eventFilters,
    registrationFilters,
    eventFormFields,
    pageHeaderActions,

    // Event handlers
    handleAddEvent,
    handleEditEvent,
    handleSubmitEvent,
    handleDeleteEvent,
    handleViewEvent,
    handleViewRegistrations,
    handleViewRegistrationDetails,
    handleProcessRegistration,
    handleSubmitProcessing,
    handleDeleteRegistration,
    handleExport,
    handleRefresh,
    toggleEventStatus,
    toggleFeaturedStatus,
  } = useManageEvents();

  // Registration table columns
  const registrationColumns = [
    {
      key: "registrationNumber",
      label: "Registration #",
      sortable: true,
    },
    {
      key: "residentName",
      label: "Participant",
      render: (value, registration) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            {registration.teamMembers}
          </p>
        </div>
      ),
    },
    {
      key: "eventTitle",
      label: "Event",
      render: (value, registration) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(registration.eventDate).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} type="event" />,
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (value, registration) => (
        <div className="space-y-1">
          <StatusBadge status={value} type="default" />
          <p className="text-sm text-muted-foreground">
            {registration.registrationFee}
          </p>
        </div>
      ),
    },
    {
      key: "registrationDate",
      label: "Registration Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Event Management"
          description="Manage barangay events, registrations, and community activities"
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

        {/* Events Tab */}
        {activeTab === "events" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <IconCalendarEvent className="h-5 w-5 text-primary" />
                    Barangay Events
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage community events, sports tournaments, and
                    celebrations
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={eventFilters}
                onAdd={handleAddEvent}
                onExport={handleExport}
                onRefresh={handleRefresh}
                addButtonText="Add New Event"
                searchPlaceholder="Search events, organizers..."
                showAddButton={false} // Already in page header
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                    onView={handleViewEvent}
                    onToggleStatus={toggleEventStatus}
                    onDelete={handleDeleteEvent}
                    onViewRegistrations={handleViewRegistrations}
                    onToggleFeatured={toggleFeaturedStatus}
                  />
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Events Found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    Event Registrations
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage resident event registrations and approvals
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={registrationFilters}
                onExport={handleExport}
                onRefresh={handleRefresh}
                searchPlaceholder="Search by name, registration number, or event..."
                showAddButton={false}
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredRegistrations}
                columns={registrationColumns}
                onView={handleViewRegistrationDetails}
                onEdit={handleProcessRegistration}
                onDelete={handleDeleteRegistration}
                emptyMessage="No registrations found"
                customActions={[
                  {
                    label: "Process Registration",
                    icon: Edit,
                    onClick: handleProcessRegistration,
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Event Modal */}
        <ModalForm
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          title={selectedEvent ? "Edit Event" : "Add New Event"}
          description={
            selectedEvent
              ? "Update event details and settings"
              : "Create a new barangay event"
          }
          fields={eventFormFields}
          formData={eventForm}
          setFormData={setEventForm}
          onSubmit={handleSubmitEvent}
          isLoading={eventsLoading}
          submitText={selectedEvent ? "Update Event" : "Create Event"}
          size="s"
        />

        {/* Process Registration Modal */}
        <ModalForm
          isOpen={isProcessRegistrationOpen}
          onClose={() => setIsProcessRegistrationOpen(false)}
          title="Process Registration"
          description={`Update the status for ${selectedRegistration?.registrationNumber}`}
          fields={[
            {
              name: "status",
              label: "Registration Status",
              type: "select",
              options: statusOptions.filter((s) => s.value !== "all"),
              required: true,
            },
            {
              name: "paymentStatus",
              label: "Payment Status",
              type: "select",
              options: [
                { value: "pending", label: "Pending" },
                { value: "paid", label: "Paid" },
                { value: "refunded", label: "Refunded" },
              ],
            },
            {
              name: "notes",
              label: "Processing Notes",
              type: "textarea",
              placeholder: "Add notes about the registration...",
            },
          ]}
          formData={processForm}
          setFormData={setProcessForm}
          onSubmit={handleSubmitProcessing}
          isLoading={registrationsLoading}
          submitText="Update Registration"
        />

        {/* Registration Details Dialog */}
        <Dialog
          open={isRegistrationDetailsOpen}
          onOpenChange={setIsRegistrationDetailsOpen}
        >
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedRegistration && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Registration Details -{" "}
                    {selectedRegistration.registrationNumber}
                  </DialogTitle>
                  <DialogDescription>
                    Complete information about this event registration
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Status and Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedRegistration.status}
                          type="event"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Payment Status
                      </Label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedRegistration.paymentStatus}
                          type="default"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Participant Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Participant Information
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {selectedRegistration.residentName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedRegistration.residentEmail}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedRegistration.residentPhone}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">
                          {selectedRegistration.residentAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Event Information
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Event:
                          </span>
                          <p className="font-medium">
                            {selectedRegistration.eventTitle}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Category:
                          </span>
                          <p className="font-medium capitalize">
                            {selectedRegistration.eventCategory}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Event Date:
                          </span>
                          <p className="font-medium">
                            {new Date(
                              selectedRegistration.eventDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Registration Fee:
                          </span>
                          <p className="font-medium text-primary">
                            {selectedRegistration.registrationFee}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Team/Participants:
                        </span>
                        <p className="text-sm mt-1">
                          {selectedRegistration.teamMembers}
                        </p>
                      </div>
                      {selectedRegistration.specialRequirements && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Special Requirements:
                          </span>
                          <p className="text-sm mt-1">
                            {selectedRegistration.specialRequirements}
                          </p>
                        </div>
                      )}
                      {selectedRegistration.notes && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Notes:
                          </span>
                          <p className="text-sm mt-1">
                            {selectedRegistration.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Processing Information */}
                  {selectedRegistration.processedBy && (
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
                              {selectedRegistration.processedBy}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Processed Date:
                            </span>
                            <p className="font-medium">
                              {new Date(
                                selectedRegistration.processedDate
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
                    onClick={() => setIsRegistrationDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsRegistrationDetailsOpen(false);
                      handleProcessRegistration(selectedRegistration);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Process Registration
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

export default ManageEvents;
