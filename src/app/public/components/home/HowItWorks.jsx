import React, { useState } from "react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeGuide, setActiveGuide] = useState("documents");

  const documentSteps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up with your personal details to create a secure account in our system.",
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
      timeframe: "2-3 minutes",
    },
    {
      number: "02",
      title: "Choose Document Type",
      description:
        "Select from our catalog of available barangay documents and services based on your specific needs.",
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
      timeframe: "1-2 minutes",
    },
    {
      number: "03",
      title: "Fill Out Application",
      description:
        "Complete the digital form with accurate information and upload any required supporting documents.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 11H15M9 15H15M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      timeframe: "3-5 minutes",
    },
    {
      number: "04",
      title: "Track Your Request",
      description:
        "Monitor real-time progress of your application with detailed status updates and estimated completion times.",
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
      timeframe: "Real-time updates",
    },
    {
      number: "05",
      title: "Receive & Download",
      description:
        "Get notified when your document is ready and download it securely or schedule pickup from the barangay office.",
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
      timeframe: "Instant download",
    },
  ];

  const equipmentSteps = [
    {
      number: "01",
      title: "Browse Equipment Catalog",
      description:
        "View available barangay equipment and facilities with real-time availability status.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="21"
            x2="16"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      timeframe: "2-3 minutes",
    },
    {
      number: "02",
      title: "Submit Reservation Request",
      description:
        "Fill out the equipment borrowing form with your intended use and duration.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      timeframe: "3-4 minutes",
    },
    {
      number: "03",
      title: "Approval & Confirmation",
      description:
        "Wait for barangay staff approval and receive confirmation with pickup details.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
      timeframe: "4-6 hours",
    },
    {
      number: "04",
      title: "Pickup & Return",
      description:
        "Collect the equipment from the barangay office and return it according to the agreed schedule.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
          <path
            d="M1 1H5L7 13H17L21 5H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      timeframe: "As scheduled",
    },
  ];

  const faqs = [
    {
      question: "What documents do I need to register?",
      answer:
        "You need a valid government ID, proof of residency in the barangay, and a working email address.",
    },
    {
      question: "How long does document processing take?",
      answer:
        "Processing times vary: Barangay Clearance (2-3 hours), Certificate of Residency (1-2 hours), Business Permits (1-2 days).",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept cash payments at the barangay office, GCash, PayMaya, and bank transfers.",
    },
    {
      question: "Is online borrowing available?",
      answer: "Yes, you can schedule online borrowing of barangay resources.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-foreground to-gray-900 text-background relative overflow-hidden">
      {/* Background Elements - Matching Footer Style */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-background rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary shadow-lg animate-fadeIn">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="font-semibold">Step-by-Step Guide</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-8 animate-fadeIn">
            How Our System
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-background/80 max-w-4xl mx-auto leading-relaxed animate-slideIn">
            Follow our simple, streamlined process to get your barangay
            documents and services quickly and efficiently.
          </p>
        </div>

        {/* Service Type Tabs - Grid Layout */}
        <div className="flex justify-center mb-20 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <button
              onClick={() => setActiveGuide("documents")}
              className={`relative overflow-hidden px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 group ${
                activeGuide === "documents"
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-background/10 text-background hover:bg-background/20 hover:scale-102"
              }`}
            >
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Document Requests</span>
              </div>
              {activeGuide === "documents" && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 animate-fadeIn"></div>
              )}
            </button>

            <button
              onClick={() => setActiveGuide("equipment")}
              className={`relative overflow-hidden px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 group ${
                activeGuide === "equipment"
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-background/10 text-background hover:bg-background/20 hover:scale-102"
              }`}
            >
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="21"
                    x2="16"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Equipment Borrowing</span>
              </div>
              {activeGuide === "equipment" && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 animate-fadeIn"></div>
              )}
            </button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {(activeGuide === "documents"
                ? documentSteps
                : equipmentSteps
              ).map((step, index) => (
                <div
                  key={index}
                  className={`relative animate-slideIn group cursor-pointer transition-all duration-500 ${
                    activeStep === index ? "scale-105" : "hover:scale-102"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Connector Line */}
                  {index <
                    (activeGuide === "documents"
                      ? documentSteps
                      : equipmentSteps
                    ).length -
                      1 && (
                    <div className="hidden lg:block absolute left-10 top-24 w-0.5 h-20 bg-gradient-to-b from-primary/60 to-accent/30"></div>
                  )}

                  <div
                    className={`bg-background/10 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border transition-all duration-500 ${
                      activeStep === index
                        ? "border-primary/50 shadow-primary/20 bg-background/15"
                        : "border-background/20 hover:border-primary/30 hover:bg-background/15"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      {/* Step Icon & Number */}
                      <div className="flex-shrink-0 flex items-center lg:flex-col lg:items-center gap-6">
                        <div
                          className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                            activeStep === index
                              ? "bg-primary text-primary-foreground shadow-2xl scale-110"
                              : "bg-primary/20 text-primary group-hover:bg-primary/30 group-hover:scale-105"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div
                          className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                            activeStep === index
                              ? "bg-primary/30 text-primary"
                              : "bg-background/20 text-background/70"
                          }`}
                        >
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                          <h3
                            className={`text-2xl lg:text-3xl font-bold mb-4 lg:mb-0 transition-colors duration-300 ${
                              activeStep === index
                                ? "text-primary"
                                : "text-background group-hover:text-primary"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <span className="inline-flex items-center px-4 py-2 bg-success/20 text-success rounded-xl font-semibold backdrop-blur-sm">
                            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                            {step.timeframe}
                          </span>
                        </div>

                        <p className="text-background/80 text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-background/10 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-background/20 animate-fadeIn">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-background mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-background/80 text-xl max-w-3xl mx-auto">
              Find answers to common questions about our document management
              system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-background/10 hover:bg-background/10 hover:border-primary/30 transition-all duration-500 group"
              >
                <h4 className="font-bold text-background mb-4 group-hover:text-primary transition-colors duration-300 flex items-start text-lg">
                  <span className="w-8 h-8 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 group-hover:bg-primary/30">
                    ?
                  </span>
                  {faq.question}
                </h4>
                <p className="text-background/70 leading-relaxed ml-12">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center animate-scaleIn">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Need Additional Help?
              </h3>
              <p className="text-primary-foreground/90 mb-10 text-xl">
                Our barangay staff is here to assist you throughout the process.
                Don't hesitate to reach out if you have questions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="/contact"
                  className="w-full sm:w-auto bg-background text-foreground px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Contact Support
                </a>
                <a
                  href="/signup"
                  className="w-full sm:w-auto border-2 border-background text-background px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
