import React from "react";
import { Outlet } from "react-router-dom";
import { AdminDashboardLayout } from "../components/layout/admin-dashboard-layout";

const AdminLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-[#F1FAEE]">
        <AdminDashboardLayout>
          <Outlet />
        </AdminDashboardLayout>
      </div>
    </>
  );
};

export default AdminLayout;
