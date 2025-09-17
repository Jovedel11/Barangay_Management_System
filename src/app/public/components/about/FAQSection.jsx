import React, { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I register for the digital government services?",
      answer:
        "Registration is simple and free. Visit our platform, click 'Register', provide your basic information and valid ID. Verification usually takes 24-48 hours, and you'll receive email confirmation once approved.",
    },
    {
      question: "What documents can I request through the digital platform?",
      answer:
        "You can request various documents including Barangay Clearance, Certificate of Indigency, Business Permits, Residency Certificates, and other official documents. Most requests are processed within 2-3 business days.",
    },
    {
      question: "Is my personal information secure on this platform?",
      answer:
        "Yes, we use bank-level security with 256-bit SSL encryption, secure servers, and strict data privacy protocols. Your information is protected according to the Data Privacy Act of 2012 and never shared with unauthorized parties.",
    },
    {
      question: "How can I track the status of my document request?",
      answer:
        "After submitting a request, you'll receive a tracking number. Log into your account and go to 'My Requests' to see real-time status updates. You'll also receive email notifications for important updates.",
    },
    {
      question: "What payment methods are accepted for document fees?",
      answer:
        "We accept various payment methods including GCash, PayMaya, online banking, credit/debit cards, and over-the-counter payments at partner locations. All transactions are secure and receipts are provided digitally.",
    },
    {
      question:
        "Can I still visit the office for services not available online?",
      answer:
        "Absolutely! While we encourage digital transactions for convenience, our physical office remains open for services not yet digitized, complex cases, or for those who prefer in-person assistance.",
    },
    {
      question: "How do I report technical issues or request help?",
      answer:
        "Contact our support team through the 'Help & Support' section, email support@barangay.gov.ph, or call our hotline during business hours. We also have live chat support for immediate assistance.",
    },
    {
      question: "Are there any fees for using the digital platform?",
      answer:
        "The platform itself is free to use. You only pay the standard government fees for specific documents or services. There are no additional convenience fees for using our digital services.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-card relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: "rgba(212, 165, 116, 0.08)",
              borderColor: "rgba(212, 165, 116, 0.2)",
              color: "var(--primary)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="12"
                y1="17"
                x2="12.01"
                y2="17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Help & Support</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked
            <span className="block mt-2 gradient-primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(45, 42, 38, 0.7)" }}
          >
            Find answers to common questions about our digital government
            services. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
                        openFAQ === index ? "rotate-180" : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor:
                          openFAQ === index
                            ? "var(--primary)"
                            : "rgba(212, 165, 116, 0.1)",
                        color: openFAQ === index ? "white" : "var(--primary)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div
                      className="w-full h-px mb-4"
                      style={{ backgroundColor: "var(--border)" }}
                    ></div>
                    <p
                      className="leading-relaxed"
                      style={{ color: "rgba(45, 42, 38, 0.7)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center animate-fadeIn">
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl max-w-2xl mx-auto">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: "rgba(212, 165, 116, 0.1)",
                color: "var(--primary)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 12.08C22 17.6833 17.5222 22.1611 12.08 22.1611C10.4589 22.1611 8.91248 21.7764 7.54505 21.0944L2 22.1611L3.0667 16.6156C2.38472 15.2482 2 13.7018 2 12.08C2 6.47779 6.47779 2 12.08 2C17.6833 2 22 6.47779 22 12.08Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10.5C8.5 10.5 9 9 11.5 9C14 9 14.5 10.5 14.5 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="9"
                  y1="15"
                  x2="15"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Need Help?
            </h3>

            <p className="mb-8" style={{ color: "rgba(45, 42, 38, 0.7)" }}>
              Our support team is here to assist you with any questions or
              technical issues.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@barangay.gov.ph"
                className="inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "var(--beige-600)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "var(--primary)")
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Email Support
              </a>

              <a
                href="tel:+63-xxx-xxx-xxxx"
                className="inline-flex items-center px-6 py-3 rounded-xl font-medium border transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--muted)";
                  e.target.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "var(--foreground)";
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59544 1.99522 8.06620 2.16708 8.43376 2.48353C8.80132 2.79999 9.04018 3.23945 9.10999 3.72C9.23670 4.68007 9.47151 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5285 19.3199 14.7633 20.28 14.89C20.7658 14.9585 21.2094 15.2002 21.5265 15.5705C21.8437 15.9408 22.0122 16.4147 22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Call Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
