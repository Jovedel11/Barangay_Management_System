import { createBrowserRouter } from "react-router-dom";
import Home from "./app/public/page/Home";
import PublicLayout from "./app/public/layout/PublicLayout";
import About from "./app/public/page/About";
import Contact from "./app/public/page/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./app/private/pages/Dashboard";
import ResidentLayout from "./app/private/layout/ResidentLayout";
import ManageBorrowItems from "./app/private/pages/ManageBorrowItems";
import BarangayDocuments from "./app/private/pages/BarangayDocuments";
import BarangayEvents from "./app/private/pages/BarangayEvents";
import BarangayServices from "./app/private/pages/BarangayServices";
import AdminLayout from "./app/admin/layout/AdminLayout";
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
