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

      {/* Main Content - Improved Layout */}
      <main className="relative">
        {/* Contact Section with Better Grid Layout */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
              {/* Contact Form - Takes more space */}
              <div className="lg:col-span-3 space-y-8">
                <ContactForm />
              </div>

              {/* Contact Info - Sidebar */}
              <div className="lg:col-span-2 space-y-8">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - Full Width with Better Spacing */}
        <section className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-6">
            <ContactMap />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
