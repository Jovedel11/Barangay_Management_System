import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { FileCheck, FileText, Home, Briefcase, Folder } from "lucide-react";

const DocsView = ({ children, selectedDocument }) => {
  // Icon mapping based on category
  const getIcon = (category) => {
    const iconMap = {
      "Barangay Clearance": FileCheck,
      "Indengency Certificate": FileText,
      "Residency Certificate": Home,
      "Business Permit": Briefcase,
      Other: Folder,
    };
    return iconMap[category] || Folder;
  };

  // Helper function to parse string into array (split by newlines or commas)
  const parseStringToArray = (str) => {
    if (!str) return [];
    if (Array.isArray(str)) return str;

    // Try splitting by newlines first, then by commas if no newlines
    const lines = str
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length > 1) return lines;

    return str
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const Icon = selectedDocument ? getIcon(selectedDocument.category) : Folder;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {selectedDocument && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                {selectedDocument.name}
              </DialogTitle>
              <DialogDescription>
                {selectedDocument.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Fee</Label>
                  <p className="text-lg font-bold text-primary">
                    {selectedDocument.fee}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Processing Time</Label>
                  <p className="text-sm font-medium">
                    {selectedDocument.processingTime}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Payment Method:
                  </span>
                  <span className="text-sm font-medium text-warning">
                    Walk-in Cash Only
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Rush Processing:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedDocument.urgent
                      ? `Yes (${selectedDocument.urgentFee})`
                      : "No"}
                  </span>
                </div>
                {selectedDocument.urgent && selectedDocument.urgentTime && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rush Time:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedDocument.urgentTime}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Delivery Available:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedDocument.deliveryAvailable ? "Yes (COD)" : "No"}
                  </span>
                </div>
              </div>

              {selectedDocument.purposes && (
                <div>
                  <Label className="text-sm font-medium">Valid Purposes:</Label>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {parseStringToArray(selectedDocument.purposes).map(
                      (purpose, index) => (
                        <li key={index}>• {purpose}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {selectedDocument.requirements && (
                <div>
                  <Label className="text-sm font-medium">Requirements:</Label>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {parseStringToArray(selectedDocument.requirements).map(
                      (req, index) => (
                        <li key={index}>• {req}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {selectedDocument.specialNote && (
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning font-medium">
                    Special Note:
                  </p>
                  <p className="text-sm text-warning/80">
                    {selectedDocument.specialNote}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocsView;
