import { useNavigate } from "react-router-dom";
import back from "../../assets/arrow_top_left.svg";
const Back = ({ className = "" }) => {
  const nav = useNavigate();
  return (
    <img
      className={`w-[24px] h-[20px] ${className} `}
      onClick={() => nav(-1)}
      src={back}
      alt="&#11013"
    />
  );
};

export default Back;
