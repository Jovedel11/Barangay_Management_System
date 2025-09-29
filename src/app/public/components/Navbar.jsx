import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    setIsScrolled(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Check if on auth pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // Different styling for auth pages vs home page
  const getNavStyles = () => {
    if (isAuthPage) {
      return {
        nav: "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm",
        logo: "text-slate-800 hover:text-primary",
        logoSubtext: "text-slate-500",
        mobileButton: "text-slate-700 hover:text-primary hover:bg-slate-100",
      };
    }

    return {
      nav: isScrolled
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        : "bg-transparent",
      logo: isScrolled
        ? "text-slate-800 hover:text-primary"
        : "text-white hover:text-slate-200",
      logoSubtext: isScrolled ? "text-slate-500" : "text-white/80",
      mobileButton: isScrolled
        ? "text-slate-700 hover:text-primary hover:bg-slate-100"
        : "text-white hover:text-slate-200 hover:bg-white/10",
    };
  };

  const styles = getNavStyles();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${styles.nav}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-3 transition-colors duration-200 group ${styles.logo}`}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <img
                src="/favicon-96x96.png"
                alt="Barangay Kaypian"
                className="w-6 h-6 object-contain"
                loading="eager"
              />
            </div>
            <div className="hidden sm:block">
              <div className={`text-lg font-semibold ${styles.logo}`}>
                Barangay Kaypian
              </div>
              <div className={`text-xs ${styles.logoSubtext}`}>
                Resident Portal
              </div>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-accent text-white hover:bg-accent/90 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${styles.mobileButton}`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "rotate-45 top-2" : "top-1"
                }`}
              />
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-200 top-2 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block w-full h-0.5 bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "-rotate-45 top-2" : "top-3"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-slate-200 bg-white/95 backdrop-blur-md rounded-b-xl mt-2">
            <div className="px-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2.5 text-slate-700 hover:text-primary border border-slate-300 hover:border-primary rounded-xl transition-all duration-200 font-medium"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-xl font-medium transition-all duration-200"
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
