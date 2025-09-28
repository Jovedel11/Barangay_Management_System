import { Button } from "@/core/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions = [],
  showBackButton = false,
  onBack,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span
                  className={
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : ""
                  }
                >
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                size={action.size || "default"}
                onClick={action.onClick}
                disabled={action.disabled}
                className={action.className}
              >
                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
