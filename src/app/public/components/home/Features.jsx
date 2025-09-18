import React from "react";

const Features = () => {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: "Personal Account Management",
      description:
        "Create and manage your secure personal profile with complete control over your information.",
      color: "primary",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Document Request Submission",
      description:
        "Submit requests for various barangay documents including clearances, certificates, and permits through our streamlined online process.",
      color: "accent",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
      title: "Real-Time Status Tracking",
      description:
        "Monitor the progress of your document requests with live updates and detailed status information at every step of the process.",
      color: "success",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Smart Notifications",
      description:
        "Receive timely notifications and updates about your requests through email notifications.",
      color: "warning",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="11"
            width="18"
            height="11"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
          <path
            d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Secure Data Protection",
      description:
        "Your personal information is protected by strict privacy controls.",
      color: "primary",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Fast Processing",
      description:
        "Experience lightning-fast document processing with automated workflows that reduce traditional waiting times from days to hours.",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-card/80 backdrop-blur-sm border border-border rounded-full text-primary shadow-lg animate-fadeIn">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="font-semibold">System Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Everything You Need for
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seamless Document Management
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Discover the comprehensive features designed to make your barangay
            document requests simple, fast, and hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 bg-${feature.color}/10 rounded-3xl flex items-center justify-center mb-8 text-${feature.color} group-hover:bg-${feature.color}/20 transition-all duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3
                className={`text-2xl font-bold text-foreground mb-6 group-hover:text-${feature.color} transition-colors duration-300`}
              >
                {feature.title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-17 text-center animate-scaleIn">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-4 md:p-14 text-center shadow-2xl">
            <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-primary-foreground/90 mb-10 max-w-3xl mx-auto text-xl">
              Join hundreds of residents who have already simplified their
              document requests with our digital platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/signup"
                className="w-full sm:w-auto bg-card text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:bg-card/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Create Account
              </a>
              <a
                href="/about"
                className="w-full sm:w-auto border-2 border-card text-card px-10 py-4 rounded-2xl font-bold text-lg hover:bg-card hover:text-primary transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
