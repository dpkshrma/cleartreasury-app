import React from "react";

const buttonClasses = [
  "inline-flex items-center justify-center",
  "border rounded",
  "text-center leading-snug",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "transition-all duration-300",
  "hover:shadow-md hover:cursor-pointer",
].join(" ");

const STYLES = {
  PRIMARY: `${buttonClasses} text-white bg-green-600 border-green-600 hover:bg-green-700 focus:ring-green-500`,
  SECONDARY: `${buttonClasses}`,
};

const SIZES = {
  SMALL: `py-1 px-4`,
  MEDIUM: `py-2 px-4`,
  LARGE: `py-3 px-8`,
};

const Button = (props) => {
  return <button {...props} />;
};

Button.SIZES = SIZES;
Button.STYLES = STYLES;

export default Button;
