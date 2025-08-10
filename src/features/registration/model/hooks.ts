import { useMutation } from "@tanstack/react-query";
import type { RegistrationSchema } from "./chema";
import axios from "axios";

const TEMP_API = "https://api-crud.elcho.dev/api/v1/abdef-d9b59-21fdc/Dissa_frontend";

const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegistrationSchema) => {
      console.group("Регистрационные данные");
      console.log("Полные данные:", JSON.parse(JSON.stringify(data)));
      
      const formData = new FormData();

      // Добавляем простые поля
      formData.append("name", data.name);
      formData.append("birthDate", data.birthDate);
      formData.append("gender", data.gender);
      formData.append("lookingFor", data.lookingFor);
      formData.append("searchType", data.searchType);
      formData.append("radius", data.radius.toString());
      formData.append("partnerGender", data.partnerGender || "all");

      // Добавляем объект aboutYou как JSON
      const aboutYouData = JSON.stringify(data.aboutYou);
      formData.append("aboutYou", aboutYouData);
      console.log("aboutYou:", aboutYouData);

      // Добавляем фото
      if (data.photo && Array.isArray(data.photo)) {
        console.log("Количество фото:", data.photo.length);
        data.photo.forEach((file, index) => {
          formData.append(`photo_${index}`, file);
          console.log(`Фото ${index}:`, file.name, file.type, file.size + " bytes");
        });
      } else {
        console.warn("Фото не отправляются!");
      }

      // Выводим содержимое FormData
      console.log("Содержимое FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(`${TEMP_API}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("Ответ сервера:", response.data);
      console.groupEnd();
      return response.data;
    },
  });
};

export default useRegister;