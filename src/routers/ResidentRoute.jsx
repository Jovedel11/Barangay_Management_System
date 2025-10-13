import { Routes, Route, Navigate } from "react-router-dom";
import ResidentLayout from "@/app/private/layout/ResidentLayout";
import Dashboard from "@/app/private/pages/Dashboard";
import ManageBorrowItems from "@/app/private/pages/ManageBorrowItems";
import BarangayDocuments from "@/app/private/pages/BarangayDocuments";
import BarangayEvents from "@/app/private/pages/BarangayEvents";
import BarangayServices from "@/app/private/pages/BarangayServices";
import ResidentProfile from "@/app/private/pages/ResidentProfile";
import ResidentGetHelp from "@/app/private/pages/ResidentGetHelp";

const ResidentRoute = () => {
  return (
    <Routes>
      <Route element={<ResidentLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-borrow-items" element={<ManageBorrowItems />} />
        <Route path="barangay-documents" element={<BarangayDocuments />} />
        <Route path="barangay-events" element={<BarangayEvents />} />
        <Route path="barangay-services" element={<BarangayServices />} />
        <Route path="profile" element={<ResidentProfile />} />
        <Route path="help" element={<ResidentGetHelp />} />
        <Route
          path="*"
          element={<Navigate to="/resident/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
};

export default ResidentRoute;
