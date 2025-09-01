import { useState } from "react";
import { TodoProvider, type Todo } from "../contexts/TodoContext";
import TodoForm from "../components/Todo/TodoItem";
import TodoItem from "../components/Todo/TodoForm";
import Layout from "../components/Layout";

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Omit<Todo, "id">): void => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id: number, todo: Todo): void => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number): void => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo,
      ),
    );
  };

  return (
    <Layout title="Todo App">
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <div className="mx-auto w-full max-w-2xl rounded-lg bg-white px-6 py-8 shadow-lg">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
            Manage Your Todos
          </h2>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                No todos yet. Add one above to get started!
              </p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </TodoProvider>
    </Layout>
  );
}

export default TodoPage;
