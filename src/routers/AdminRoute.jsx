import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import AdminDashboard from "@/app/admin/pages/AdminDashboard";
import ManageItem from "@/app/admin/pages/ManageItem";
import ManageDocuments from "@/app/admin/pages/ManageDocuments";
import ManageServices from "@/app/admin/pages/ManageServices";
import ManageEvents from "@/app/admin/pages/ManageEvents";
import ManageUsers from "@/app/admin/pages/ManageUsers";
import AdminProfile from "@/app/admin/pages/AdminProfile";
import { useAuth } from "@/hooks/useAuthProvider";
import { useEffect } from "react";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const checkRole = () => {
      if (user?.role === "resident") {
        return navigate("/resident/dashoard");
      } else if (!user?.role && user?.role !== "admin") {
        return navigate("/login");
      }
    };
    if (!isLoading) checkRole();
  }, [user, isLoading, navigate]);

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-items" element={<ManageItem />} />
        <Route path="manage-documents" element={<ManageDocuments />} />
        <Route path="manage-services" element={<ManageServices />} />
        <Route path="manage-events" element={<ManageEvents />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-users/profile" element={<AdminProfile />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
