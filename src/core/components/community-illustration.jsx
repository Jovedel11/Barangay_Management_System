import { Users, FileText, Calendar, Shield, UserPlus } from "lucide-react";

const CommunityIllustration = () => (
  <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-8">
    {/* Simple Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-primary/10 rounded-3xl"></div>

    {/* Main Content */}
    <div className="relative z-10 text-center space-y-8">
      {/* Simplified Community Circle */}
      <div className="relative mx-auto">
        <div className="w-48 h-48 bg-gradient-to-br from-success/15 to-primary/15 rounded-full border border-success/20 mx-auto relative flex items-center justify-center">
          {/* Center Community Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-success/10">
            <Users className="w-8 h-8 text-success" />
          </div>

          {/* Simple Member Dots Around Circle */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-primary/10">
            <UserPlus className="w-4 h-4 text-primary" />
          </div>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-success/10">
            <FileText className="w-4 h-4 text-success" />
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-warning/10">
            <Calendar className="w-4 h-4 text-warning" />
          </div>
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-accent/10">
            <Shield className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>

      {/* Simple Member Avatars */}
      <div className="flex justify-center gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gradient-to-br from-success/20 to-primary/20 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Welcome Content */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-700">
          Join Our Community
        </h3>
        <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
          Become part of Barangay Kaypian's digital transformation and connect
          with your neighbors
        </p>

        {/* Simple Benefits */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: FileText, text: "Easy Documents" },
            { icon: Calendar, text: "Event Updates" },
            { icon: Users, text: "Community Connect" },
            { icon: Shield, text: "Secure & Private" },
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-3 bg-white/50 rounded-lg border border-success/10"
            >
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <benefit.icon className="w-4 h-4 text-success" />
              </div>
              <span className="text-xs font-medium text-slate-600">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CommunityIllustration;
