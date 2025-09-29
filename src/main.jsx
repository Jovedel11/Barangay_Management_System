import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./core/styles/global.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Toaster />
      <App />
    </StrictMode>
  </QueryClientProvider>
);
