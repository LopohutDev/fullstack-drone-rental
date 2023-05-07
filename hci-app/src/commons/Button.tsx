import React from "react";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: React.FC<ComponentProps> = ({
  className,
  children,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      type={type}
      className={`bg-[#F4511E] text-white text-sm px-10 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
