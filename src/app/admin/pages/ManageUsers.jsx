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
import SearchFilterBar from "@/app/shared/components/search-filter-bar";
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

          case "occupationIncome":
            return (
              <div>
                <p className="font-medium text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">
                  {item.monthlyIncome}
                </p>
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
          description="Manage all residents, registered users, and pending signups"
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
        <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "residents" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("residents")}
            className={
              activeTab === "residents"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            <Users className="h-4 w-4 mr-2" />
            All Residents
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("users")}
            className={
              activeTab === "users"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Registered Users
          </Button>
          <Button
            variant={activeTab === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("pending")}
            className={
              activeTab === "pending"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Pending Signups
            {pendingSignups.filter((p) => p.status === "pending_approval")
              .length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-warning/20 text-warning rounded-full">
                {
                  pendingSignups.filter((p) => p.status === "pending_approval")
                    .length
                }
              </span>
            )}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={getFilters()}
              searchPlaceholder={
                activeTab === "residents"
                  ? "Search residents..."
                  : activeTab === "users"
                  ? "Search users..."
                  : "Search pending signups..."
              }
              showAddButton={false}
              showExportButton={false}
              onRefresh={refreshData}
            />
          </CardContent>
        </Card>

        {/* Pending Signups Alert */}
        {activeTab === "pending" &&
          pendingSignups.filter((p) => p.status === "pending_approval").length >
            0 && (
            <Alert className="border-warning/30 bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">
                Attention Required
              </AlertTitle>
              <AlertDescription className="text-warning/80">
                You have{" "}
                {
                  pendingSignups.filter((p) => p.status === "pending_approval")
                    .length
                }{" "}
                pending signup(s) that require your review and approval.
              </AlertDescription>
            </Alert>
          )}

        {/* Content based on active tab */}
        {activeTab === "residents" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    All Barangay Residents
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete list of all residents in the barangay
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={residents}
                columns={getTableColumns()}
                onView={(item) => handleViewDetails(item, "resident")}
                onEdit={(item) => handleEdit(item, "resident")}
                onDelete={(item) => handleDelete(item, "resident")}
                emptyMessage="No residents found"
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "users" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Registered Users
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Residents with active system accounts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={users}
                columns={getTableColumns()}
                onView={(item) => handleViewDetails(item, "user")}
                onEdit={(item) => handleEdit(item, "user")}
                onDelete={(item) => handleDelete(item, "user")}
                customActions={[
                  {
                    label: "Suspend Account",
                    onClick: handleSuspend,
                    className: "text-warning",
                  },
                  {
                    label: "Reset Password",
                    onClick: handleResetPassword,
                  },
                ]}
                emptyMessage="No registered users found"
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "pending" && (
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Pending Signups
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    New account requests awaiting admin approval
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingSignups.map((signup) => (
                  <PendingSignupCard
                    key={signup.id}
                    signup={signup}
                    onViewDetails={(item) => handleViewDetails(item, "pending")}
                    onProcess={handleProcess}
                    onApprove={(item) =>
                      processPendingSignup(item.id, "approve")
                    }
                    onReject={(item) => processPendingSignup(item.id, "reject")}
                  />
                ))}
              </div>
              {pendingSignups.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No pending signups found
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
          onEdit={handleEdit}
        />

        <ModalForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${modalType === "user" ? "User Account" : "Resident"}`}
          description={`Update ${
            modalType === "user" ? "user account" : "resident"
          } information and settings`}
          fields={modalType === "user" ? userFormFields : residentFormFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={
            modalType === "user" ? handleSubmitUser : handleSubmitResident
          }
          isLoading={isLoading}
          submitText="Update"
          size="xl"
        />

        <ModalForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Resident"
          description="Register a new resident in the barangay system"
          fields={residentFormFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitResident}
          isLoading={isLoading}
          submitText="Add Resident"
          size="xl"
        />

        <ModalForm
          isOpen={isProcessModalOpen}
          onClose={() => setIsProcessModalOpen(false)}
          title="Process Application"
          description={`Review and process ${selectedItem?.firstName} ${selectedItem?.lastName}'s application`}
          fields={pendingProcessFormFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitProcess}
          isLoading={isLoading}
          submitText="Process Application"
          size="s"
        />
      </div>
    </div>
  );
};

export default ManageUsers;
