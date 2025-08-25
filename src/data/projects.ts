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
    description:
      "Description: hello world how is going on.. am i not the best not at all",
    image: "/project-1.jpg",
    href: "/todo",
  },
  {
    title: "Quiz App",
    description: "Description: This is project 2",
    image: "/project-1.jpg",
    href: "/quiz",
  },
  {
    title: "Stepper",
    description: "Description: This is project 3",
    image: "/project-1.jpg",
    href: "/stepper",
  },
];

export default projects;
