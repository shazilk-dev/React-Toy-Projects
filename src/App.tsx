import "./App.css";
import { ProjectsList } from "./components/ProjectsList";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout title="React Toy Projects" showBackButton={false}>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to My React Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A collection of small React applications showcasing different
            concepts and UI patterns. Click on any project to explore its
            functionality.
          </p>
        </div>

        <div className="mt-12">
          <ProjectsList />
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Built with React, TypeScript, and Tailwind CSS by Shazil Khan
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;
