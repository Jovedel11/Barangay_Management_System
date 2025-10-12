import { Link } from "react-router-dom";

export default function Logo({
  altText = "Logo",
  size = "md",
  className = "",
  to = "/",
}) {
  const sizeClasses = {
    sm: "w-[35px] h-[35px]",
    md: "w-[45px] h-[45px]",
    lg: "w-[55px] h-[55px]",
    xl: "w-[65px] h-[65px]",
  };

  const imageSizeClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
    xl: "w-11 h-11",
  };

  return (
    <Link
      to={to}
      className={`${sizeClasses[size]} 
                  w-full h-full
                  bg-gradient-to-br from-pink-50 to-pink-100 
                  flex items-center justify-center 
                  shadow-[0_4px_12px_rgba(236,72,153,0.15)] 
                  transition-all duration-300 
                  hover:shadow-[0_6px_20px_rgba(236,72,153,0.25)] 
                  hover:-translate-y-[1px]
                  hover:scale-[1.05] active:scale-[0.95]
                  cursor-pointer
                  ${className}`}
    >
      <img
        src="/image/brgyto.png"
        alt={altText}
        loading="eager"
        className={`${imageSizeClasses[size]} object-contain 
                    drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] 
                    transition duration-200 
                    hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]`}
      />
    </Link>
  );
}
