import logo from "../assets/image 71.svg";
import Button from "../shared/ui/Button";
const ProfileStart = () => {
  return (
    <section className="relative h-[97dvh] flex flex-col items-center  gap-10 ">
      <img src={logo} alt="logo" className="w-[130px] h-auto !mt-16" />
      <div className="flex text-center flex-col gap-4 ">
        <h1>Профиль создан</h1>
        <p className="text-lg">
          Профиль создан и отправлен на модерацию. Модерация занимает от 5 минут
          до 1 часа. Но ты можешь начать знакомиться прямо сейчас{" "}
        </p>
      </div>
      <Button className="absolute bottom-0 rounded-full bg-white text-black">
        Начать знакомиться
      </Button>
    </section>
  );
};

export default ProfileStart;
