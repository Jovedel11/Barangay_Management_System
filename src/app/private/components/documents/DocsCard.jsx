import { Card, CardContent } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Plus,
  Eye,
  FileCheck,
  FileText,
  Home,
  Briefcase,
  Folder,
} from "lucide-react";
import { useState } from "react";
import RequestSheet from "./RequestSheet";
import DocsView from "./DocsViewDialog";

const getCategoryIcon = (category) => {
  const iconMap = {
    "Barangay Clearance": FileCheck,
    "Indengency Certificate": FileText,
    "Residency Certificate": Home,
    "Business Permit": Briefcase,
    Other: Folder,
  };
  return iconMap[category] || Folder;
};

const DocCard = ({ doc, refetch }) => {
  const [openSheet, setSheet] = useState(false);
  const IconComponent = getCategoryIcon(doc?.category);

  const handleSheet = () => setSheet((state) => !state);
  return (
    <Card className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-foreground truncate max-w-[160px] sm:max-w-[200px] md:max-w-[240px]">
                {doc?.name}
              </h4>
              <p className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
                {doc?.description}
              </p>
            </div>
          </div>

          {doc?.urgent && (
            <Badge className="bg-accent/10 text-accent border-accent/30 text-xs flex-shrink-0 ml-2">
              Rush Available
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium text-primary capitalize">
              {doc?.fee}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing:</span>
            <span className="font-medium text-foreground">
              {doc?.processingTime}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment:</span>
            <span className="font-medium text-warning">
              {doc?.deliveryAvailable ? "COD Available" : "Walk-in Only"}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <RequestSheet
            selectedDocument={doc}
            open={openSheet}
            onOpenChange={handleSheet}
            refetch={refetch}
          />
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSheet}
          >
            <Plus className="h-3 w-3 mr-1" />
            Request
          </Button>
          <DocsView selectedDocument={doc}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {}}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </DocsView>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocCard;
