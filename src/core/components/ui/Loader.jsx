import React from "react";

const Loader = ({ size = "medium", color, message }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-8"
      role="status"
      aria-label="Loading"
    >
      <SpinnerLoader size={size} color={color} />
      {message && (
        <p className="text-center text-foreground font-medium max-w-[25ch] mt-0 text-base">
          {message}
        </p>
      )}
    </div>
  );
};

const SpinnerLoader = ({ size, color }) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const spinnerSize =
    typeof size === "number" ? size : sizeMap[size] || sizeMap.medium;

  return (
    <div
      className="relative animate-spin"
      style={{ width: spinnerSize, height: spinnerSize }}
    >
      {/* Spinner ring */}
      <div
        className="absolute inset-0 rounded-full border-4 border-solid"
        style={{
          borderTopColor: color || "#2563eb", // primary (blue-600 default)
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center transform scale-70">
        <DocumentIcon color={color} />
      </div>
    </div>
  );
};

// 📂 Barangay Document Icon
const DocumentIcon = ({ color = "#2563eb" }) => (
  <svg
    className="w-full h-full"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Folder Base */}
    <path
      d="M8 20h20l4 6h24v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V20z"
      fill={color}
      opacity="0.2"
    />
    <path
      d="M8 20h20l4 6h24v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V20z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Paper Inside */}
    <rect
      x="18"
      y="18"
      width="20"
      height="28"
      rx="2"
      fill="white"
      stroke={color}
      strokeWidth="2"
    />
    <line x1="22" y1="24" x2="34" y2="24" stroke={color} strokeWidth="2" />
    <line x1="22" y1="30" x2="34" y2="30" stroke={color} strokeWidth="2" />
    <line x1="22" y1="36" x2="30" y2="36" stroke={color} strokeWidth="2" />
  </svg>
);

export default Loader;
