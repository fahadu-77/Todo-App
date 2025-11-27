import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  toggleTodo,
} from "../api/todos";

const Todo = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTitle("");
    },
  });

  const updateTodoMutation = useMutation({
    queryKey: ["updateTodo"],
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const deleteTodoMutation = useMutation({
    queryKey: ["delTodo"],
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["delTodo"]),
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  if (isLoading) return <p>Loading...</p>;

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <form
        className="flex mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          addTodoMutation.mutate({ title });
          setTitle("");
        }}
      >
        <input
          type="text"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded-l"
        />
        <button type="submit">Add</button>
      </form>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className="px-2 py-1 border rounded"
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className="px-2 py-1 border rounded"
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="px-2 py-1 border rounded"
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos?.map((todo) => (
          <li key={todo._id} className="flex items-center justify-between mb-2 p-2 border rounded">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleTodoMutation.mutate({ id: todo._id, completed: !todo.completed })
                }
              />
              <input
                type="text"
                defaultValue={todo.title}
                onBlur={(e) =>
                  updateTodoMutation.mutate({ id: todo._id, updatedTodo: { title: e.target.value } })
                }
                className={`border-b ${todo.completed ? "line-through text-gray-400" : ""}`}
              />
            </div>
            <button
              onClick={() => deleteTodoMutation.mutate(todo._id)}
              className="text-red-500 font-bold"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
