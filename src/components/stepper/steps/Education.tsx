import type { StepProps } from "../../../types/stepper";

function Education({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">School</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.education.university}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              education: { ...prev.education, university: e.target.value },
            }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Degree</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.education.degree}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              education: { ...prev.education, degree: e.target.value },
            }))
          }
        />
      </div>
    </div>
  );
}
export default Education;
