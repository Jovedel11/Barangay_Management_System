import { Users, UserCheck, UserPlus, AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/core/components/ui/alert";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import DataTable from "@/app/shared/components/data-table";
import UserDetailsModal from "@/app/shared/components/user-details-modal";
import PendingSignupCard from "@/app/shared/components/pending-signup-card";
import ModalForm from "@/app/shared/components/modal-form";

// Hook
import useManageUsers from "@/app/admin/hooks/useManageUsers";

const ManageUsers = () => {
  const {
    // Data
    residents,
    users,
    pendingSignups,

    // State
    isLoading,
    error,
    searchTerm,
    activeTab,
    setActiveTab,
    setSearchTerm,

    // Modal states
    selectedItem,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    isProcessModalOpen,
    setIsProcessModalOpen,
    modalType,
    formData,
    setFormData,

    // Configurations
    getFilters,
    getStatsWithIcons,
    getTableColumnsConfig,
    pageHeaderActions,
    residentFormFields,
    userFormFields,
    pendingProcessFormFields,

    // Event handlers
    handleViewDetails,
    handleEdit,
    handleAdd,
    handleProcess,
    handleDelete,
    handleSuspend,
    handleResetPassword,
    handleSubmitResident,
    handleSubmitUser,
    handleSubmitProcess,
    refreshData,
    processPendingSignup,
  } = useManageUsers();

  // Convert column config to actual columns with JSX
  const getTableColumns = () => {
    const columnsConfig = getTableColumnsConfig();

    return columnsConfig.map((column) => ({
      ...column,
      render: (value, item) => {
        switch (column.type) {
          case "nameWithId":
            return (
              <div>
                <p className="font-medium text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">
                  ID: {column.idPrefix}
                  {item.id.toString().padStart(4, "0")}
                </p>
              </div>
            );

          case "ageGender":
            return (
              <div>
                <p className="font-medium text-foreground">{value} years old</p>
                <p className="text-sm text-muted-foreground">{item.gender}</p>
              </div>
            );

          case "contactInfo":
            return (
              <div>
                <p className="font-medium text-foreground">{value}</p>
                {item.email && (
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                )}
              </div>
            );

          case "userInfo":
            return (
              <div>
                <p className="font-medium text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">
                  @{item.username} • {item.userId}
                </p>
              </div>
            );

          case "userContact":
            return (
              <div>
                <p className="font-medium text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">
                  {item.phoneNumber}
                </p>
              </div>
            );

          case "role":
            return (
              <p className="font-medium text-foreground">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </p>
            );

          case "activity":
            return (
              <div>
                <p className="font-medium text-foreground">{value} logins</p>
                <p className="text-sm text-muted-foreground">
                  Last: {new Date(item.lastLogin).toLocaleDateString()}
                </p>
              </div>
            );

          default:
            return <p className="font-medium text-foreground">{value}</p>;
        }
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Header */}
        <PageHeader
          title="User Management"
          description="Manage barangay residents, system users, and review new applications"
          actions={pageHeaderActions}
        />

        {/* Error Alert */}
        {error && (
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Error</AlertTitle>
            <AlertDescription className="text-destructive/80">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics */}
        <StatsGrid stats={getStatsWithIcons()} />

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted/30 border border-border p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "residents" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("residents")}
            className={
              activeTab === "residents"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }
          >
            <Users className="h-4 w-4 mr-2" />
            Residents ({residents.length})
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("users")}
            className={
              activeTab === "users"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }
          >
            <UserCheck className="h-4 w-4 mr-2" />
            System Users ({users.length})
          </Button>
          <Button
            variant={activeTab === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("pending")}
            className={
              activeTab === "pending"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }
          >
            <UserPlus className="h-4 w-4 mr-2" />
            New Applications
            {pendingSignups.filter((p) => p.status === "pending_approval")
              .length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-warning/20 text-warning border border-warning/30 rounded-full">
                {
                  pendingSignups.filter((p) => p.status === "pending_approval")
                    .length
                }
              </span>
            )}
          </Button>
        </div>

        {/* New Applications Alert */}
        {activeTab === "pending" &&
          pendingSignups.filter((p) => p.status === "pending_approval").length >
            0 && (
            <Alert className="border-warning/30 bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">
                New Applications Pending Review
              </AlertTitle>
              <AlertDescription className="text-warning/80">
                {
                  pendingSignups.filter((p) => p.status === "pending_approval")
                    .length
                }{" "}
                new resident
                {pendingSignups.filter((p) => p.status === "pending_approval")
                  .length > 1
                  ? "s have"
                  : " has"}{" "}
                applied for barangay registration and require your approval.
              </AlertDescription>
            </Alert>
          )}

        {/* Content based on active tab */}
        {activeTab === "residents" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    Registered Residents
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    All officially registered residents in the barangay
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <DataTable
                data={residents}
                columns={getTableColumns()}
                onView={(item) => handleViewDetails(item, "resident")}
                onEdit={(item) => handleEdit(item, "resident")}
                onDelete={(item) => handleDelete(item, "resident")}
                emptyMessage="No residents found"
                isLoading={isLoading}
                customActions={[
                  {
                    label: "Update Information",
                    onClick: (item) => handleEdit(item, "resident"),
                    className: "text-primary hover:text-primary/80",
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "users" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <UserCheck className="h-5 w-5 text-primary" />
                    System Users
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Residents with access to the barangay online system
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <DataTable
                data={users}
                columns={getTableColumns()}
                onView={(item) => handleViewDetails(item, "user")}
                onEdit={(item) => handleEdit(item, "user")}
                onDelete={(item) => handleDelete(item, "user")}
                customActions={[
                  {
                    label: "Manage Account",
                    onClick: (item) => handleEdit(item, "user"),
                    className: "text-primary hover:text-primary/80",
                  },
                  {
                    label: "Suspend Account",
                    onClick: handleSuspend,
                    className: "text-warning hover:text-warning/80",
                  },
                  {
                    label: "Reset Password",
                    onClick: handleResetPassword,
                    className: "text-accent hover:text-accent/80",
                  },
                ]}
                emptyMessage="No system users found"
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "pending" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <UserPlus className="h-5 w-5 text-primary" />
                    New Applications
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Review and process new resident registration applications
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: {pendingSignups.length} applications
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {pendingSignups.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingSignups.map((signup) => (
                    <PendingSignupCard
                      key={signup.id}
                      signup={signup}
                      onViewDetails={(item) =>
                        handleViewDetails(item, "pending")
                      }
                      onProcess={handleProcess}
                      onApprove={(item) =>
                        processPendingSignup(item.id, "approve")
                      }
                      onReject={(item) =>
                        processPendingSignup(item.id, "reject")
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <UserPlus className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Pending Applications
                  </h3>
                  <p className="text-muted-foreground">
                    All registration applications have been processed. New
                    applications will appear here for your review.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <UserDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          user={selectedItem}
          type={modalType}
          onEdit={modalType === "pending" ? null : handleEdit} // No edit for pending applications
        />

        {/* Edit Modal - Only for Residents and Users */}
        {modalType !== "pending" && (
          <ModalForm
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Update ${
              modalType === "user" ? "User Account" : "Resident Information"
            }`}
            description={`Modify ${
              modalType === "user"
                ? "user account settings and permissions"
                : "resident personal and contact information"
            }`}
            fields={modalType === "user" ? userFormFields : residentFormFields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={
              modalType === "user" ? handleSubmitUser : handleSubmitResident
            }
            isLoading={isLoading}
            submitText="Save Changes"
            size="xl"
          />
        )}

        {/* Add New Resident Modal */}
        <ModalForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Resident"
          description="Add a new resident to the barangay registry with their complete information"
          fields={residentFormFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitResident}
          isLoading={isLoading}
          submitText="Register Resident"
          size="xl"
        />

        {/* Process Application Modal - Only for Pending */}
        <ModalForm
          isOpen={isProcessModalOpen}
          onClose={() => setIsProcessModalOpen(false)}
          title="Process Application"
          description={`Review and make a decision on ${selectedItem?.firstName} ${selectedItem?.lastName}'s registration application`}
          fields={pendingProcessFormFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitProcess}
          isLoading={isLoading}
          submitText="Process Application"
          size="lg"
        />
      </div>
    </div>
  );
};

export default ManageUsers;
