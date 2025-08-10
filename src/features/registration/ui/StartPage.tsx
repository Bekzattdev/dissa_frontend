import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Logo from "../../../shared/ui/Logo";

const StartPage = () => {
  const nav = useNavigate()
  return (
    <section className="relative h-[97dvh]  ">
      <div className="h-full flex flex-col justify-center items-center">
        <Logo  />
        <div className="flex flex-col gap-[16px] w-full">
          <Button onClick={()=> nav("/welcome") } className="bg-white text-[#0F172A]">Регистрация</Button>
          <Button className="border-2  border-white  text-white">
            Проблемы со входом
          </Button>
        </div>
        <div className="absolute bottom-0 text-center ">
          <p className="text-sm text-[#F4CFFD]">
            Нажимая “Создать аккаунт” или “Войти”, ты соглашаешься с нашими{" "}
            <a href="#">Условиями</a>. Чтобы узнать, как мы обрабатываем данные,
            ознакомься с Политикой конфиденциальности и{" "}
            <a href="#">Политикой в отошении файлов cookie</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StartPage;
