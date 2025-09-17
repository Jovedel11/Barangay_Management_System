import React, { useState } from "react";

const ContactFAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "General Services",
      color: "bg-primary/10 text-primary",
      questions: [
        {
          question: "What documents do I need to bring for barangay clearance?",
          answer:
            "You need to bring a valid ID (government-issued), recent photo (1x1), and proof of residency. Processing takes 1-2 business days with a fee of ₱50.",
        },
        {
          question: "How can I register as a new resident?",
          answer:
            "Visit our office with proof of address (utility bill or lease contract), valid ID, and birth certificate. Registration is free and takes about 30 minutes.",
        },
      ],
    },
    {
      category: "Business Permits",
      color: "bg-accent/10 text-accent",
      questions: [
        {
          question: "What is the process for getting a business permit?",
          answer:
            "Submit completed application form, business registration certificate, lease contract, location sketch, and pay the required fees. Processing takes 3-5 business days.",
        },
        {
          question: "Can I renew my business permit online?",
          answer:
            "Currently, business permit renewals require in-person visit. However, you can download the forms from our website to save time during your visit.",
        },
      ],
    },
    {
      category: "Health Services",
      color: "bg-success/10 text-success",
      questions: [
        {
          question: "What health services are available?",
          answer:
            "We offer basic health consultations, immunizations, prenatal care, family planning services, and health certificates. Services are available Monday to Friday, 8AM-5PM.",
        },
        {
          question: "Are health services free?",
          answer:
            "Most basic health services are free for residents. Some specialized services and certificates may have minimal fees. Please inquire at the health center for specific rates.",
        },
      ],
    },
    {
      category: "Emergency Services",
      color: "bg-destructive/10 text-destructive",
      questions: [
        {
          question: "What should I do in case of emergency?",
          answer:
            "For life-threatening emergencies, call 911 immediately. For local emergencies, contact our barangay hotline at 8-HELP. Our emergency response team is available 24/7.",
        },
        {
          question: "Does the barangay provide disaster assistance?",
          answer:
            "Yes, we have a disaster preparedness program and provide assistance during calamities including evacuation centers, relief goods, and post-disaster support.",
        },
      ],
    },
  ];

  const allQuestions = faqData.flatMap((category, categoryIndex) =>
    category.questions.map((q, qIndex) => ({
      ...q,
      category: category.category,
      color: category.color,
      globalIndex: categoryIndex * 10 + qIndex,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Find quick answers to common inquiries
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {faqData.map((category, index) => (
          <div key={index} className="card-glass p-4 rounded-xl text-center">
            <div
              className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
            >
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-1">
              {category.category}
            </h4>
            <p className="text-xs text-muted-foreground">
              {category.questions.length} Questions
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {allQuestions.map((item, index) => (
          <div key={index} className="card-glass rounded-xl overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-6 text-left hover:bg-muted/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-1 ${item.color} text-xs rounded-full font-medium`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${
                      openItems.has(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            {openItems.has(index) && (
              <div className="px-6 pb-6 animate-fadeIn">
                <div className="border-t border-beige-300/30 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Can't find what you're looking for?
        </h3>
        <p className="text-white/90 mb-6">
          Our team is here to help with any questions or concerns you may have
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact-form"
            className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            Send Message
          </a>
          <a
            href="tel:+6328123456"
            className="bg-white/20 text-white hover:bg-white/30 border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQ;
