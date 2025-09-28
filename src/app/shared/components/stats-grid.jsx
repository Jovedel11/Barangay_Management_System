import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";

const StatsGrid = ({ stats, className = "" }) => {
  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`transition-all duration-200 hover:shadow-lg border ${stat.borderColor} bg-card hover:bg-card/80`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center shadow-sm`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
