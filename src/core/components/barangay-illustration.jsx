import { Building2, FileText, Users, Calendar, MapPin } from "lucide-react";

const BarangayIllustration = () => (
  <div className="relative w-full max-w-md mx-auto text-center space-y-6">
    {/* Main Building */}
    <div className="relative mx-auto">
      <div className="w-48 h-32 bg-gradient-to-b from-primary/15 to-primary/10 rounded-lg border border-primary/20 mx-auto relative shadow-md">
        {/* Building Header */}
        <div className="absolute inset-x-3 top-3 h-4 bg-primary/20 rounded text-xs font-semibold text-primary flex items-center justify-center">
          <MapPin className="w-3 h-3 mr-1" />
          BARANGAY HALL
        </div>

        {/* Windows Grid */}
        <div className="grid grid-cols-3 gap-2 mt-7 px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-5 bg-primary/15 rounded border border-primary/25"
            />
          ))}
        </div>

        {/* Door */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-12 bg-primary/25 rounded-t border-x border-t border-primary/30">
          <div className="w-1 h-1 bg-primary rounded-full absolute right-1 top-2"></div>
        </div>
      </div>

      {/* Building Base */}
      <div className="w-52 h-3 bg-primary/15 rounded-b mx-auto shadow-sm"></div>
    </div>

    {/* Service Icons */}
    <div className="flex justify-center gap-4">
      {[
        { icon: FileText, color: "primary" },
        { icon: Users, color: "accent" },
        { icon: Calendar, color: "success" },
        { icon: Building2, color: "warning" },
      ].map(({ icon: Icon, color }, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg p-3 shadow-sm border border-${color}/10 hover:shadow-md transition-shadow duration-200`}
        >
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
      ))}
    </div>

    {/* Welcome Content */}
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-700">
          Welcome to Barangay Kaypian
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
          Your digital gateway to community services and civic engagement
        </p>
      </div>

      {/* Feature Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {["Digital Services", "Community Events", "Online Documents"].map(
          (feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
            >
              {feature}
            </span>
          )
        )}
      </div>
    </div>
  </div>
);

export default BarangayIllustration;
