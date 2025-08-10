import logo from "../../assets/Logo.svg";

const Logo = ({ className = "" }) => (
  <img
    className={`w-[175px] ${className} `}
    src={logo}
    alt="❤️ Dissa"
    loading="lazy"
    decoding="async"
  />
);

export default Logo;
