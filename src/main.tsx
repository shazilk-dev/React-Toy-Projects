import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Quiz from "./pages/Quiz.tsx";
import { createRoot } from "react-dom/client";
import Todo from "./pages/Todo.tsx";
import Stepper from "./pages/Stepper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/stepper" element={<Stepper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
