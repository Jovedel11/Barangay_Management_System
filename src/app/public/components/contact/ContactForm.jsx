import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
    department: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          priority: "normal",
          department: "",
        });
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const departments = [
    { value: "", label: "Select Department" },
    { value: "general", label: "General Inquiry" },
    { value: "permits", label: "Permits & Licenses" },
    { value: "health", label: "Health Services" },
    { value: "social", label: "Social Services" },
    { value: "peace", label: "Peace & Order" },
    { value: "disaster", label: "Disaster Management" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "text-success" },
    { value: "normal", label: "Normal", color: "text-beige-700" },
    { value: "high", label: "High Priority", color: "text-warning" },
    { value: "urgent", label: "Urgent", color: "text-destructive" },
  ];

  const inputClasses =
    "w-full px-5 py-4 bg-white border-2 border-beige-400/60 hover:border-beige-500 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-foreground placeholder:text-beige-600 transition-all duration-200 font-medium";
  const labelClasses =
    "block text-sm font-bold text-beige-800 mb-2 tracking-wide";

  return (
    <div className="space-y-8" id="contact-form">
      {/* Enhanced Header */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-4">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm font-semibold text-primary">
            Official Contact Form
          </span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Send us a Message
        </h2>
        <p className="text-beige-700 text-lg font-medium">
          Fill out the form below and we'll get back to you within 24 hours
        </p>
      </div>

      {/* Enhanced Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-beige-400/40 p-10 rounded-3xl shadow-xl">
          {/* Personal Information Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-beige-300">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Personal Information
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name" className={labelClasses}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter your complete name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className={labelClasses}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className={labelClasses}>
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="+63 9XX XXX XXXX"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label htmlFor="department" className={labelClasses}>
                  DEPARTMENT
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Message Details Section */}
          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-beige-300">
              <div className="w-8 h-8 bg-pink-400/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Message Details
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className={labelClasses}>
                  SUBJECT *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Brief description of your inquiry"
                />
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label htmlFor="priority" className={labelClasses}>
                  PRIORITY LEVEL
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className={labelClasses}>
                DETAILED MESSAGE *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={7}
                className={`${inputClasses} resize-none leading-relaxed`}
                placeholder="Please provide comprehensive details about your inquiry, request, or concern. The more specific you are, the better we can assist you..."
              />
              <p className="text-sm text-beige-600 font-medium">
                Minimum 10 characters required. Be specific for faster, more
                accurate assistance.
              </p>
            </div>
          </div>

          {/* Enhanced Submit Section */}
          <div className="mt-12 pt-8 border-t-2 border-beige-300">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-12 py-5 bg-accent to-beige-600 hover:from-beige-600 hover:to-primary text-card-foreground rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/40 focus:ring-offset-2 min-w-[200px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Submit Official Request</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Enhanced Success Message */}
      {submitStatus === "success" && (
        <div className="bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/30 rounded-2xl p-6 animate-fadeIn shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground mb-2">
                ✅ Official Request Submitted Successfully!
              </h4>
              <p className="text-beige-700 font-medium mb-1">
                Your message has been received by our government office.
              </p>
              <p className="text-sm text-beige-600">
                Reference ID:{" "}
                <span className="font-mono font-bold">
                  BRG-{Date.now().toString().slice(-6)}
                </span>{" "}
                • Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
