import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Logo from "../../../shared/ui/Logo";
import Back from "../../../shared/ui/Back";
import ProgressBar from "../../../shared/ui/rogress/ProgressBar";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registrationSchema, type RegistrationSchema } from "../model/chema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useRegister from "../model/hooks";

const steps = [
  "/auth/acquaint",
  "/auth/looking",
  "/auth/search-type",
  "/auth/about-you",
  "/auth/radius-map",
  "/auth/add-photo",
];

const getCurrentStep = (pathname: string): number => {
  return steps.findIndex((step) => pathname.startsWith(step)) + 1;
};

const getNextPath = (currentPath: string): string | null => {
  const currentIndex = steps.findIndex((step) => currentPath.startsWith(step));
  return steps[currentIndex + 1] || null;
};

const AuthLayout = () => {
  const methods = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      birthDate: "",
      gender: "male",
      lookingFor: "",
      searchType: "standard",
      aboutYou: { 
        description: "", 
        alcohol: "", 
        smoking: "", 
        sports: "", 
        pets: [] 
      },
      radius: 10,
      photo: [],
      partnerGender: "all"
    },
  });
  console.log("data",methods);
  
  
  const { mutate: registerUser, isPending } = useRegister();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false); // Исправлено

  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = getCurrentStep(location.pathname);
  const next = getNextPath(location.pathname);
  const isLastStep = currentStep === steps.length;

  const handleNext = () => {
    if (next) {
      navigate(next);
    }
  };

  const handleSubmitForm = async () => {
    if (isLastStep) {
      try {
        setIsSubmitting(true);
        setServerError(null);
        
        const isValid = await methods.trigger();
        if (!isValid) {
          setServerError("Пожалуйста, заполните все обязательные поля");
          return;
        }

        const formData = methods.getValues();
        registerUser(formData, {
          onSuccess: (data) => {
            console.log("Успешная регистрация:", data);
            navigate("/profile-start");
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setServerError(error.response?.data?.message || "Ошибка сервера");
            } else {
              setServerError("Неизвестная ошибка");
            }
          },
          onSettled: () => {
            setIsSubmitting(false);
          }
          
        });
      } catch (error) {
        setServerError("Ошибка при отправке данных");
        setIsSubmitting(false);
      }
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    const validateStep = async () => {
      let fields: (keyof RegistrationSchema)[] = [];
      switch (currentStep) {
        case 1:
          fields = ["name", "birthDate", "gender"];
          break;
        case 2:
          fields = ["lookingFor"];
          break;
        case 3:
          fields = ["searchType", "partnerGender"];
          break;
        case 4:
          fields = ["aboutYou"];
          break;
        case 5:
          fields = ["radius"];
          break;
        case 6:
          fields = ["photo"];
          break;
      }
      const result = await methods.trigger(fields);
      setIsCurrentStepValid(result);
    };

    validateStep();
  }, [location.pathname, methods, currentStep]);

  return (
    <FormProvider {...methods}>
      <form className="h-[97dvh] flex flex-col justify-between px-4 py-2 relative">
        <div className="relative h-1">
          <div className="flex justify-between">
            <Back className="!mt-2" />
            <Logo />
          </div>
          <ProgressBar currentStep={currentStep} className="absolute top-10" />
        </div>

        <div>
          <Outlet />
        </div>

        {serverError && (
          <p className="text-red-500 text-center text-sm">{serverError}</p>
        )}

        <Button
          className={`${
            isCurrentStepValid
              ? "bg-white text-[#0F172A] cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          type="button"
          onClick={handleSubmitForm}
          disabled={!isCurrentStepValid || isPending || isSubmitting}
        >
          {isLastStep 
            ? (isPending || isSubmitting ? "Отправка..." : "Завершить регистрацию") 
            : "Далее"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthLayout;