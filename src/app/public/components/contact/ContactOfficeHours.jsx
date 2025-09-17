import React, { useState, useEffect } from "react";

const ContactOfficeHours = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;

      // Monday to Friday: 8:00 AM - 5:00 PM (480 - 1020 minutes)
      // Saturday: 9:00 AM - 3:00 PM (540 - 900 minutes)
      // Sunday: Closed

      if (day >= 1 && day <= 5) {
        setIsOpen(currentMinutes >= 480 && currentMinutes < 1020);
      } else if (day === 6) {
        setIsOpen(currentMinutes >= 540 && currentMinutes < 900);
      } else {
        setIsOpen(false);
      }
    };

    checkIfOpen();
  }, [currentTime]);

  const scheduleData = [
    {
      day: "Monday",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Services", "Permits & Licenses", "Social Services"],
      isToday: currentTime.getDay() === 1,
    },
    {
      day: "Tuesday",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Services", "Health Services", "Peace & Order"],
      isToday: currentTime.getDay() === 2,
    },
    {
      day: "Wednesday",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Services", "Disaster Management", "Senior Citizens"],
      isToday: currentTime.getDay() === 3,
    },
    {
      day: "Thursday",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Services", "Youth Development", "Women Affairs"],
      isToday: currentTime.getDay() === 4,
    },
    {
      day: "Friday",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Services", "Business Permits", "Tax Services"],
      isToday: currentTime.getDay() === 5,
    },
    {
      day: "Saturday",
      hours: "9:00 AM - 3:00 PM",
      services: ["Emergency Services Only", "Limited General Services"],
      isToday: currentTime.getDay() === 6,
    },
    {
      day: "Sunday",
      hours: "Closed",
      services: ["Emergency Services Only"],
      isToday: currentTime.getDay() === 0,
    },
  ];

  const holidays = [
    { date: "2024-12-25", name: "Christmas Day" },
    { date: "2024-12-30", name: "Rizal Day" },
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-02-25", name: "EDSA People Power Revolution" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Office Hours
        </h2>
        <p className="text-muted-foreground text-lg">
          Plan your visit according to our operating schedule
        </p>
      </div>

      {/* Current Status */}
      <div className="card-glass p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${
                isOpen ? "bg-success animate-pulse" : "bg-destructive"
              }`}
            />
            <h3 className="text-xl font-semibold text-foreground">
              Currently {isOpen ? "Open" : "Closed"}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Time</p>
            <p className="text-lg font-mono text-foreground">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {isOpen ? (
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-success">We're Open!</h4>
                <p className="text-sm text-success/80">
                  Visit us today for assistance with your needs
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-destructive">
                  Currently Closed
                </h4>
                <p className="text-sm text-destructive/80">
                  Please visit us during regular business hours
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Schedule */}
      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-beige-300/30">
          <h3 className="text-xl font-semibold text-foreground">
            Weekly Schedule
          </h3>
          <p className="text-muted-foreground">
            Regular operating hours and available services
          </p>
        </div>

        <div className="divide-y divide-beige-300/30">
          {scheduleData.map((schedule, index) => (
            <div
              key={index}
              className={`p-6 transition-all duration-200 ${
                schedule.isToday
                  ? "bg-primary/5 border-l-4 border-l-primary"
                  : "hover:bg-muted/20"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4
                      className={`font-semibold ${
                        schedule.isToday ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {schedule.day}
                      {schedule.isToday && (
                        <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Today
                        </span>
                      )}
                    </h4>
                  </div>
                  <p
                    className={`font-medium mb-2 ${
                      schedule.hours === "Closed"
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    {schedule.hours}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {schedule.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {schedule.isToday && (
                  <div className="flex items-center gap-2 text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Notices */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Special Notices
        </h3>

        {/* Holidays */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-warning mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1">
              <h4 className="font-semibold text-warning mb-2">
                Upcoming Holidays
              </h4>
              <div className="space-y-2">
                {holidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-warning/90">{holiday.name}</span>
                    <span className="text-warning font-mono">
                      {new Date(holiday.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-accent mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-accent mb-2">
                24/7 Emergency Services
              </h4>
              <p className="text-sm text-accent/90 mb-2">
                Emergency assistance is available round the clock. Call
                immediately for urgent matters.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-destructive/20 text-destructive text-xs rounded-full font-medium">
                  911 - National Emergency
                </span>
                <span className="px-3 py-1 bg-destructive/20 text-destructive text-xs rounded-full font-medium">
                  117 - Police Hotline
                </span>
                <span className="px-3 py-1 bg-warning/20 text-warning text-xs rounded-full font-medium">
                  8-HELP - Barangay Hotline
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOfficeHours;
