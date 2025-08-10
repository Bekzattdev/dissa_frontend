type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const Button = ({ children, className = "", onClick, type = "button", disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-[51px] rounded-full  transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
