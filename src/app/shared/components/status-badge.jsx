import { Badge } from "@/core/components/ui/badge";

const StatusBadge = ({ status, type = "default", customConfig = {} }) => {
  const getStatusConfig = (status, type) => {
    const configs = {
      default: {
        pending: {
          variant: "secondary",
          className: "bg-warning text-warning-foreground",
        },
        approved: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        rejected: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
        active: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        inactive: {
          variant: "secondary",
          className: "bg-muted text-muted-foreground",
        },
        completed: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        cancelled: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
        processing: {
          variant: "secondary",
          className: "bg-accent text-accent-foreground",
        },
      },
      document: {
        pending_review: {
          variant: "secondary",
          className: "bg-warning text-warning-foreground",
        },
        processing: {
          variant: "secondary",
          className: "bg-accent text-accent-foreground",
        },
        ready_for_pickup: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        out_for_delivery: {
          variant: "secondary",
          className: "bg-info text-info-foreground",
        },
        completed: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        rejected: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
      },
      item: {
        pending_approval: {
          variant: "secondary",
          className: "bg-warning text-warning-foreground",
        },
        confirmed: {
          variant: "default",
          className: "bg-info text-info-foreground",
        },
        active: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        overdue: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
        returned: {
          variant: "outline",
          className: "bg-muted text-muted-foreground",
        },
        cancelled: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
      },
      service: {
        pending_approval: {
          variant: "secondary",
          className: "bg-warning text-warning-foreground",
        },
        confirmed: {
          variant: "default",
          className: "bg-info text-info-foreground",
        },
        completed: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        no_show: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
        cancelled: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
      },
      event: {
        upcoming: {
          variant: "default",
          className: "bg-info text-info-foreground",
        },
        ongoing: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        completed: {
          variant: "outline",
          className: "bg-muted text-muted-foreground",
        },
        cancelled: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
      },
      user: {
        active: {
          variant: "default",
          className: "bg-success text-success-foreground",
        },
        inactive: {
          variant: "secondary",
          className: "bg-muted text-muted-foreground",
        },
        suspended: {
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        },
        pending_approval: {
          variant: "secondary",
          className: "bg-warning text-warning-foreground",
        },
      },
    };

    return (
      configs[type]?.[status] ||
      configs.default[status] ||
      customConfig[status] || { variant: "outline" }
    );
  };

  const config = getStatusConfig(status, type);

  return (
    <Badge {...config}>
      {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </Badge>
  );
};

export default StatusBadge;
