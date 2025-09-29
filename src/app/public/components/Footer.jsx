import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Document Requests", href: "/signup" },
    { name: "Equipment Booking", href: "/signup" },
    { name: "Community Events", href: "/signup" },
    { name: "Resident Services", href: "/signup" },
  ];

  const contactInfo = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Address",
      value: "Barangay Hall, Main Street, Kaypian",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: "+63 (2) 123-4567",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: "barangaykaypian@gov.ph",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-800 text-slate-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent rounded-full blur-2xl" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <img
                    src="favicon-96x96.png"
                    alt="Barangay Kaypian"
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Barangay Kaypian</h3>
                  <p className="text-xs text-slate-400">
                    Digital Services Portal
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Serving our community with efficient, transparent, and
                accessible digital services for all residents of Barangay
                Kaypian.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 mb-4 flex items-center">
                <div className="w-1 h-4 bg-primary rounded-full mr-2" />
                Portal Services
              </h4>
              <nav className="space-y-2">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="block text-sm text-slate-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 mb-4 flex items-center">
                <div className="w-1 h-4 bg-accent rounded-full mr-2" />
                Contact Us
              </h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm text-slate-200">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center space-x-4">
                <p className="text-slate-400">
                  © {currentYear} Barangay Kaypian. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
