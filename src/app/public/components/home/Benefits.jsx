import React from "react";

const Benefits = () => {
  const primaryBenefits = [
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
      title: "Save Time & Effort",
      description:
        "Skip the long queues and office visits. Submit your document requests from anywhere, anytime.",
      metrics: "Average 3-4 hours saved per request",
      color: "success",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22S2 16 2 9C2 7.14348 2.73751 5.36301 4.05025 4.05025C5.36301 2.73751 7.14348 2 9 2C10.25 2 11.5 2.5 12 3.5C12.5 2.5 13.75 2 15 2C16.8565 2 18.637 2.73751 19.9497 4.05025C21.2625 5.36301 22 7.14348 22 9C22 16 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Convenience & Accessibility",
      description:
        "Access government services 24/7 from your home, office, or mobile device with internet connection.",
      metrics: "Available 24/7, 365 days a year",
      color: "primary",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Transparency & Tracking",
      description:
        "Track your request status in real-time and receive updates at every step of the processing workflow.",
      metrics: "100% transparent process tracking",
      color: "accent",
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
          <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2" />
          <path
            d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Enhanced Security",
      description:
        "Your personal information and documents are protected with bank-level security and encryption protocols.",
      metrics: "Military-grade encryption protection",
      color: "warning",
    },
  ];

  const statisticsData = [
    {
      number: "90%",
      label: "Time Reduction",
      description: "Compared to traditional methods",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3V9H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      number: "98%",
      label: "User Satisfaction",
      description: "Based on resident feedback",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 14S9.5 16 12 16S16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      number: "24/7",
      label: "Service Availability",
      description: "Round-the-clock access",
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
      number: "Zero",
      label: "Paper Waste",
      description: "Completely digital process",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6H21L19 20H5L3 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Local Resident",
      message:
        "I got my barangay clearance in just 2 hours without leaving my house. The system is so easy to use!",
      avatar: "MS",
    },
    {
      name: "Juan Dela Cruz",
      role: "Small Business Owner",
      message:
        "Processing my business permit was seamless. The real-time tracking feature kept me informed throughout.",
      avatar: "JD",
    },
    {
      name: "Ana Rodriguez",
      role: "Senior Citizen",
      message:
        "As a senior, this system saves me from long queues. My family helps me submit requests online.",
      avatar: "AR",
    },
  ];

  const comparisonData = [
    {
      category: "Traditional Process",
      items: [
        { text: "Long waiting times in queues", negative: true },
        { text: "Multiple office visits required", negative: true },
        { text: "Physical paperwork and forms", negative: true },
        { text: "Unclear processing status", negative: true },
        { text: "Limited office hours only", negative: true },
      ],
    },
    {
      category: "Digital System",
      items: [
        { text: "Instant online submission", negative: false },
        { text: "Submit from anywhere", negative: false },
        { text: "Digital forms and uploads", negative: false },
        { text: "Real-time status tracking", negative: false },
        { text: "24/7 availability", negative: false },
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-card/80 backdrop-blur-sm border border-border rounded-full text-primary shadow-lg animate-fadeIn">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="font-semibold">System Benefits</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 animate-fadeIn">
            Why Choose Our
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Document System?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Experience the future of government services with our innovative
            digital platform designed to serve you better, faster, and more
            efficiently.
          </p>
        </div>

        {/* Primary Benefits Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10 mb-24">
          {primaryBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:scale-110 ${
                  benefit.color === "success"
                    ? "bg-success/10 text-success group-hover:bg-success/20"
                    : benefit.color === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                    : benefit.color === "accent"
                    ? "bg-accent/10 text-accent-foreground group-hover:bg-accent/20"
                    : "bg-warning/10 text-warning-foreground group-hover:bg-warning/20"
                }`}
              >
                {benefit.icon}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {benefit.description}
              </p>

              <div
                className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold ${
                  benefit.color === "success"
                    ? "bg-success/10 text-success"
                    : benefit.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : benefit.color === "accent"
                    ? "bg-accent/10 text-accent-foreground"
                    : "bg-warning/10 text-warning-foreground"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-3 animate-pulse ${
                    benefit.color === "success"
                      ? "bg-success"
                      : benefit.color === "primary"
                      ? "bg-primary"
                      : benefit.color === "accent"
                      ? "bg-accent"
                      : "bg-warning"
                  }`}
                ></div>
                {benefit.metrics}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mb-24 animate-fadeIn">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Traditional vs Digital Approach
            </h3>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              See the clear advantages of choosing our digital document
              management system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {comparisonData.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={`bg-card/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border transition-all duration-500 relative ${
                  section.category === "Digital System"
                    ? "border-success/30 hover:shadow-2xl"
                    : "border-destructive/30"
                }`}
              >
                {section.category === "Digital System" && (
                  <div className="absolute -top-4 -right-4 bg-success text-white px-6 py-2 rounded-full font-bold shadow-xl">
                    Recommended
                  </div>
                )}

                <div className="flex items-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 ${
                      section.category === "Digital System"
                        ? "bg-success/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={
                        section.category === "Digital System"
                          ? "text-success"
                          : "text-destructive"
                      }
                    >
                      {section.category === "Digital System" ? (
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">
                    {section.category}
                  </h4>
                </div>

                <div className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          item.negative ? "bg-destructive/10" : "bg-success/10"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={
                            item.negative ? "text-destructive" : "text-success"
                          }
                        >
                          {item.negative ? (
                            <path
                              d="M18 6L6 18M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ) : (
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </div>
                      <span className="text-muted-foreground text-lg flex-1">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="animate-fadeIn">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Our Residents Say
            </h3>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Real feedback from community members who have experienced the
              benefits firsthand
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-warning mr-1"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>

                <p className="text-muted-foreground mb-8 text-lg leading-relaxed italic">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mr-6 text-primary font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
