import { Button } from "@/core/components/ui/button";

const TabNavigation = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div
      className={`flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit ${className}`}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={activeTab === tab.value ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.value)}
          className={`flex items-center gap-2 ${
            activeTab === tab.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.icon && <tab.icon className="h-4 w-4" />}
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-muted rounded-full">
              {tab.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;
