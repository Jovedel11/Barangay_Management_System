import React from "react";

const AboutValues = () => {
  const coreValues = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22S2 16 2 9C2 7.14348 2.73751 5.36301 4.05025 4.05025C5.36301 2.73751 7.14348 2 9 2C10.25 2 11.5 2.5 12 3.5C12.5 2.5 13.75 2 15 2C16.8565 2 18.637 2.73751 19.9497 4.05025C21.2625 5.36301 22 7.14348 22 9C22 16 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our operations, ensuring transparency and honesty in every interaction with our community.",
      principles: [
        "Honest communication",
        "Ethical practices",
        "Transparent processes",
        "Accountability",
      ],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and creative solutions to continuously improve our services and exceed citizen expectations.",
      principles: [
        "Technology adoption",
        "Creative solutions",
        "Continuous improvement",
        "Future-ready systems",
      ],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M23 21V19C23 18.1645 22.7155 17.3541 22.2004 16.6953C21.6853 16.0364 20.9719 15.5707 20.166 15.374"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8059 3.3267 17.5193 3.79244 18.0344 4.45126C18.5495 5.11008 18.834 5.92051 18.834 6.755C18.834 7.58949 18.5495 8.39992 18.0344 9.05874C17.5193 9.71756 16.8059 10.1833 16 10.38"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Inclusivity",
      description:
        "We design our services to be accessible to all community members, regardless of age, technical ability, or socioeconomic status.",
      principles: [
        "Universal access",
        "Digital equity",
        "Cultural sensitivity",
        "Barrier-free design",
      ],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 14S9.5 16 12 16S16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Impact",
      description:
        "We measure our success by the positive difference we make in people's lives and the efficiency we bring to government services.",
      principles: [
        "Measurable outcomes",
        "Community benefit",
        "Service excellence",
        "Sustainable growth",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: "rgba(232, 180, 203, 0.08)",
              borderColor: "rgba(232, 180, 203, 0.2)",
              color: "var(--accent)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-2"
            >
              <path
                d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Core Values</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What We
            <span className="block mt-2 bg-clip-text text-accent">
              Stand For
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(45, 42, 38, 0.7)" }}
          >
            Our core values guide every decision we make and every service we
            provide, ensuring we remain true to our commitment to the community.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideIn group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon & Title */}
              <div className="flex items-start space-x-6 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(212, 165, 116, 0.08)",
                    color: "var(--primary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(212, 165, 116, 0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(212, 165, 116, 0.08)")
                  }
                >
                  {value.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: "rgba(45, 42, 38, 0.7)" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>

              {/* Principles */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-3">
                  Key Principles:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {value.principles.map((principle, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--primary)" }}
                      ></div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(45, 42, 38, 0.7)" }}
                      >
                        {principle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
