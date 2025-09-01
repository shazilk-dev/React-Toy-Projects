import type { StepProps } from "../../../types/stepper";

export default function PersonalInfo({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.personal.name}
          onChange={(e) =>
            setFormData((prev: typeof formData) => ({
              ...prev,
              personal: { ...prev.personal, name: e.target.value },
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.personal.email}
          onChange={(e) =>
            setFormData((prev: typeof formData) => ({
              ...prev,
              personal: { ...prev.personal, email: e.target.value },
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          value={formData.personal.phone}
          onChange={(e) =>
            setFormData((prev: typeof formData) => ({
              ...prev,
              personal: { ...prev.personal, phone: e.target.value },
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  );
}
