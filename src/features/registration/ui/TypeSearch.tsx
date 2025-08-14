import { useFormContext } from "react-hook-form";
import Label from "../../../shared/ui/Label";

const typeOptions = [
  {
    title: "Гибридный",
    value: "hybrid",
    description:
      "Позволяет выбрать тип поиска: Отношения (искать противоположный пол) или Дружба и общение (искать свой или противоположный пол).",
  },
  {
    title: "Стандартный (рекомендуемый)",
    value: "standard",
    description:
      "Ищет только противоположный пол для любых типов общения, без возможности выбора гендера.",
  },
];

const TypeSearch = () => {
  const { register, watch, setValue } = useFormContext();
  const searchType = watch("searchType");
  const partnerGender = watch("partnerGender");

  return (
    <section className="flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-4">
        <h1>Выбери тип поиска</h1>
        {typeOptions.map((option, idx) => (
          <div
            key={idx}
            className={`w-full h-[110px] flex justify-between items-center rounded-[20px] gap-2 !px-6 ${
              searchType === option.value
                ? "bg-purple-100 border border-purple-500"
                : "bg-white"
            }`}
            onClick={() => setValue("searchType", option.value)}
          >
            <div className="w-[254px]">
              <p className="text-[#BF26D2] font-medium text-sm">
                {option.title}
              </p>
              <p className="text-[#334155] text-xs font-light">
                {option.description}
              </p>
            </div>
            <input
              type="radio"
              className="accent-purple-500"
              checked={searchType === option.value}
              onChange={() => setValue("searchType", option.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h1>Кого ты ищешь</h1>
        <div className="flex justify-between">
          <Label isActive={partnerGender === "male"}>
            Мужчина
            <input
              type="radio"
              value="male"
              className="accent-[#BF26D2]"
              checked={partnerGender === "male"}
              onChange={() => setValue("partnerGender", "male")}
            />
          </Label>
          <Label isActive={partnerGender === "female"}>
            Женщина
            <input
              type="radio"
              value="female"
              className="accent-[#BF26D2]"
              checked={partnerGender === "female"}
              onChange={() => setValue("partnerGender", "female")}
            />
          </Label>
          <Label isActive={partnerGender === "all"}>
            Все
            <input
              type="radio"
              value="all"
              className="accent-[#BF26D2]"
              checked={partnerGender === "all"}
              onChange={() => setValue("partnerGender", "all")}
            />
          </Label>
        </div>
      </div>
    </section>
  );
};
export default TypeSearch;
