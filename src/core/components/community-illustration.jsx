import {
  Users,
  FileText,
  Calendar,
  Shield,
  UserPlus,
  Heart,
  ListCheck,
  HandPlatter,
} from "lucide-react";

const CommunityIllustration = () => (
  <div className="relative w-full max-w-md mx-auto text-center space-y-6">
    {/* Main Community Circle */}
    <div className="relative mx-auto">
      <div className="w-40 h-40 bg-gradient-to-br from-success/15 to-primary/15 rounded-full border border-success/20 mx-auto relative flex items-center justify-center shadow-md">
        {/* Center Community Icon */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-success/10">
          <Users className="w-6 h-6 text-success" />
        </div>

        {/* Service Icons Around Circle */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-primary/10">
          <UserPlus className="w-4 h-4 text-primary" />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-success/10">
          <FileText className="w-4 h-4 text-success" />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-warning/10">
          <Calendar className="w-4 h-4 text-warning" />
        </div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-accent/10">
          <Shield className="w-4 h-4 text-accent" />
        </div>
      </div>
    </div>

    {/* Member Avatars */}
    <div className="flex justify-center gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-8 h-8 bg-gradient-to-br from-success/20 to-primary/20 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
        </div>
      ))}
    </div>

    {/* Welcome Content */}
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-success" />
          <h3 className="text-xl font-bold text-slate-700">
            Join Our Community
          </h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
          Become part of Barangay Kaypian's digital transformation
        </p>
      </div>

      {/* Service Benefits Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: FileText, text: "Documents", color: "success" },
          { icon: Calendar, text: "Events", color: "warning" },
          { icon: ListCheck, text: "Borrow Items", color: "accent" },
          { icon: HandPlatter, text: "Services", color: "primary" },
        ].map(({ icon: Icon, text, color }, index) => (
          <div
            key={index}
            className={`flex flex-col items-center space-y-2 p-3 bg-white/60 rounded-lg border border-${color}/10 hover:bg-white/80 transition-colors duration-200`}
          >
            <div
              className={`w-7 h-7 bg-${color}/10 rounded-full flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 text-${color}`} />
            </div>
            <span className="text-xs font-medium text-slate-600 text-center leading-tight">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommunityIllustration;
