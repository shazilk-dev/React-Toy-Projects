import "./App.css";
import { ProjectsList } from "./components/ProjectsList";
// import { ThemeToggle } from "./components/ThemeToggle";
// import Todo from "./components/Todo";

function App() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-4">
        <h1 className="mt-5 text-2xl font-bold tracking-tight uppercase sm:text-3xl">
          React Toy Projects
        </h1>
        {/* <ThemeToggle /> */}
      </header>
      <div className="flex min-h-[calc(100vh-120px)] w-full flex-col items-center justify-center gap-10 px-6 pb-16">
        <ProjectsList />
      </div>
    </>
  );
}

export default App;
