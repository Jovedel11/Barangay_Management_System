import React, { useState, useEffect } from "react";

const CallToAction = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickSteps = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
      title: "Sign Up",
      subtitle: "2 minutes",
    },
    {
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
      title: "Request",
      subtitle: "3 minutes",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="7,10 12,15 17,10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Receive",
      subtitle: "2-3 hours",
    },
  ];

  const benefits = [
    "No more long queues",
    "24/7 online access",
    "Real-time tracking",
    "Secure processing",
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background via-muted to-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Urgency Indicator */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-warning/10 border border-warning/20 rounded-full text-warning animate-fadeIn shadow-lg">
            <div className="w-2 h-2 bg-warning rounded-full mr-3 animate-pulse"></div>
            <span className="font-semibold">
              Join 1,000+ satisfied residents
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-10 animate-slideIn">
            {/* Headline */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                Ready to Simplify Your
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Document Requests?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Don't let paperwork slow you down. Join thousands of residents
                who have already streamlined their barangay document process.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-success rounded-xl flex items-center justify-center flex-shrink-0">
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
                  <span className="text-foreground font-semibold">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    2,500+
                  </div>
                  <div className="text-muted-foreground">
                    Documents Processed
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    98%
                  </div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    24/7
                  </div>
                  <div className="text-muted-foreground">Availability</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="/signup"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-2xl font-bold text-xl text-center transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  >
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
                  Get Started Free
                </div>
              </a>
              <a
                href="/login"
                className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-5 rounded-2xl font-bold text-xl text-center transition-all duration-300"
              >
                Already Registered?
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center sm:justify-start space-x-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-success rounded-lg flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
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
                <span className="font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
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
                <span className="font-medium">Government Certified</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Steps */}
          <div className="animate-fadeIn">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-border">
              {/* Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Get Your Documents in 3 Simple Steps
                </h3>
                <p className="text-muted-foreground text-lg">
                  Start your document request in under 5 minutes
                </p>
              </div>

              {/* Animated Steps */}
              <div className="space-y-8">
                {quickSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-6 p-6 rounded-2xl transition-all duration-500 ${
                      currentStep === index
                        ? "bg-primary/10 border-2 border-primary/20 scale-105"
                        : "bg-background/50 border border-border"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        currentStep === index
                          ? "bg-primary text-primary-foreground shadow-xl scale-110"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-bold text-xl mb-2 transition-colors duration-300 ${
                          currentStep === index
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground">{step.subtitle}</p>
                    </div>
                    {currentStep === index && (
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="mt-10 flex items-center justify-center space-x-3">
                {quickSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStep ? "w-10 bg-primary" : "w-2 bg-muted"
                    }`}
                  ></div>
                ))}
              </div>

              {/* Time Estimate */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-success/10 text-success rounded-2xl">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-3"
                  >
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
                  <span className="font-bold">Total time: Under 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
