import type { StepProps } from "../../../types/stepper";

function Skills({ formData, setFormData }: StepProps) {
  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Your Skills</h2>

      {formData.skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-300 shadow-sm"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <button
            type="button"
            className="rounded bg-red-500 px-2 py-1 text-sm text-white"
            onClick={() => handleRemoveSkill(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="rounded bg-blue-500 px-3 py-1 text-white"
        onClick={handleAddSkill}
      >
        + Add Skill
      </button>
    </div>
  );
}

export default Skills;
