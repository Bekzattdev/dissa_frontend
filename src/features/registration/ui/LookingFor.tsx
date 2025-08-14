import { useFormContext } from "react-hook-form";
import {
  AmberHeart,
  BlackRibbonHeart,
  GoldenFireHeart,
  GreenGlossyHeart,
  IridescentHeart,
  LeopardHeart,
  redHeart,
  RoseGoldHeart,
  silverHeart,
} from "../../../assets/Hearts";

const heartsArr = [
  {
    title: "Долгосрочный партнёр",
    logo: redHeart,
  },
  {
    title: "Долго или краткосрочно",
    logo: silverHeart,
  },
  {
    title: "Без обязательств",
    logo: LeopardHeart,
  },
  {
    title: "Найти друзей",
    logo: AmberHeart,
  },
  {
    title: "Пока что не решил(а)",
    logo: BlackRibbonHeart,
  },
  {
    title: "Просто повеселиться",
    logo: GreenGlossyHeart,
  },
  {
    title: "Совместные хобби / игры",
    logo: RoseGoldHeart,
  },
  {
    title: "Взаимная поддержка",
    logo: IridescentHeart,
  },
  {
    title: "Долгосрочное общение",
    logo: GoldenFireHeart,
  },
];

const LookingFor = () => {
  const { setValue, watch } = useFormContext();
  const lookingFor = watch("lookingFor");

  return (
    <section className="h-full w-full flex justify-center ">
      <div className="flex flex-col gap-8">
        <h1>Что ты ищешь?</h1>
        <div className="flex flex-wrap justify-between gap-6">
          {heartsArr.map((item, idx) => (
            <div
              key={idx}
              className={`w-[100px] h-[100px] !p-2 text-[10px] flex flex-col justify-center gap-2 rounded-[20px] text-center items-center shadow-xl cursor-pointer transition-all ${
                lookingFor === item.title
                  ? "bg-purple-500 text-white scale-105"
                  : "bg-white text-[#475569] hover:bg-purple-100"
              }`}
              onClick={() => setValue("lookingFor", item.title)}
            >
              <img
                src={item.logo}
                alt="logo"
                className="w-[40px] h-[40px] object-contain"
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookingFor;
