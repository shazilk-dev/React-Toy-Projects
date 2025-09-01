import { useState } from "react";
import { Edit, Save, Trash2, Check } from "lucide-react";
import { type Todo, useTodo } from "../../contexts/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const [isTodoEditable, setIsTodoEditable] = useState<boolean>(false);
  const [todoMsg, setTodoMsg] = useState<string>(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = (): void => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = (): void => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex gap-x-3 rounded-lg border border-black/10 px-3 py-1.5 text-black shadow-sm shadow-white/50 duration-300 ${
        todo.completed ? "bg-green-100" : "bg-blue-50"
      }`}
    >
      {/* Custom completion toggle */}
      <button
        onClick={toggleCompleted}
        className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center self-center rounded-full border-2 transition-all duration-300 ${
          todo.completed
            ? "border-green-500 bg-green-500 text-white hover:bg-green-600"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        {todo.completed && <Check size={16} />}
      </button>
      <input
        type="text"
        className={`w-full rounded-lg border bg-transparent outline-none ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-blue-100 text-sm hover:bg-blue-200 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <Save size={16} /> : <Edit size={16} />}
      </button>
      <button
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-red-100 text-sm hover:bg-red-200"
        onClick={() => deleteTodo(todo.id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default TodoItem;
