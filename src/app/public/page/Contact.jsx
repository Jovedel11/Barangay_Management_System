import React from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";

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
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - Full Width */}
        <section className="py-12 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4">
            <ContactMap />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
