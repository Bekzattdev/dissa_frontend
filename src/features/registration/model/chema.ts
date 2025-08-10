import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  birthDate: z.string().min(1, "Дата рождения обязательна"),
  gender: z.enum(["male", "female"]),
  lookingFor: z.string().min(1, "Укажите, что вы ищете"),
  searchType: z.enum(["standard", "hybrid"]),
  aboutYou: z.object({
    description: z.string().optional(),
    alcohol: z.string().min(1, "Выберите вариант"),
    smoking: z.string().min(1, "Выберите вариант"),
    sports: z.string().min(1, "Выберите вариант"),
    pets: z.array(z.string()).min(1, "Выберите хотя бы один вариант"),
  }),
  radius: z.number().min(10, "Радиус должен быть не менее 10 км"),
  photo: z.array(z.any()).min(1, "Добавьте хотя бы одно фото"),
  partnerGender: z.enum(["male", "female", "all"]),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;