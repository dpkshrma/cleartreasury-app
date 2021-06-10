import React from "react";

const buttonClasses = [
  "inline-flex items-center",
  "border rounded",
  "text-center leading-snug",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "transition-all duration-300",
  "hover:shadow-md hover:cursor-pointer",
].join(" ");

const STYLES = {
  PRIMARY: `${buttonClasses} text-white bg-green-600`,
  SECONDARY: `${buttonClasses}`,
};

const SIZES = {
  SMALL: ``,
  MEDIUM: `py-2 px-4`,
  LARGE: ``,
};

const Button = (props) => {
  return <button {...props} />;
};

Button.SIZES = SIZES;
Button.STYLES = STYLES;

export default Button;
