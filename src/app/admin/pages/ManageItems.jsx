import { Package, BookOpen, CheckCircle } from "lucide-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import SearchFilterBar from "@/app/shared/components/search-filter-bar";
import TabNavigation from "@/app/shared/components/table-navigation";
import DataTable from "@/app/shared/components/data-table";
import ModalForm from "@/app/shared/components/modal-form";
import StatusBadge from "@/app/shared/components/status-badge";
import ItemCard from "@/app/shared/components/item-card";

// Hook
import useManageItem from "@/app/admin/hooks/useManageItem";

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

const ManageItems = () => {
  const {
    // State
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedBooking,
    isItemDialogOpen,
    setIsItemDialogOpen,
    isBookingDetailsOpen,
    setIsBookingDetailsOpen,
    isProcessBookingOpen,
    setIsProcessBookingOpen,
    itemForm,
    setItemForm,
    processForm,
    setProcessForm,
    selectedItem,

    // Data
    filteredItems,
    filteredBookings,

    // Loading states
    itemsLoading,
    bookingsLoading,

    // Configuration
    statusOptions,
    stats,
    tabs,
    itemFilters,
    bookingFilters,
    itemFormFields,
    pageHeaderActions,

    // Event handlers
    handleAddItem,
    handleEditItem,
    handleSubmitItem,
    handleDeleteItem,
    handleViewBookingDetails,
    handleProcessBooking,
    handleSubmitProcessing,
    handleExport,
    handleRefresh,
    toggleItemStatus,
    cancelBooking,
  } = useManageItem();

  // Helper functions
  const getDeliveryBadge = (method, status, isPregnant, isSenior) => {
    if (method === "pickup") {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          Walk-in Pickup
        </Badge>
      );
    } else {
      const statusStyles = {
        pending: "bg-muted/10 text-muted-foreground border-muted/30",
        scheduled: "bg-primary/10 text-primary border-primary/30",
        delivered: "bg-success/10 text-success border-success/30",
      };
      return (
        <Badge
          variant="outline"
          className={statusStyles[status] || statusStyles.pending}
        >
          {isPregnant || isSenior ? "Free Delivery" : "COD Delivery"}
        </Badge>
      );
    }
  };

  // Booking table columns
  const bookingColumns = [
    {
      key: "bookingNumber",
      label: "Booking #",
      sortable: true,
    },
    {
      key: "residentName",
      label: "Resident",
      render: (value, booking) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            {booking.residentEmail}
          </p>
        </div>
      ),
    },
    {
      key: "itemName",
      label: "Item",
      render: (value, booking) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">
            Qty: {booking.quantity} • {booking.purpose}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value, booking) => <StatusBadge status={value} type="item" />,
    },
    {
      key: "borrowDate",
      label: "Dates",
      render: (value, booking) => (
        <div className="text-sm">
          <p className="font-medium">
            {new Date(value).toLocaleDateString()} -
          </p>
          <p
            className={
              booking.status === "overdue"
                ? "text-destructive font-medium"
                : "text-muted-foreground"
            }
          >
            {new Date(booking.returnDate).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      key: "deliveryMethod",
      label: "Delivery",
      render: (value, booking) =>
        getDeliveryBadge(
          value,
          booking.deliveryStatus,
          booking.isPregnant,
          booking.isSenior
        ),
    },
    {
      key: "totalAmount",
      label: "Amount",
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
          title="Item Management"
          description="Manage inventory, track bookings, and process resident requests"
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

        {/* Items Inventory Tab */}
        {activeTab === "items" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Package className="h-5 w-5 text-primary" />
                    Items Inventory
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage available items and their details
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={itemFilters}
                onAdd={handleAddItem}
                onExport={handleExport}
                onRefresh={handleRefresh}
                addButtonText="Add New Item"
                searchPlaceholder="Search items..."
                showAddButton={false} // Already in page header
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onEdit={handleEditItem}
                    onView={(item) => console.log("View item:", item)}
                    onToggleStatus={toggleItemStatus}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Item Bookings
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Review and manage resident booking requests
                  </CardDescription>
                </div>
              </div>

              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={bookingFilters}
                onExport={handleExport}
                onRefresh={handleRefresh}
                searchPlaceholder="Search by name, booking number, or item..."
                showAddButton={false}
                className="pt-4"
              />
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredBookings}
                columns={bookingColumns}
                onView={handleViewBookingDetails}
                onEdit={handleProcessBooking}
                onDelete={(booking) =>
                  cancelBooking(booking.id, "Cancelled by admin")
                }
                emptyMessage="No bookings found"
                customActions={[
                  {
                    label: "Process Booking",
                    icon: CheckCircle,
                    onClick: handleProcessBooking,
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Item Modal */}
        <ModalForm
          isOpen={isItemDialogOpen}
          onClose={() => setIsItemDialogOpen(false)}
          title={selectedItem ? "Edit Item" : "Add New Item"}
          description={
            selectedItem
              ? "Update item details and settings"
              : "Add a new item to the inventory"
          }
          fields={itemFormFields}
          formData={itemForm}
          setFormData={setItemForm}
          onSubmit={handleSubmitItem}
          isLoading={itemsLoading}
          submitText={selectedItem ? "Update Item" : "Add Item"}
          size="lg"
        />

        {/* Booking Details Dialog */}
        <Dialog
          open={isBookingDetailsOpen}
          onOpenChange={setIsBookingDetailsOpen}
        >
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedBooking && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Booking Details - {selectedBooking.bookingNumber}
                  </DialogTitle>
                  <DialogDescription>
                    Complete information about this booking request
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Booking details content - simplified for brevity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <StatusBadge
                          status={selectedBooking.status}
                          type="item"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Booking Date
                      </Label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(selectedBooking.bookingDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Add more booking details as needed */}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsBookingDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setIsBookingDetailsOpen(false);
                      handleProcessBooking(selectedBooking);
                    }}
                  >
                    Process Booking
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Process Booking Dialog */}
        <ModalForm
          isOpen={isProcessBookingOpen}
          onClose={() => setIsProcessBookingOpen(false)}
          title="Process Booking"
          description={`Update the status and details for ${selectedBooking?.bookingNumber}`}
          fields={[
            {
              name: "status",
              label: "Status",
              type: "select",
              options: statusOptions.filter((s) => s.value !== "all"),
              required: true,
            },
            {
              name: "returnDate",
              label: "Expected Return Date",
              type: "date",
            },
            {
              name: "notes",
              label: "Processing Notes",
              type: "textarea",
              placeholder: "Add notes about the booking status...",
            },
          ]}
          formData={processForm}
          setFormData={setProcessForm}
          onSubmit={handleSubmitProcessing}
          isLoading={bookingsLoading}
          submitText="Update Booking"
        />
      </div>
    </div>
  );
};

export default ManageItems;
