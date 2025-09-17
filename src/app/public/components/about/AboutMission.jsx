import React from "react";

const AboutMission = () => {
  const missions = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Our Mission",
      description:
        "To provide accessible, efficient, and transparent government services that empower our community members and foster trust between citizens and local government through innovative digital solutions.",
      bgColor: "rgba(212, 165, 116, 0.1)", // primary/10
      textColor: "var(--primary)",
      hoverBg: "rgba(212, 165, 116, 0.2)",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: "Our Vision",
      description:
        "To be the leading model of digital government service delivery, setting the standard for transparency, efficiency, and citizen satisfaction in local government operations nationwide.",
      bgColor: "rgba(232, 180, 203, 0.1)", // accent/10
      textColor: "var(--accent)",
      hoverBg: "rgba(232, 180, 203, 0.2)",
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
      title: "Our Values",
      description:
        "Integrity, Innovation, Inclusivity, and Impact. We are committed to serving our community with the highest ethical standards while embracing technological advancement for the greater good.",
      bgColor: "rgba(5, 150, 105, 0.1)", // success/10
      textColor: "var(--success)",
      hoverBg: "rgba(5, 150, 105, 0.2)",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: "rgba(212, 165, 116, 0.1)",
              borderColor: "rgba(212, 165, 116, 0.2)",
              color: "var(--primary)",
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
                d="M9 11H15M9 15H15M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Our Foundation</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mission, Vision &
            <span className="block mt-2 gradient-primary bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(45, 42, 38, 0.7)" }}
          >
            Our commitment to excellence drives everything we do, from the
            technology we develop to the relationships we build with our
            community.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideIn group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: mission.bgColor,
                  color: mission.textColor,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = mission.hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = mission.bgColor)
                }
              >
                {mission.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {mission.title}
              </h3>

              <p
                className="leading-relaxed"
                style={{ color: "rgba(45, 42, 38, 0.7)" }}
              >
                {mission.description}
              </p>

              {/* Decorative Element */}
              <div
                className="mt-6 w-12 h-1 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: mission.textColor }}
              ></div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center animate-fadeIn">
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: "rgba(212, 165, 116, 0.1)",
                color: "var(--primary)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 21C3 17.134 3 15.201 3.87868 13.87C4.75736 12.539 6.17157 11.8284 9 10.4062L9.5 12C6.5 13.5 5.5 14.5 5.5 16.5C5.5 17.0128 5.58289 17.4706 5.72406 17.8728C6.07806 17.5336 6.5138 17.25 7 17.25C8.24264 17.25 9.25 18.2574 9.25 19.5C9.25 20.7426 8.24264 21.75 7 21.75C4.92893 21.75 3.25 20.0711 3.25 18C3.25 17.6872 3.25 17.3841 3.25 17.0918"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 21C14.5 17.134 14.5 15.201 15.3787 13.87C16.2574 12.539 17.6716 11.8284 20.5 10.4062L21 12C18 13.5 17 14.5 17 16.5C17 17.0128 17.0829 17.4706 17.2241 17.8728C17.5781 17.5336 18.0138 17.25 18.5 17.25C19.7426 17.25 20.75 18.2574 20.75 19.5C20.75 20.7426 19.7426 21.75 18.5 21.75C16.4289 21.75 14.75 20.0711 14.75 18C14.75 17.6872 14.75 17.3841 14.75 17.0918"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 italic leading-relaxed">
              "Technology should serve the people, making government services
              more accessible, efficient, and transparent for every member of
              our community."
            </blockquote>
            <cite
              style={{ color: "rgba(45, 42, 38, 0.7)" }}
              className="font-medium"
            >
              — Barangay Captain, Digital Transformation Initiative
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
