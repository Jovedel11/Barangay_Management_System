import React from "react";

const AboutOverview = () => {
  return (
    <section className="py-15 md:py-32 bg-background relative overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-card/80 backdrop-blur-sm border border-border rounded-full text-primary shadow-lg animate-fadeIn">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="font-semibold">About Our System</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Modernizing Barangay
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Document Services
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Our digital platform transforms traditional document processing into
            a seamless, efficient experience for both residents and barangay
            officials.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="animate-slideIn">
            <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-border">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Bridging Traditional Government with Digital Innovation
              </h3>

              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                The Barangay Document Management System represents a significant
                leap forward in local government service delivery. By digitizing
                the entire document request and processing workflow, we
                eliminate long queues, reduce processing time.
              </p>

              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                Our platform ensures transparency, accountability, and
                efficiency while maintaining the highest standards of data
                security and privacy protection required for government
                operations.
              </p>

              {/* Key Benefits */}
              <div className="space-y-6">
                {[
                  {
                    title: "Streamlined Process",
                    description:
                      "Simplified document requests with real-time status tracking",
                  },
                  {
                    title: "Borrow Scheduling",
                    description:
                      "Easily schedule and manage borrowing of barangay resources",
                  },
                  {
                    title: "Time Efficiency",
                    description: "Reduced processing time from days to hours",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-success rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2 text-lg">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Statistics */}
          <div className="animate-slideIn">
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                {
                  value: "1,000+",
                  label: "Registered Users",
                  color: "primary",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="8.5"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ),
                },
                {
                  value: "2,500+",
                  label: "Documents Processed",
                  color: "accent",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  value: "2 Hours",
                  label: "Average Processing",
                  color: "success",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="12,6 12,12 16,14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  value: "98%",
                  label: "Satisfaction Rate",
                  color: "warning",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-border hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div
                    className={`w-16 h-16 bg-${stat.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-${stat.color} group-hover:bg-${stat.color}/20 transition-all duration-300 group-hover:scale-110`}
                  >
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-8 border border-primary/10">
              <h4 className="font-bold text-foreground mb-4 flex items-center text-xl">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                Our Mission
              </h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To provide accessible, efficient, and transparent government
                services that empower our community while fostering trust
                between citizens and local government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
