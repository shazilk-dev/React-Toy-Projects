import { useState } from "react";
import Education from "../components/stepper/steps/Education";
import Experience from "../components/stepper/steps/Experience";
import PersonalInfo from "../components/stepper/steps/PersonalInfo";
import Review from "../components/stepper/steps/Review";
import Skills from "../components/stepper/steps/Skills";
import type { FormData } from "../types/stepper";
import Layout from "../components/Layout";

const steps = [
  { id: 1, title: "Personal", component: PersonalInfo },
  { id: 2, title: "Education", component: Education },
  { id: 3, title: "Experience", component: Experience },
  { id: 4, title: "Skills", component: Skills },
  { id: 5, title: "Review", component: Review },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      name: "",
      email: "",
      phone: "",
    },
    education: {
      degree: "",
      university: "",
    },
    experience: {
      company: "",
      role: "",
    },
    skills: [""],
  });

  const StepComponent = steps[currentStep].component;

  // update function for fields
  // const updatePersonal = (field: string, value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     personal: { ...prev.personal, [field]: value },
  //   }));
  // };

  const handleNext = () => {
    setValidationError(null); // Clear any previous errors

    if (currentStep === 0) {
      const { name, email } = formData.personal;
      if (!name || !email) {
        setValidationError(
          "Please fill out all required fields before continuing.",
        );
        return;
      }
    }

    if (currentStep === 1) {
      const { university, degree } = formData.education;
      if (!university || !degree) {
        setValidationError("Please fill out all education fields.");
        return;
      }
    }

    if (currentStep === 2) {
      const { company, role } = formData.experience;
      if (!company || !role) {
        setValidationError("Please fill out all experience fields.");
        return;
      }
    }

    if (currentStep === 3) {
      if (
        formData.skills.length === 0 ||
        formData.skills.some((s) => !s.trim())
      ) {
        setValidationError("Please add at least one valid skill.");
        return;
      }
    }

    // If we reach here, validation passed
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <Layout title="Multi-Step Form">
      <div className="mx-auto max-w-3xl">
        {/* Step Title */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Step {steps[currentStep].id}: {steps[currentStep].title}
        </h2>

        {/* Step Progress Bar */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-5 right-0 left-0 h-0.5 bg-gray-300"></div>

            {/* Progress Line */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all duration-200 ${
                        isActive
                          ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                          : isCompleted
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {isCompleted ? "✓" : step.id}
                    </div>

                    {/* Title */}
                    <span
                      className={`mt-2 text-sm transition-colors duration-200 ${
                        isActive
                          ? "font-semibold text-blue-600"
                          : isCompleted
                            ? "font-medium text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
          <StepComponent formData={formData} setFormData={setFormData} />
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{validationError}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between rounded-lg bg-white p-6 shadow-sm">
          <button
            onClick={() => {
              setValidationError(null);
              setCurrentStep((s) => Math.max(s - 1, 0));
            }}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
              currentStep === 0
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                currentStep === steps.length - 1
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              {currentStep !== steps.length - 1 && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {currentStep === steps.length - 1 && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stepper;
