import { createBrowserRouter } from "react-router-dom";
import Home from "./app/public/page/Home";
import PublicLayout from "./app/public/layout/PublicLayout";
import About from "./app/public/page/About";
import Contact from "./app/public/page/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// import Dashboard from "./app/private/pages/Dashboard";
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
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
  // {
  //   path: "/admin-dashboard",
  //   element: <AdminLayout />,
  // },
]);
