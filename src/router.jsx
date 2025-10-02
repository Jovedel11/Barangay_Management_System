import { createBrowserRouter } from "react-router-dom";
import Home from "./app/public/page/Home";
import PublicLayout from "./app/public/layout/PublicLayout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./app/private/pages/Dashboard";
import ResidentLayout from "./app/private/layout/ResidentLayout";
import ManageBorrowItems from "./app/private/pages/ManageBorrowItems";
import BarangayDocuments from "./app/private/pages/BarangayDocuments";
import BarangayEvents from "./app/private/pages/BarangayEvents";
import BarangayServices from "./app/private/pages/BarangayServices";
import AdminLayout from "./app/admin/layout/AdminLayout";
import ManageDocuments from "./app/admin/pages/ManageDocuments";
import ManageItem from "./app/admin/pages/ManageItem";
import ManageServices from "./app/admin/pages/ManageServices";
import ManageEvents from "./app/admin/pages/ManageEvents";
import ManageUsers from "./app/admin/pages/ManageUsers";
import AdminDashboard from "./app/admin/pages/AdminDashboard";
import AdminProfile from "./app/admin/pages/AdminProfile";
import ResidentProfile from "./app/private/pages/ResidentProfile";
import ResidentSettings from "./app/private/pages/ResidentSettings";
import ResidentGetHelp from "./app/private/pages/ResidentGetHelp";
// import AdminLayout from "./app/admin/layout/AdminLayout";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/resident",
    element: <ResidentLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "manage-borrow-items",
        element: <ManageBorrowItems />,
      },
      {
        path: "barangay-documents",
        element: <BarangayDocuments />,
      },
      {
        path: "barangay-events",
        element: <BarangayEvents />,
      },
      {
        path: "barangay-services",
        element: <BarangayServices />,
      },
      {
        path: "profile",
        element: <ResidentProfile />,
      },
      {
        path: "settings",
        element: <ResidentSettings />,
      },
      {
        path: "help",
        element: <ResidentGetHelp />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "manage-items",
        element: <ManageItem />,
      },
      {
        path: "manage-documents",
        element: <ManageDocuments />,
      },
      {
        path: "manage-services",
        element: <ManageServices />,
      },
      {
        path: "manage-events",
        element: <ManageEvents />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-users/profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
