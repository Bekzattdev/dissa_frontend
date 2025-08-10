export interface RegistrationFormData {
    name: string;
    birthDate: string;
    gender: 'male'|'female';
    lookingFor: string;
    searchType: 'standard'|'hybrid';
    aboutYou: {
      alcohol: string;
      smoking: string;
      sports: string;
      pets: string[];
    };
    radius: number;
    photo?: File;
  }
  