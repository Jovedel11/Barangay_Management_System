import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "Barangay Clearance", href: "/services/clearance" },
      { name: "Certificate of Residency", href: "/services/residency" },
      { name: "Indigency Certificate", href: "/services/indigency" },
      { name: "Business Permit", href: "/services/business-permit" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Data Protection", href: "/data-protection" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "Address",
      value: "Barangay Hall, Main Street, City",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Phone",
      value: "+63 (2) 123-4567",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      ),
      label: "Email",
      value: "info@barangay.gov.ph",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.6117 13.2884 4.19439 12.773 4.95372C12.2575 5.71305 11.9877 6.61553 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.4981 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4S5.12 4 3.4 4.46C2.92925 4.59318 2.50191 4.84824 2.16131 5.19941C1.8207 5.55057 1.57881 5.98541 1.46 6.46C1.14258 8.20556 0.991319 9.97631 1 11.75C0.988437 13.537 1.14019 15.3213 1.46 17.08C1.59185 17.5398 1.8379 17.9581 2.17774 18.2945C2.51758 18.6308 2.93842 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46S18.88 19.46 20.6 19C21.0708 18.8668 21.4981 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0036 13.5103 22.99 11.75C23.0016 9.96295 22.8504 8.17879 22.54 6.42Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="9.75,15.02 15.5,11.75 9.75,8.48"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-foreground to-gray-900 text-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Link
                  to="/"
                  className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <img
                    src="favicon-96x96.png"
                    alt="Barangay Kaypian Logo"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
                <div>
                  <h3 className="text-2xl font-bold text-background">
                    Barangay Kaypian
                  </h3>
                  <p className="text-sm text-background/70">
                    Document Management
                  </p>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed mb-6">
                Modernizing barangay services through innovative digital
                solutions. Serving our community with efficiency and
                transparency.
              </p>

              {/* Certification Badge */}
              <div className="bg-success/10 backdrop-blur-sm rounded-xl p-4 border border-success/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-success font-semibold text-sm">
                    Government Certified
                  </span>
                </div>
                <p className="text-xs text-background/60">
                  Compliant with Data Privacy Act and security standards
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-background mb-6 flex items-center">
                <div className="w-1 h-6 bg-primary rounded-full mr-3" />
                Quick Links
              </h4>
              <nav className="space-y-3">
                {footerSections.quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-background/70 hover:text-primary transition-colors duration-300 group flex items-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold text-background mb-6 flex items-center">
                <div className="w-1 h-6 bg-accent rounded-full mr-3" />
                Services
              </h4>
              <nav className="space-y-3">
                {footerSections.services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="block text-background/70 hover:text-accent transition-colors duration-300 group flex items-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {service.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-bold text-background mb-6 flex items-center">
                <div className="w-1 h-6 bg-secondary rounded-full mr-3" />
                Contact Info
              </h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center text-background/70 group-hover:bg-background/20 group-hover:text-primary transition-all duration-300 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-background/60 mb-1">
                        {info.label}
                      </p>
                      <p className="text-background/80">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-bold text-background mb-4">
                  Follow Us
                </h4>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-background/10 hover:bg-primary/20 rounded-xl flex items-center justify-center text-background/70 hover:text-primary transition-all duration-300 transform hover:scale-110 group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-bold text-background mb-4">
                  Stay Informed
                </h4>
                <p className="text-background/70 mb-4">
                  Get updates about new services and announcements.
                </p>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-xl text-background placeholder-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {footerSections.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm text-background/60 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-background/60">
                  © {currentYear} Barangay Kaypian. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-2 text-xs text-background/40">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>System Online</span>
                </div>
              </div>
              <a
                href="https://www.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-background/60 hover:text-primary transition-colors duration-300"
              >
                <div className="w-5 h-5 bg-background/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">PH</span>
                </div>
                <span>Official Government Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
