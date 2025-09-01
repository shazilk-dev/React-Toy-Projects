type Project = {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
  image?: string;
};

const projects: Project[] = [
  {
    title: "TODO APP",
    description: "PSDC Toy project-1: Todo App",
    image: "/todo.PNG",
    href: "/todo",
  },
  {
    title: "Quiz App",
    description: "PSDC Toy project-2: Quiz App",
    image: "/quiz.PNG",
    href: "/quiz",
  },
  {
    title: "Stepper",
    description: "PSDC Toy project-3: Stepper",
    image: "/stepper.PNG",
    href: "/stepper",
  },
];

export default projects;
