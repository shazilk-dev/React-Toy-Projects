import { useState } from "react";
import Button from "../components/Button";

const Todo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "one", isCompleted: false },
    { id: 2, text: "two", isCompleted: false },
    { id: 3, text: "three", isCompleted: false },
  ]);
  const [todo, setTodo] = useState({ id: 0, text: "", isCompleted: false });

  const [button, setButton] = useState("Add Todo");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo({ ...todo, text: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todo.text.trim() === "") {
      alert("Please enter a todo item.");
      return;
    }

    if (button === "Update Todo") {
      const updatedTodos = todos.map((item) =>
        item.id === todo.id ? { ...item, text: todo.text } : item,
      );
      console.log(todo);
      console.log(updatedTodos);
      setTodos(updatedTodos);
      setButton("Add Todo");
      setTodo({ id: 0, text: "", isCompleted: false });
      return;
    }

    setTodos([{ ...todo, id: Date.now() }, ...todos]);
    setTodo({ id: 0, text: "", isCompleted: false });
  };

  interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
  }

  const handleDelete = (item: TodoItem) => {
    const newTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(newTodos);
  };

  const handleEdit = (item: TodoItem) => {
    setButton("Update Todo");
    setTodo(item);
  };

  return (
    <>
      <section className="flex h-screen w-full flex-col items-center justify-center">
        <Button variant="primary" size="md" className="absolute top-4 left-4">
          <a href="/">Back</a>
        </Button>
        <h1 className="title m-5 text-4xl font-bold text-red-400">TODO APP</h1>

        <div className="todo-form">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="w-80 rounded-md border-2 border-gray-300 p-2 transition-colors duration-300 focus:border-red-400 focus:outline-none"
              type="text"
              placeholder="Your todo ... "
              value={todo.text}
              name="newTask"
              onChange={handleChange}
            />
            <button className="ml-2 cursor-pointer rounded-md bg-red-400 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-red-500">
              {button}
            </button>
          </form>
        </div>
        <div className="todos mt-8 w-full max-w-xl">
          <ul className="space-y-4">
            {todos.length > 0 ? (
              todos.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-md"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {item.text}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="rounded border border-green-200 px-3 py-1 font-semibold text-green-500 transition-colors duration-200 hover:bg-green-50 hover:text-green-700"
                      aria-label="Edit todo"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded border border-red-200 px-3 py-1 font-semibold text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-700"
                      aria-label="Delete todo"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No todos yet.</li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Todo;
