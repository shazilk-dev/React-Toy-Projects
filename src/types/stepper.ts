export interface FormData {
  personal: {
    name: string;
    email: string;
    phone: string;
  };
  education: {
    degree: string;
    university: string;
  };
  experience: {
    company: string;
    role: string;
  };
  skills: string[];
}

export interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
