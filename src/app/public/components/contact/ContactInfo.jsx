import React from "react";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      primary: "+63 (02) 8123-4567",
      secondary: "+63 917-123-4567",
      description: "Mon-Fri 8AM-5PM",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      primary: "info@barangay.gov.ph",
      secondary: "captain@barangay.gov.ph",
      description: "Response within 24 hours",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Address",
      primary: "Barangay Hall, Main Street",
      secondary: "Quezon City, Metro Manila",
      description: "Open daily 7AM-7PM",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Emergency",
      primary: "911 or 117",
      secondary: "Barangay Hotline: 8-HELP",
      description: "24/7 Emergency Response",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Get in Touch
        </h2>
        <p className="text-muted-foreground text-lg">
          Multiple ways to reach us for your convenience
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid gap-4">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="card-glass p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {method.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {method.title}
                </h3>
                <p className="text-foreground font-medium mb-1">
                  {method.primary}
                </p>
                <p className="text-muted-foreground text-sm mb-2">
                  {method.secondary}
                </p>
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1 inline-block">
                  {method.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-error/10 to-warning/10 border border-error/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              Emergency Services
            </h4>
            <p className="text-sm text-muted-foreground">
              For life-threatening emergencies, call 911 immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
