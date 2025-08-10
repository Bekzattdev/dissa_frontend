import {
  DRINK_CHOICES,
  SMOKING_CHOICES,
  SPORT_CHOICES,
  PET_CHOICES,
} from "../../../shared/config/choices";
import { useFormContext } from "react-hook-form";

const optionsConfig = [
  {
    title: "Как часто ты пьешь алкоголь?",
    choices: DRINK_CHOICES,
    field: "alcohol"
  },
  {
    title: "Как часто ты куришь?",
    choices: SMOKING_CHOICES,
    field: "smoking"
  },
  {
    title: "Ты занимаешься спортом?",
    choices: SPORT_CHOICES,
    field: "sports"
  },
  {
    title: "У тебя есть питомцы?",
    choices: PET_CHOICES,
    field: "pets"
  },
];

const TellSelf = () => {
  const { register, watch, setValue } = useFormContext();
  
  const aboutYou = watch("aboutYou") || {};
  const description = aboutYou.description || "";

  const handleSelect = (field: string, value: string) => {
    if (field === "pets") {
      // Для питомцев - множественный выбор
      const currentPets = [...(aboutYou.pets || [])];
      const index = currentPets.indexOf(value);
      
      if (index > -1) {
        currentPets.splice(index, 1);
      } else {
        currentPets.push(value);
      }
      
      setValue("aboutYou.pets", currentPets);
    } else {
      // Для остальных - одиночный выбор
      setValue(`aboutYou.${field}`, aboutYou[field] === value ? "" : value);
    }
  };

  const isSelected = (field: string, value: string) => {
    if (field === "pets") {
      return (aboutYou.pets || []).includes(value);
    }
    return aboutYou[field] === value;
  };

  return (
    <section className="w-full flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-2">
        <h1>Расскажи немного о себе</h1>
        <textarea
          className="w-full h-[90px] text-sm outline rounded-[30px] bg-white !px-4 !py-2 placeholder:text-gray-600 text-[#2e3641]"
          placeholder="Расскажи о своих увлечениях, мечтах, о том что тебя вдохновляет."
          value={description}
          {...register("aboutYou.description")}
          onChange={(e) => setValue("aboutYou.description", e.target.value)}
        />
        <p className="italic font-light ">
          Твои привычки похожи на привычки пары? У тебя право первого слова.
        </p>
      </div>
      
      {optionsConfig.map(({ title, choices, field }) => (
        <div className="flex flex-col gap-2" key={title}>
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex flex-wrap gap-2">
            {choices.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`!px-2 !py-1 rounded-sm text-xs ${
                  isSelected(field, item.value)
                    ? "bg-purple-500 text-white"
                    : "bg-white text-[#475569]"
                }`}
                onClick={() => handleSelect(field, item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TellSelf;