import { Building2, FileText, Users, Calendar } from "lucide-react";

const BarangayIllustration = () => (
  <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-8">
    {/* Simple Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl"></div>

    {/* Main Content */}
    <div className="relative z-10 text-center space-y-8">
      {/* Simplified Building */}
      <div className="relative mx-auto">
        <div className="w-48 h-36 bg-gradient-to-b from-primary/15 to-primary/10 rounded-lg border border-primary/20 mx-auto relative">
          {/* Building Header */}
          <div className="absolute inset-x-3 top-3 h-4 bg-primary/25 rounded text-xs font-medium text-primary flex items-center justify-center">
            BARANGAY HALL
          </div>

          {/* Simple Windows Grid */}
          <div className="grid grid-cols-3 gap-2 mt-8 px-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-6 bg-primary/15 rounded border border-primary/30"
              />
            ))}
          </div>

          {/* Simple Door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-primary/30 rounded-t border-x border-t border-primary/40">
            <div className="w-1.5 h-1.5 bg-primary rounded-full absolute right-1.5 top-3"></div>
          </div>
        </div>

        {/* Building Base */}
        <div className="w-52 h-3 bg-primary/20 rounded-b mx-auto"></div>
      </div>

      {/* Service Icons - Simplified */}
      <div className="flex justify-center gap-6">
        <div className="bg-white rounded-full p-3 shadow-md border border-primary/10">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="bg-white rounded-full p-3 shadow-md border border-accent/10">
          <Users className="w-5 h-5 text-accent" />
        </div>
        <div className="bg-white rounded-full p-3 shadow-md border border-success/10">
          <Calendar className="w-5 h-5 text-success" />
        </div>
        <div className="bg-white rounded-full p-3 shadow-md border border-warning/10">
          <Building2 className="w-5 h-5 text-warning" />
        </div>
      </div>

      {/* Welcome Content */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-700">
          Welcome to Barangay Kaypian
        </h3>
        <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
          Your digital gateway to community services and civic engagement
        </p>

        {/* Simple Feature Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["Digital Services", "Community Events", "Online Documents"].map(
            (feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  </div>
);

export default BarangayIllustration;
