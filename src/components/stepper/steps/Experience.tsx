import type { StepProps } from "../../../types/stepper";

function Experience({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Company</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.experience.company}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              experience: { ...prev.experience, company: e.target.value },
            }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Role</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.experience.role}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              experience: { ...prev.experience, role: e.target.value },
            }))
          }
        />
      </div>
    </div>
  );
}

export default Experience;
