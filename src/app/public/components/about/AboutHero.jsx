import React from "react";

const AboutHero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 bg-primary-foreground relative overflow-hidden">
      {/* Simplified Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--muted)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              About Our
              <span className="block mt-2 gradient-primary bg-clip-text text-accent">
                Digital Government Service
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: "rgba(45, 42, 38, 0.7)" }}
            >
              Transforming traditional government services through innovative
              digital solutions that serve our community with transparency,
              efficiency, and accessibility.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-slideIn">
              {[
                { value: "2+", label: "Years Serving" },
                { value: "5K+", label: "Happy Residents" },
                { value: "10K+", label: "Documents Processed" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: "var(--primary)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "rgba(45, 42, 38, 0.6)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
