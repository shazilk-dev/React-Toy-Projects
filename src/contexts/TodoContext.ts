/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  updateTodo: (id: number, todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  addTodo: (_todo: Omit<Todo, "id">) => {},
  updateTodo: (_id: number, _todo: Todo) => {},
  deleteTodo: (_id: number) => {},
  toggleComplete: (_id: number) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
