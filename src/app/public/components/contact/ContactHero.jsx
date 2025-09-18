import Skeleton from "@/core/components/ui/Sketon";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContactHero = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton width="100%" height="400px" />;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-beige-50 via-background to-pink-50 py-24 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--beige-600) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />

      <div className="relative max-w-4xl mx-auto text-center mt-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance"
        >
          Contact{" "}
          <span
            className="bg-gradient-to-r from-beige-600 via-primary to-pink-200 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--beige-600), var(--primary), var(--pink-200))`,
            }}
          >
            Barangay
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-beige-700 max-w-3xl mx-auto mb-12 text-pretty font-medium leading-relaxed"
        >
          Your trusted local government partner. We're here to serve our
          community with dedicated assistance, comprehensive services, and
          responsive support.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            to="#contact-form"
            className="group relative inline-flex items-center gap-3 bg-primary hover:bg-beige-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2"
          >
            <svg
              className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
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
            Send Message
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            to="#office-location"
            className="group inline-flex items-center gap-3 bg-white/80 hover:bg-white border-2 border-beige-400 hover:border-beige-500 text-beige-800 hover:text-beige-900 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-beige-400/30 focus:ring-offset-2"
          >
            <svg
              className="w-6 h-6 group-hover:bounce transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Visit Office
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-beige-600"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="font-medium">24/7 Emergency Response</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="font-medium">Official Government Service</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full" />
            <span className="font-medium">Community First</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
