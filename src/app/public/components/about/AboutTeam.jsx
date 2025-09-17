import React from "react";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Maria Elena Santos",
      role: "Barangay Captain",
      department: "Executive Leadership",
      bio: "Leading the digital transformation initiative with over 15 years of public service experience.",
      achievements: [
        "Digital Government Pioneer",
        "Community Service Excellence Award",
        "Public Administration Masters",
      ],
      social: {
        email: "captain@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Roberto Cruz",
      role: "IT Director",
      department: "Technology & Systems",
      bio: "Overseeing the technical architecture and security of our digital government platform.",
      achievements: [
        "Cybersecurity Certification",
        "Government IT Excellence",
        "Digital Innovation Leader",
      ],
      social: {
        email: "it.director@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Ana Patricia Reyes",
      role: "Operations Manager",
      department: "Citizen Services",
      bio: "Ensuring smooth operations and exceptional citizen experience in our digital services.",
      achievements: [
        "Service Excellence Award",
        "Process Optimization Expert",
        "Customer Experience Leader",
      ],
      social: {
        email: "operations@barangay.gov.ph",
        linkedin: "#",
      },
    },
    {
      name: "Jonathan Miguel Torres",
      role: "Systems Administrator",
      department: "Technical Support",
      bio: "Maintaining system reliability and providing technical support to ensure 24/7 service availability.",
      achievements: [
        "System Reliability Expert",
        "Cloud Infrastructure Specialist",
        "24/7 Support Excellence",
      ],
      social: {
        email: "sysadmin@barangay.gov.ph",
        linkedin: "#",
      },
    },
  ];

  const departments = [
    {
      name: "Executive Leadership",
      description: "Strategic oversight and policy direction",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "var(--primary)",
    },
    {
      name: "Technology & Systems",
      description: "Platform development and security",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="21"
            x2="16"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="17"
            x2="12"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      color: "var(--accent)",
    },
    {
      name: "Citizen Services",
      description: "User experience and support",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      color: "var(--success)",
    },
    {
      name: "Technical Support",
      description: "System maintenance and assistance",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.7 6.3C16.2 7.8 16.2 10.2 14.7 11.7L11.7 14.7C10.2 16.2 7.8 16.2 6.3 14.7C4.8 13.2 4.8 10.8 6.3 9.3L7.5 8.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.3 17.7C7.8 16.2 7.8 13.8 9.3 12.3L12.3 9.3C13.8 7.8 16.2 7.8 17.7 9.3C19.2 10.8 19.2 13.2 17.7 14.7L16.5 15.9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "var(--warning)",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-foreground to-gray-900 text-background relative overflow-hidden py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: "rgba(212, 165, 116, 0.15)",
              borderColor: "rgba(212, 165, 116, 0.3)",
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
                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M23 21V19C23 18.1645 22.7155 17.3541 22.2004 16.6953C21.6853 16.0364 20.9719 15.5707 20.166 15.374"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Our Team</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6">
            Meet the People Behind
            <span className="block mt-2" style={{ color: "var(--primary)" }}>
              Digital Innovation
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(254, 252, 248, 0.8)" }}
          >
            Our dedicated team of public servants and technology professionals
            working together to transform government service delivery for our
            community.
          </p>
        </div>

        {/* Departments Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slideIn">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="backdrop-blur-sm rounded-xl p-6 shadow-md border transition-all duration-300 text-center group hover:shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${dept.color}20`,
                  color: dept.color,
                }}
              >
                {dept.icon}
              </div>
              <h3 className="font-semibold text-background mb-2 group-hover:text-primary transition-colors duration-300">
                {dept.name}
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(254, 252, 248, 0.7)" }}
              >
                {dept.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="backdrop-blur-sm rounded-2xl p-8 shadow-lg border transition-all duration-300 transform hover:-translate-y-1 animate-slideIn group"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {/* Member Header */}
              <div className="flex items-start space-x-6 mb-6">
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(212, 165, 116, 0.2)",
                    color: "var(--primary)",
                  }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-background mb-1 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p
                    className="font-medium mb-1"
                    style={{ color: "var(--primary)" }}
                  >
                    {member.role}
                  </p>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "rgba(254, 252, 248, 0.8)",
                    }}
                  >
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p
                className="mb-6 leading-relaxed"
                style={{ color: "rgba(254, 252, 248, 0.8)" }}
              >
                {member.bio}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="font-semibold text-background mb-3">
                  Key Achievements:
                </h4>
                <div className="space-y-2">
                  {member.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(5, 150, 105, 0.3)" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "var(--success)" }}
                        ></div>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(254, 252, 248, 0.8)" }}
                      >
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div
                className="flex items-center space-x-4 pt-4 border-t"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <a
                  href={`mailto:${member.social.email}`}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group/icon"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(254, 252, 248, 0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(212, 165, 116, 0.2)";
                    e.target.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.color = "rgba(254, 252, 248, 0.7)";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover/icon:scale-110 transition-transform duration-300"
                  >
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
                </a>
                <a
                  href={member.social.linkedin}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group/icon"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(254, 252, 248, 0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(212, 165, 116, 0.2)";
                    e.target.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.color = "rgba(254, 252, 248, 0.7)";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover/icon:scale-110 transition-transform duration-300"
                  >
                    <path
                      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="2"
                      y="9"
                      width="4"
                      height="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <div className="flex-1 text-right">
                  <span
                    className="text-xs"
                    style={{ color: "rgba(254, 252, 248, 0.5)" }}
                  >
                    Available for consultation
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Culture */}
        <div
          className="mt-20 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border animate-fadeIn"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-background mb-4">
              Our Team Culture
            </h3>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "rgba(254, 252, 248, 0.8)" }}
            >
              We foster a collaborative environment focused on innovation,
              integrity, and public service excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "users",
                title: "Collaborative",
                desc: "Working together across departments to deliver exceptional citizen services",
                color: "var(--primary)",
              },
              {
                icon: "layers",
                title: "Innovative",
                desc: "Embracing new technologies and creative solutions for better government services",
                color: "var(--accent)",
              },
              {
                icon: "heart",
                title: "Service-Oriented",
                desc: "Dedicated to improving the lives of our community members through public service",
                color: "var(--success)",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    {item.icon === "users" && (
                      <>
                        <path
                          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="9"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
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
                      </>
                    )}
                    {item.icon === "layers" && (
                      <>
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
                      </>
                    )}
                    {item.icon === "heart" && (
                      <path
                        d="M12 22S2 16 2 9C2 7.14348 2.73751 5.36301 4.05025 4.05025C5.36301 2.73751 7.14348 2 9 2C10.25 2 11.5 2.5 12 3.5C12.5 2.5 13.75 2 15 2C16.8565 2 18.637 2.73751 19.9497 4.05025C21.2625 5.36301 22 7.14348 22 9C22 16 12 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-background mb-2">
                  {item.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "rgba(254, 252, 248, 0.7)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
