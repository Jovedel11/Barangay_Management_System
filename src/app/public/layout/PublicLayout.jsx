import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollTop from "@/core/components/scroll-top";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollTop />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
