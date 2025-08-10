import Input from "../../../shared/ui/Input";
import Label from "../../../shared/ui/Label";
import { useFormContext } from "react-hook-form";

const AcquaintPage = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const gender = watch("gender");

  return (
    <section>
      <h1 className="!mb-12">Познакомимся поближе!</h1>
      <div>
        <div className="!mb-6 flex flex-col gap-4">
          <p className="font-bold text-2xl">
            Какое имя ты хочешь использовать?
          </p>
          <p className="italic font-light">
            Это имя будет отображаться для других пользователей
          </p>

          <Input
            type="text"
            placeholder="Введите свое имя"
            {...register("name")}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
        <div className="!mb-6 flex flex-col gap-4">
          <p className="font-bold text-2xl">Твоя дата рождения</p>
          <Input
            placeholder={""}
            className="date-init"
            type="date"
            {...register("birthDate", { required: true })}
          />
          {/* {errors.birthDate && (
           <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )} */}
        </div>

        <div className="!mb-6 flex flex-col gap-4">
          <p className="font-bold text-2xl">Выбери свой гендер</p>
          <div className="flex gap-4">
            <Label isActive={gender === "male"}>
              Мужчина
              <input
                type="radio"
                value="male"
                className="accent-[#BF26D2] border-2"
                checked={gender === "male"}
                onChange={() => setValue("gender", "male")}
              />
            </Label>
            <Label isActive={gender === "female"}>
              Женщина
              <input
                type="radio"
                value="female"
                className="accent-[#BF26D2]"
                checked={gender === "female"}
                onChange={() => setValue("gender", "female")}
              />
            </Label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcquaintPage;
