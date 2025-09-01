import { useState } from "react";
import { useTodo } from "../../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full rounded-l-lg border border-black/10 bg-white/20 px-3 py-1.5 duration-150 outline-none"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="shrink-0 rounded-r-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
