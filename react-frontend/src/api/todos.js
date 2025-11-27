import axios from "axios";

const API = "http://localhost:3000/api/todos";

export const getTodos = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(API, todo);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export const updateTodo = async ({ id, updatedTodo }) => {
  const res = await axios.put(`${API}/${id}`, updatedTodo);
  return res.data;
};

export const toggleTodo = async ({ id, completed }) => {
  const res = await axios.put(`${API}/${id}`, { completed });
  return res.data;
};
