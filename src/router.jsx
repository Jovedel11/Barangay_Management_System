import { createBrowserRouter } from "react-router-dom";
import Home from "./app/public/page/Home";
import PublicLayout from "./app/public/layout/PublicLayout";
import About from "./app/public/page/About";
import Contact from "./app/public/page/Contact";

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
    ],
  },
]);
