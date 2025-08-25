import projects from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export const ProjectsList = () => {
  return (
    <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />;
      })}
    </div>
  );
};
