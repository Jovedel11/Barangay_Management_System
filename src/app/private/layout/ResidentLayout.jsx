import React from "react";
import { ThemeProvider } from "@/core/contexts/ThemeProvider";
import { Outlet } from "react-router-dom";
import { ResidentDashboardLayout } from "../components/layout/resident-dashboard-layout";

const ResidentLayout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dentserve-theme">
      <div className="min-h-screen bg-[#F1FAEE]">
        <ResidentDashboardLayout>
          <Outlet />
        </ResidentDashboardLayout>
      </div>
    </ThemeProvider>
  );
};

export default ResidentLayout;
