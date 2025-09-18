import React from "react";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  circle = false,
  borderRadius = "6px",
  className = "",
  style = {},
}) => {
  const skeletonClasses = `
    relative overflow-hidden 
    bg-muted 
    ${circle ? "rounded-full" : "rounded-md"} 
    ${className}
  `;

  const skeletonStyle = {
    width,
    height: circle ? width : height,
    borderRadius: circle ? "50%" : borderRadius,
    ...style,
  };

  return (
    <div
      className={skeletonClasses}
      style={skeletonStyle}
      aria-label="Loading content"
      role="status"
    >
      {/* Shimmer animation */}
      <div
        className="
          absolute inset-0 w-full h-full
          bg-gradient-to-r from-transparent via-white/50 to-transparent
          animate-[shimmer_1.5s_infinite]
        "
      />
    </div>
  );
};

export default Skeleton;
