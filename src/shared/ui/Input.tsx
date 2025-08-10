type InputProps = {
  placeholder: string;
  className?: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ placeholder, className = "", type, ...rest }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full h-[51px] px-4 py-3 rounded-full bg-white text-sm text-black focus:outline-none ${className}`}
      {...rest}
    />
  );
};

  
  export default Input;
  