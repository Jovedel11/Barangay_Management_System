import React from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactOfficeHours from "../components/contact/ContactOfficeHours";
import ContactFAQ from "../components/contact/ContactFAQ";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <main className="relative">
        {/* Contact Information Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Contact Form */}
              <div className="space-y-8">
                <ContactForm />
              </div>

              {/* Right Column - Contact Info & Map */}
              <div className="space-y-8">
                <ContactInfo />
                <ContactMap />
              </div>
            </div>
          </div>
        </section>

        {/* Office Hours & FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactOfficeHours />
              <ContactFAQ />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
