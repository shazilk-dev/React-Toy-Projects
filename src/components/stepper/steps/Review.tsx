import { User, GraduationCap, Briefcase, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import type { StepProps } from "../../../types/stepper";

export default function Review({
  formData,
}: {
  formData: StepProps["formData"];
}) {
  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Section icon={<User />} title="Personal Info">
        <p>
          <strong>Name:</strong> {formData.personal.name || "—"}
        </p>
        <p>
          <strong>Email:</strong> {formData.personal.email || "—"}
        </p>
        <p>
          <strong>Phone:</strong> {formData.personal.phone || "—"}
        </p>
      </Section>

      {/* Education */}
      <Section icon={<GraduationCap />} title="Education">
        {formData.education.degree || formData.education.university ? (
          <p>
            {formData.education.degree} @ {formData.education.university}
          </p>
        ) : (
          <p className="text-gray-500 italic">No education added</p>
        )}
      </Section>

      {/* Experience */}
      <Section icon={<Briefcase />} title="Experience">
        {formData.experience.role || formData.experience.company ? (
          <p>
            {formData.experience.role} at {formData.experience.company}
          </p>
        ) : (
          <p className="text-gray-500 italic">No experience added</p>
        )}
      </Section>

      {/* Skills */}
      <Section icon={<Wrench />} title="Skills">
        {formData.skills.length > 0 && formData.skills[0] !== "" ? (
          <div className="flex flex-wrap gap-2">
            {formData.skills
              .filter((skill) => skill.trim() !== "")
              .map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700"
                >
                  {skill}
                </span>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added</p>
        )}
      </Section>
    </div>
  );
}

// Reusable section wrapper

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}
