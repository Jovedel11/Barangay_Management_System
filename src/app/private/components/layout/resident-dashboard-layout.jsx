import { SidebarProvider } from "@/core/components/ui/sidebar";
import { ResidentSidebar } from "./resident-sidebar";
import { ContentWrapper } from "../../../shared/components/content-wrapper";

export function ResidentDashboardLayout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <div className="flex flex-1 overflow-hidden">
        <ResidentSidebar />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </SidebarProvider>
  );
}
