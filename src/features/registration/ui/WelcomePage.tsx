import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import LogoSecond from "../../../shared/ui/LogoSecond";
import Star from "../../../shared/ui/stars/Star";

const rules = [
  {
    title: "Будьте собой",
    descr: <>Ваши фото, возраст и информация о себе должны быть настоящими.</>,
  },
  {
    title: "Помните о безопасности",
    descr: (
      <>
        Не торопитесь делиться своей личной информацией. <br />
        <span className="font-bold">Безопасность превыше всего!</span>
      </>
    ),
  },
  {
    title: "Ведите себя достойно",
    descr: (
      <>
        Уважайте других и относитесь к ним так, как вы бы хотели, чтоб они
        относились к вам.
      </>
    ),
  },
  {
    title: "Действуйте решительно",
    descr: <>Всегда сообщайте о неподобающем поведении.</>,
  },
];
const WelcomePage = () => {
  const nav = useNavigate();

  return (
    <section className="w-full h-[97dvh] relative">
      <div onClick={() => nav(-1)} className="flex justify-end text-4xl">
        &times;
      </div>
      <div className="flex flex-col gap-6 ">
        <LogoSecond />
        <p className="italic font-light">
          Пожалуйста, соблюдайте следующие <br /> правила:
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {rules.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex  items-ceter gap-2 ">
              <Star />
              <div className="flex flex-col gap-1">
                <span className="font-bold">{item.title}</span>
                <p className="text-sm leading-4 ">{item.descr}</p>
              </div>
            </div>
            <hr className="text-[#F9E7FE66]" />
          </div>
        ))}
      </div>
      <Button
        className="bg-white absolute bottom-0 text-[#0F172A]"
        onClick={() => nav("/auth/acquaint")}
      >
        Принять
      </Button>
    </section>
  );
};

export default WelcomePage;
