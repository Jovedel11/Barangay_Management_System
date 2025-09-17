import React, { useState, useEffect, useRef } from "react";

const AboutStats = () => {
  const [visibleStats, setVisibleStats] = useState(new Set());
  const [animatedValues, setAnimatedValues] = useState({});
  const observerRef = useRef(null);

  const statistics = [
    {
      id: "documents",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14,2 14,8 20,8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: 15420,
      suffix: "+",
      label: "Documents Processed",
      description: "Successfully completed requests",
      bgColor: "rgba(212, 165, 116, 0.08)",
      textColor: "var(--primary)",
      hoverBg: "rgba(212, 165, 116, 0.15)",
    },
    {
      id: "users",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
      value: 8750,
      suffix: "+",
      label: "Registered Users",
      description: "Active community members",
      bgColor: "rgba(232, 180, 203, 0.08)",
      textColor: "var(--accent)",
      hoverBg: "rgba(232, 180, 203, 0.15)",
    },
    {
      id: "satisfaction",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
      value: 98.5,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Based on user feedback",
      bgColor: "rgba(5, 150, 105, 0.08)",
      textColor: "var(--success)",
      hoverBg: "rgba(5, 150, 105, 0.15)",
    },
    {
      id: "time",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="12,6 12,12 16,14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: 85,
      suffix: "%",
      label: "Time Saved",
      description: "Compared to traditional methods",
      bgColor: "rgba(217, 119, 6, 0.08)",
      textColor: "var(--warning)",
      hoverBg: "rgba(217, 119, 6, 0.15)",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statId = entry.target.dataset.statId;
            setVisibleStats((prev) => new Set([...prev, statId]));

            const stat = statistics.find((s) => s.id === statId);
            if (stat) {
              animateValue(stat.id, 0, stat.value, 1500);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-stat-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const animateValue = (id, start, end, duration) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;

      setAnimatedValues((prev) => ({ ...prev, [id]: currentValue }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const formatValue = (stat) => {
    const value = animatedValues[stat.id] || 0;
    return stat.id === "satisfaction" || stat.id === "time"
      ? value.toFixed(1)
      : Math.floor(value).toLocaleString();
  };

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full border"
            style={{
              backgroundColor: "rgba(212, 165, 116, 0.08)",
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
            <span className="text-sm font-medium">Impact & Results</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our System
            <span className="block mt-2 gradient-primary bg-clip-text text-accent">
              By the Numbers
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(45, 42, 38, 0.7)" }}
          >
            Real data showcasing the positive impact of our digital
            transformation on community service delivery and citizen
            satisfaction.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              data-stat-id={stat.id}
              className={`glass-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${
                visibleStats.has(stat.id) ? "animate-scaleIn" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.textColor,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = stat.hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = stat.bgColor)
                }
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {formatValue(stat)}
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(45, 42, 38, 0.6)" }}
                >
                  {stat.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    backgroundColor: stat.textColor,
                    width: visibleStats.has(stat.id) ? "100%" : "0%",
                    transitionDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeIn">
          {[
            {
              icon: "clock",
              value: "24/7",
              label: "System Availability",
              color: "var(--info)",
            },
            {
              icon: "shield",
              value: "100%",
              label: "Data Security",
              color: "var(--success)",
            },
            {
              icon: "leaf",
              value: "Zero",
              label: "Paper Waste",
              color: "var(--primary)",
            },
          ].map((metric, index) => (
            <div key={index} className="text-center p-6 glass-card rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: `${metric.color}15`,
                  color: metric.color,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {metric.icon === "clock" && (
                    <>
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                  {metric.icon === "shield" && (
                    <>
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="16"
                        r="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </>
                  )}
                  {metric.icon === "leaf" && (
                    <path
                      d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                {metric.value}
              </h4>
              <p className="text-sm" style={{ color: "rgba(45, 42, 38, 0.6)" }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
