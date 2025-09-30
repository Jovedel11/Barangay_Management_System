import {
  Search,
  Clock,
  Package,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Eye,
  User,
  Truck,
  Home,
  Wallet,
  Info,
} from "lucide-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import StatusBadge from "@/app/shared/components/status-badge";

// UI Components
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
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";
import { Checkbox } from "@/core/components/ui/checkbox";

// Custom Hook
import useResidentItemBooking from "../hooks/useResidentItemBooking";

export default function ManageBorrowItems() {
  const {
    // State
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    selectedItem,
    isBookingDialogOpen,
    setIsBookingDialogOpen,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    bookingForm,
    setBookingForm,

    // Data
    filteredItems,
    userBookings,
    userProfile,
    stats,
    categories,

    // Loading states
    itemsLoading,
    bookingsLoading,

    // Event handlers
    handleBookItem,
    handleSubmitBooking,
    handleMarkAsReturned,
    handleViewDetails,
    handleRefresh,
  } = useResidentItemBooking();

  // Helper functions
  const getStatusBadge = (status, daysLeft) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active ({daysLeft} days left)
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Overdue ({Math.abs(daysLeft)} days)
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending Approval
          </Badge>
        );
      default:
        return <StatusBadge status={status} type="item" />;
    }
  };

  const getDeliveryStatusBadge = (method, status, paymentStatus) => {
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
      const statusStyles = {
        pending: "bg-warning/10 text-warning border-warning/30",
        scheduled: "bg-primary/10 text-primary border-primary/30",
        delivered: "bg-success/10 text-success border-success/30",
      };
      return (
        <Badge
          variant="outline"
          className={statusStyles[status] || statusStyles.pending}
        >
          <Truck className="h-3 w-3 mr-1" />
          {paymentStatus === "paid" ? "Delivery (Paid)" : "COD Delivery"}
        </Badge>
      );
    }
  };

  const getConditionBadge = (condition) => {
    const conditionStyles = {
      Excellent: "bg-success/10 text-success border-success/30",
      Good: "bg-primary/10 text-primary border-primary/30",
      Fair: "bg-warning/10 text-warning border-warning/30",
      Poor: "bg-destructive/10 text-destructive border-destructive/30",
    };
    return (
      <Badge className={conditionStyles[condition] || conditionStyles.Good}>
        {condition}
      </Badge>
    );
  };

  // Page header actions
  const pageHeaderActions = [
    {
      label: "Refresh",
      variant: "outline",
      onClick: handleRefresh,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Borrow Items"
          description="Book barangay equipment online • Pay and collect at barangay office"
          actions={pageHeaderActions}
        >
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              <User className="h-3 w-3 mr-1" />
              {userProfile.name} - Resident
            </Badge>
            {userProfile.isSenior && (
              <Badge className="bg-accent/10 text-accent border-accent/30">
                Senior Citizen - Free Delivery
              </Badge>
            )}
          </div>
        </PageHeader>

        {/* Statistics */}
        <StatsGrid stats={stats} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Available Items to Book */}
          <Card className="lg:col-span-2 bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Package className="h-5 w-5 text-primary" />
                    Available Items to Borrow
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Book online • Pay at barangay office when you pickup/receive
                  </CardDescription>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 pt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search items to borrow..."
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
              {itemsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">Loading items...</div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">
                                {item.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {getConditionBadge(item.condition)}
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Available:
                            </span>
                            <span className="font-medium text-success">
                              {item.available} units
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fee:</span>
                            <span className="font-medium text-primary">
                              {item.borrowingFee}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Max Days:
                            </span>
                            <span className="font-medium text-foreground">
                              {item.maxBorrowDays} days
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
                            disabled={item.available === 0}
                            onClick={() => handleBookItem(item)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Book Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(item)}
                            className="border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Current Bookings */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 h-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-accent" />
                My Bookings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track your borrowed items and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">
                    Loading bookings...
                  </div>
                </div>
              ) : (
                <div className="space-y-4s">
                  {userBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {booking.itemName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {booking.quantity}
                            </p>
                          </div>
                          {getStatusBadge(booking.status, booking.daysLeft)}
                        </div>

                        <div className="space-y-1">
                          {getDeliveryStatusBadge(
                            booking.deliveryMethod,
                            booking.deliveryStatus,
                            booking.paymentStatus
                          )}
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Purpose:</span>
                            <span className="text-foreground font-medium">
                              {booking.purpose}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className="text-foreground font-medium">
                              {booking.totalAmount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment:</span>
                            <span
                              className={`font-medium ${
                                booking.paymentStatus === "paid"
                                  ? "text-success"
                                  : "text-warning"
                              }`}
                            >
                              {booking.paymentStatus === "paid"
                                ? "Paid at Office"
                                : "Pending - Walk-in"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return Date:</span>
                            <span
                              className={`font-medium ${
                                booking.status === "overdue"
                                  ? "text-destructive"
                                  : "text-foreground"
                              }`}
                            >
                              {new Date(
                                booking.returnDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {booking.status === "overdue" && (
                          <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                            <p className="text-destructive font-medium">
                              Overdue Notice
                            </p>
                            <p className="text-destructive/80">
                              Please return immediately to barangay office
                            </p>
                          </div>
                        )}

                        {booking.status === "pending_approval" && (
                          <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                            <p className="text-warning font-medium">
                              Pending Approval
                            </p>
                            <p className="text-warning/80">
                              Admin will review your booking request
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {booking.status === "active" && (
                            <Button
                              size="sm"
                              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                              onClick={() => handleMarkAsReturned(booking.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark as Returned
                            </Button>
                          )}
                          {booking.status === "overdue" && (
                            <Button
                              size="sm"
                              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                              onClick={() => handleMarkAsReturned(booking.id)}
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Return Now
                            </Button>
                          )}
                          {booking.status === "pending_approval" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-warning/30 text-warning hover:bg-warning/10"
                              disabled
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Awaiting Approval
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10"
              >
                View Booking History
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
                    • <strong>Book online:</strong> Reserve items through this
                    system
                  </li>
                  <li>
                    • <strong>Visit barangay:</strong> Bring valid ID and
                    requirements
                  </li>
                  <li>
                    • <strong>Pay cash:</strong> All payments at barangay office
                    only
                  </li>
                  <li>
                    • <strong>Collect items:</strong> Take items or schedule
                    delivery
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  Special Delivery
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Senior Citizens:</strong> Free delivery service
                  </li>
                  <li>
                    • <strong>Pregnant Women:</strong> Priority delivery option
                  </li>
                  <li>
                    • <strong>Payment:</strong> Cash on delivery (COD)
                  </li>
                  <li>
                    • <strong>Deposits:</strong> Cash payment required
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

        {/* Booking Dialog */}
        <Dialog
          open={isBookingDialogOpen}
          onOpenChange={setIsBookingDialogOpen}
        >
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedItem.icon className="h-5 w-5 text-primary" />
                    Book {selectedItem.name}
                  </DialogTitle>
                  <DialogDescription>
                    Reserve this item • Payment at barangay office
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
                        max={selectedItem.available}
                        value={bookingForm.quantity}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            quantity: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Available</Label>
                      <p className="text-lg font-bold text-success">
                        {selectedItem.available}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="borrowDate">Borrow Date</Label>
                      <Input
                        id="borrowDate"
                        type="date"
                        value={bookingForm.borrowDate}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            borrowDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={bookingForm.returnDate}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            returnDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose/Event</Label>
                    <Input
                      id="purpose"
                      placeholder="e.g., Birthday party, Wedding, Meeting"
                      value={bookingForm.purpose}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          purpose: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Event Location</Label>
                    <Input
                      id="location"
                      placeholder="Complete address"
                      value={bookingForm.eventLocation}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          eventLocation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                      id="contact"
                      placeholder="09XXXXXXXXX"
                      value={bookingForm.contactNumber}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Collection Method Selection */}
                  <div className="space-y-3">
                    <Label>Collection Method</Label>
                    <RadioGroup
                      value={bookingForm.deliveryMethod}
                      onValueChange={(value) =>
                        setBookingForm({
                          ...bookingForm,
                          deliveryMethod: value,
                        })
                      }
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <div className="flex-1">
                          <Label
                            htmlFor="pickup"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Home className="h-4 w-4 text-primary" />
                            Walk-in Pickup at Barangay Office
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pay cash and collect at barangay hall
                          </p>
                        </div>
                      </div>

                      {selectedItem.deliveryAvailable && (
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <div className="flex-1">
                            <Label
                              htmlFor="delivery"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Truck className="h-4 w-4 text-accent" />
                              Home Delivery
                              {userProfile.isSenior && (
                                <Badge className="bg-success/10 text-success text-xs">
                                  Free for Seniors
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
                    bookingForm.deliveryMethod === "delivery" && (
                      <div className="space-y-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                        <Label className="text-sm font-medium">
                          Special Delivery Options
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pregnant"
                            checked={bookingForm.specialRequirements.isPregnant}
                            onCheckedChange={(checked) =>
                              setBookingForm({
                                ...bookingForm,
                                specialRequirements: {
                                  ...bookingForm.specialRequirements,
                                  isPregnant: checked,
                                },
                              })
                            }
                          />
                          <Label
                            htmlFor="pregnant"
                            className="text-sm cursor-pointer"
                          >
                            I am pregnant (Priority delivery - Cash on delivery)
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
                      {selectedItem.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Payment Information */}
                  <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Wallet className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <Label className="text-sm font-medium text-warning">
                          Payment Information:
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>
                            <strong>Fee:</strong> {selectedItem.borrowingFee}
                          </p>
                          <p>
                            <strong>Payment:</strong> Cash only at barangay
                            office
                          </p>
                          {bookingForm.deliveryMethod === "delivery" && (
                            <p>
                              <strong>Delivery:</strong>{" "}
                              {userProfile.isSenior ||
                              bookingForm.specialRequirements.isPregnant
                                ? "Free COD"
                                : "COD with delivery fee"}
                            </p>
                          )}
                          <p>
                            <strong>Max period:</strong>{" "}
                            {selectedItem.maxBorrowDays} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Important Notes:
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {selectedItem.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsBookingDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleSubmitBooking}
                    disabled={itemsLoading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Booking Request
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Item Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="sm:max-w-md">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <selectedItem.icon className="h-5 w-5 text-primary" />
                    {selectedItem.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Available</Label>
                      <p className="text-2xl font-bold text-success">
                        {selectedItem.available}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Condition</Label>
                      <div className="mt-1">
                        {getConditionBadge(selectedItem.condition)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Borrowing Fee:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedItem.borrowingFee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Max Borrow Days:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedItem.maxBorrowDays} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Payment Method:
                      </span>
                      <span className="text-sm font-medium text-warning">
                        Walk-in Cash Only
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {selectedItem.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm text-warning font-medium">
                      Important:
                    </p>
                    <p className="text-sm text-warning/80">
                      {selectedItem.notes}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={selectedItem.available === 0}
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      handleBookItem(selectedItem);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book This Item
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
